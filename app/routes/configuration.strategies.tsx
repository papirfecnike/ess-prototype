import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button/Button";
import { Card } from "@/components/ui/card/Card";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { Icon } from "@/components/ui/icon/Icon";
import { Notification } from "@/components/ui/notification/Notification";
import { Select } from "@/components/ui/select/Select";
import { Tag } from "@/components/ui/tag/Tag";
import { TextField } from "@/components/ui/input/TextField";
import { Toggle } from "@/components/ui/toggle/Toggle";
import "@/styles/configuration-strategies.css";

export const loader: LoaderFunction = async () => null;

type StrategyType = "Picking" | "Putaway" | "Inventory" | "Replenishment";

type Strategy = {
  id: string;
  title: string;
  type: StrategyType;
  description: string;
  enabled: boolean;
};

const INITIAL_STRATEGIES: Strategy[] = [
  { id: "wavePicking", title: "Wave picking", type: "Picking", description: "Batch orders into waves based on zone, priority and target completion time.", enabled: true },
  { id: "zonePutaway", title: "Zone-based putaway", type: "Putaway", description: "Assign compartments based on product category, velocity and available capacity.", enabled: false },
  { id: "autoReplenishment", title: "Auto replenishment", type: "Replenishment", description: "Trigger replenishment when compartment levels drop below the configured threshold.", enabled: true },
  { id: "batchPicking", title: "Batch picking", type: "Picking", description: "Pick multiple orders together by route and product similarity.", enabled: true },
  { id: "abcSlotting", title: "ABC slotting", type: "Inventory", description: "Organize products by velocity so fast movers stay close to active ports.", enabled: true },
];

const EMPTY_DRAFT = {
  title: "",
  type: "Picking" as StrategyType,
  description: "",
};

const processOptions = [
  { value: "Picking", label: "Picking" },
  { value: "Putaway", label: "Putaway" },
  { value: "Inventory", label: "Inventory" },
  { value: "Replenishment", label: "Replenishment" },
];

const strategyTagColors: Record<StrategyType, string> = {
  Picking: "var(--color-success)",
  Putaway: "var(--color-default)",
  Inventory: "var(--color-greyblue)",
  Replenishment: "#7C3AED",
};

export default function ConfigurationStrategies() {
  const [activeFilters, setActiveFilters] = useState<StrategyType[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  const visibleStrategies = useMemo(
    () => activeFilters.length === 0 ? strategies : strategies.filter(strategy => activeFilters.includes(strategy.type)),
    [activeFilters, strategies]
  );

  const canConfirm = Boolean(draft.title.trim() && draft.type && draft.description.trim());

  function openAddDialog() {
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
    setDialogMode("add");
  }

  function openEditDialog(strategy: Strategy) {
    setDraft({
      title: strategy.title,
      type: strategy.type,
      description: strategy.description,
    });
    setEditingId(strategy.id);
    setDialogMode("edit");
  }

  function saveStrategy() {
    if (!canConfirm) return;

    if (dialogMode === "edit" && editingId) {
      setStrategies(current => current.map(strategy =>
        strategy.id === editingId
          ? { ...strategy, title: draft.title.trim(), type: draft.type, description: draft.description.trim() }
          : strategy
      ));
      setNotification({ title: "Strategy updated", message: `${draft.title.trim()} has been updated.` });
    } else {
      setStrategies(current => [
        ...current,
        {
          id: `${Date.now()}`,
          title: draft.title.trim(),
          type: draft.type,
          description: draft.description.trim(),
          enabled: true,
        },
      ]);
      setNotification({ title: "Strategy added", message: `${draft.title.trim()} has been added.` });
    }

    setDialogMode(null);
  }

  function toggleFilter(filter: "All" | StrategyType) {
    if (filter === "All") {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(current =>
      current.includes(filter)
        ? current.filter(value => value !== filter)
        : [...current, filter]
    );
  }

  return (
    <PageLayout title="Strategies" subtitle="Define and manage warehouse processing strategies">
      <PageSection>
        <div className="strategies-toolbar">
          <div className="strategies-filters">
            {(["All", "Picking", "Putaway", "Inventory", "Replenishment"] as const).map(filter => (
              <button
                key={filter}
                type="button"
                className={[
                  "strategies-filter-chip",
                  filter === "All"
                    ? activeFilters.length === 0 ? "is-active" : ""
                    : activeFilters.includes(filter) ? "is-active" : "",
                ].join(" ")}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm" leadingIcon="add" onClick={openAddDialog}>
            Add strategy
          </Button>
        </div>

        <div className="strategies-grid">
          {visibleStrategies.map(strategy => (
            <Card key={strategy.id} className="strategy-card">
              <div className="strategy-card__header">
                <div>
                  <Icon name={strategy.type === "Picking" ? "upload" : strategy.type === "Putaway" ? "download" : strategy.type === "Inventory" ? "inventory2" : "refresh"} size="md" />
                  <h3>{strategy.title}</h3>
                </div>
                <button
                  type="button"
                  className="strategy-card__edit"
                  aria-label={`Edit ${strategy.title}`}
                  onClick={() => openEditDialog(strategy)}
                >
                  <Icon name="edit" size="sm" />
                </button>
              </div>

              <div className="strategy-card__body">
                <div className="strategy-card__type">
                  <Tag label={strategy.type} color={strategyTagColors[strategy.type]} />
                </div>
                <p>{strategy.description}</p>
                <div className="strategy-card__meta">
                  <span>{strategy.enabled ? "Enabled" : "Disabled"}</span>
                  <Toggle
                    title=""
                    checked={strategy.enabled}
                    onCheckedChange={(enabled) =>
                      setStrategies(current => current.map(item => item.id === strategy.id ? { ...item, enabled } : item))
                    }
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      <Dialog
        isOpen={dialogMode !== null}
        intent="default"
        icon={dialogMode === "add" ? "add" : "edit"}
        title={dialogMode === "edit" ? "Edit strategy" : "Add strategy"}
        footerLeft={<Button variant="ghost" onClick={() => setDialogMode(null)}>Cancel</Button>}
        footerRight={<Button variant="primary" disabled={!canConfirm} onClick={saveStrategy}>Confirm</Button>}
      >
        <div className="strategy-dialog">
          <div className="strategy-dialog__label">Strategy</div>
          <section className="strategy-dialog__panel">
            <TextField label="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            <Select
              label="Related process"
              value={draft.type}
              searchable={false}
              onChange={(value) => setDraft({ ...draft, type: (value ?? "Picking") as StrategyType })}
              options={processOptions}
            />
          </section>

          <div className="strategy-dialog__label">Description</div>
          <section className="strategy-dialog__panel">
            <textarea
              className="strategy-dialog__textarea"
              value={draft.description}
              placeholder="Add a description"
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            />
          </section>
        </div>
      </Dialog>

      {notification && (
        <Notification
          intent="success"
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </PageLayout>
  );
}
