import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Tag } from "@/components/ui/tag/Tag";

import { TextField } from "@/components/ui/input/TextField";
import { Select } from "@/components/ui/select/Select";

/* =========================
   TYPES
   ========================= */

type ActiveCard = "save" | "load" | "apply" | null;

type VersionChange = {
  id: string;
  text: string;
};

type VersionHistoryEntry = {
  version: string;
  title: string;
  isNew?: boolean;
  description: string;
  date: string;
  user: string;
  changes: VersionChange[];
};

/* =========================
   INITIAL DATA
   ========================= */

const INITIAL_VERSION_HISTORY: VersionHistoryEntry[] = [
  {
    version: "v2.4.1",
    title: "Production release",
    description:
      "Updated robot arm timeout settings and improved error handling across warehouse modules.",
    date: "23-10-2025",
    user: "Admin",
    changes: [
      { id: "c1", text: "Robot arm reliability improvements." },
      { id: "c2", text: "Improved error handling and logging." },
      { id: "c3", text: "Overall system stability improvements." },
    ],
  },
  {
    version: "v2.4.0",
    title: "Stable release",
    description: "Major workflow and validation updates.",
    date: "20-10-2025",
    user: "John Doe",
    changes: [
      { id: "c4", text: "New validation steps." },
      { id: "c5", text: "Improved orchestration logging." },
    ],
  },
];

export const loader: LoaderFunction = async () => null;

export default function ConfigurationVersionHistory() {
  const [activeCard, setActiveCard] = useState<ActiveCard>(null);

  const [versionHistory, setVersionHistory] =
    useState<VersionHistoryEntry[]>(INITIAL_VERSION_HISTORY);

  const [versionName, setVersionName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [backupCurrent, setBackupCurrent] = useState(false);

  const canSave = Boolean(versionName && description);
  const canLoad = Boolean(selectedVersion);

  function handleSave() {
    if (!canSave) return;

    const date = new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    setVersionHistory(prev => [
      {
        version: versionName,
        title: versionName,
        isNew: true,
        description,
        date,
        user: "You",
        changes: [],
      },
      ...prev.map(v => ({ ...v, isNew: false })),
    ]);

    setVersionName("");
    setDescription("");
    setActiveCard(null);
  }

  function handleLoad() {
    if (!canLoad) return;
    setActiveCard("apply");
  }

  return (
    <PageLayout
      title="Version history"
      subtitle="Setup and overview versions across the software suite"
    >
      {/* =========================
         TOP ACTION CARDS
         ========================= */}
      <PageSection>
        <div className="layout-grid-3">
          {/* SAVE */}
          <Card
            className={[
              "layout-card-fill",
              activeCard === "save" ? "card--editing card--save" : "",
            ].join(" ")}
          >
            <div className="card-header card-header--editable">
              <Icon name="save" />
              <div>
                <h3>Save configuration</h3>
                <p>Create a new version snapshot</p>
              </div>
            </div>

            <div className="layout-stack layout-card-body">
              <TextField
                placeholder="Version name"
                value={versionName}
                onFocus={() => setActiveCard("save")}
                onChange={(e) => setVersionName(e.target.value)}
              />

              <TextField
                placeholder="Description"
                value={description}
                onFocus={() => setActiveCard("save")}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="layout-card-action">
                <Button
                  leadingIcon="save"
                  disabled={!canSave}
                  onClick={handleSave}
                >
                  Save configuration
                </Button>
              </div>
            </div>
          </Card>

          {/* LOAD */}
          <Card
            className={[
              "layout-card-fill",
              activeCard === "load" ? "card--editing card--load" : "",
            ].join(" ")}
          >
            <div className="card-header card-header--editable">
              <Icon name="refresh" />
              <div>
                <h3>Load configuration</h3>
                <p>Restore from a saved version</p>
              </div>
            </div>

            <div className="layout-stack layout-card-body">
              <Select
                label="Version"
                value={selectedVersion}
                onChange={(v) => {
                  setSelectedVersion(v);
                  setActiveCard("load");
                }}
                options={versionHistory.map(v => ({
                  value: v.version,
                  label: v.version,
                }))}
              />

              <label className="layout-checkbox">
                <input
                  type="checkbox"
                  checked={backupCurrent}
                  onChange={(e) => {
                    setBackupCurrent(e.target.checked);
                    setActiveCard("load");
                  }}
                />
                Backup current configuration
              </label>

              <div className="layout-card-action">
                <Button
                  leadingIcon="refresh"
                  disabled={!canLoad}
                  onClick={handleLoad}
                >
                  Load configuration
                </Button>
              </div>
            </div>
          </Card>

          {/* APPLY */}
          <Card
            className={[
              "layout-card-fill",
              activeCard === "apply" ? "card--editing card--apply" : "",
            ].join(" ")}
          >
            <div className="card-header card-header--editable">
              <Icon name="rocket" />
              <div>
                <h3>Apply configuration</h3>
                <p>Apply configuration to current environment</p>
              </div>
            </div>

            <div className="layout-stack layout-card-body">
              <p>Make sure a configuration is loaded before applying.</p>

              <div className="layout-card-action">
                <Button
                  leadingIcon="rocket"
                  disabled={activeCard !== "apply"}
                >
                  Apply configuration
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* =========================
         VERSION HISTORY
         ========================= */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="history" />
            <h3>Version history</h3>
          </div>

          <div className="card-group">
            {versionHistory.map(entry => (
              <VersionHistoryItem key={entry.version} entry={entry} />
            ))}
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}

/* =========================
   VERSION HISTORY ITEM
   ========================= */

// ... a fájl ELEJE változatlan

function VersionHistoryItem({ entry }: { entry: VersionHistoryEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="version-item">
      <div className="layout-split">
        <div className="layout-stack">
          <div className="version-header-row">
            <Tag label={entry.version} />
            <span className="version-title">{entry.title}</span>
            {entry.isNew && <Tag label="New" variant="warning" />}
          </div>

          <p className="version-description">{entry.description}</p>
        </div>

        <div className="version-actions">
          <span className="version-meta">
            <Icon name="time" size="xs" />
            {entry.date}
          </span>

          <span className="version-meta">
            <Icon name="user" size="xs" />
            {entry.user}
          </span>

          <Button variant="ghost" leadingIcon="refresh">
            Restore
          </Button>

          <button
            type="button"
            className={[
              "version-expand-trigger",
              open ? "is-open" : "",
            ].join(" ")}
            onClick={() => setOpen(v => !v)}
          >
            <Icon name="chevronDown" />
          </button>
        </div>
      </div>

      {open && entry.changes.length > 0 && (
        <div className="version-expanded">
          {entry.changes.map(change => (
            <div key={change.id} className="version-change">
              <Icon name="checkCircle" size="sm" />
              <span>{change.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

