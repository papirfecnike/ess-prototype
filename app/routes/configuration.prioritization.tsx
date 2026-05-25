import type { LoaderFunction } from "react-router";
import { useMemo, useRef, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Icon } from "@/components/ui/icon/Icon";
import { Notification } from "@/components/ui/notification/Notification";
import { RadioButton } from "@/components/ui/radiobutton/RadioButton";
import { Select } from "@/components/ui/select/Select";
import { Tag } from "@/components/ui/tag/Tag";
import { TextField } from "@/components/ui/input/TextField";
import { Toggle } from "@/components/ui/toggle/Toggle";
import "@/styles/configuration-priorities.css";

export const loader: LoaderFunction = async () => null;

type PriorityRow = DataTableRow & {
  id: string;
  name: string;
  type: string;
  orderDeadline: string;
  finishTime: string;
  activeDays: string;
  carrier: string;
  cutoffBehavior: string;
  active: string;
  disabled?: boolean;
  more: string;
};

const INITIAL_ROWS: PriorityRow[] = [
  { id: "default", name: "Default", type: "Regular", orderDeadline: "23:59", finishTime: "23:59", activeDays: "Mon, Tue, Wed, Thu, Fri, Sat, Sun", carrier: "n/a", cutoffBehavior: "Move to next", active: "true", more: "" },
  { id: "express", name: "Express", type: "Express", orderDeadline: "n/a", finishTime: "n/a", activeDays: "n/a", carrier: "Express", cutoffBehavior: "n/a", active: "true", more: "" },
  { id: "dhl", name: "DHL", type: "Regular", orderDeadline: "09:30", finishTime: "10:00", activeDays: "Mon, Tue, Wed, Thu", carrier: "DHL", cutoffBehavior: "Move to next", active: "true", more: "" },
  { id: "bring", name: "Bring", type: "Regular", orderDeadline: "13:30", finishTime: "14:45", activeDays: "Mon, Tue, Wed, Thu, Fri", carrier: "Bring", cutoffBehavior: "Move to next", active: "true", more: "" },
  { id: "postnord", name: "PostNord, GLS", type: "Regular", orderDeadline: "18:00", finishTime: "19:00", activeDays: "Mon, Tue, Wed, Thu, Fri, Sat, Sun", carrier: "PostNord, GLS", cutoffBehavior: "Complete order", active: "true", more: "" },
  { id: "old-dhl", name: "Old DHL", type: "Regular", orderDeadline: "11:00", finishTime: "12:00", activeDays: "n/a", carrier: "DHL", cutoffBehavior: "Move to next", active: "false", disabled: true, more: "" },
];

const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayFilterOptions = [
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
  { value: "Sun", label: "Sunday" },
];
const carrierFilterOptions = ["n/a", "Express", "DHL", "Bring", "PostNord, GLS"];
const hourOptions = Array.from({ length: 24 }, (_, i) => ({ value: String(i).padStart(2, "0"), label: String(i).padStart(2, "0") }));
const minuteOptions = Array.from({ length: 12 }, (_, i) => ({ value: String(i * 5).padStart(2, "0"), label: String(i * 5).padStart(2, "0") }));
const INITIAL_PRIORITY_DRAFT = {
  name: "",
  type: "Regular",
  orderHour: "10",
  orderMinute: "00",
  finishHour: "18",
  finishMinute: "00",
  activeDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  carrier: "",
  cutoffBehavior: "Move to next",
};

type PriorityDraft = typeof INITIAL_PRIORITY_DRAFT;

const INFO_TEXT = {
  orderDeadline: "Latest time for new or updated orders to enter this priority. Orders received or modified after this will follow the cutoff rules below.",
  finishTime: "The target time by which orders in this priority should be picked. Orders accepted before the deadline are scheduled to be completed by this time.",
  activeDays: "If today isn’t active, orders move to the next active day.",
};

export default function ConfigurationPriorities() {
  const [rows, setRows] = useState<PriorityRow[]>(INITIAL_ROWS);
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [deleteRowId, setDeleteRowId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ intent: "success" | "danger"; title: string; message: string } | null>(null);
  const [draft, setDraft] = useState(INITIAL_PRIORITY_DRAFT);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const hasDraftChanges =
    draft.name !== INITIAL_PRIORITY_DRAFT.name ||
    draft.type !== INITIAL_PRIORITY_DRAFT.type ||
    draft.orderHour !== INITIAL_PRIORITY_DRAFT.orderHour ||
    draft.orderMinute !== INITIAL_PRIORITY_DRAFT.orderMinute ||
    draft.finishHour !== INITIAL_PRIORITY_DRAFT.finishHour ||
    draft.finishMinute !== INITIAL_PRIORITY_DRAFT.finishMinute ||
    draft.carrier !== INITIAL_PRIORITY_DRAFT.carrier ||
    draft.cutoffBehavior !== INITIAL_PRIORITY_DRAFT.cutoffBehavior ||
    draft.activeDays.join("|") !== INITIAL_PRIORITY_DRAFT.activeDays.join("|");

  const selectedMenuRow = rows.find(row => row.id === openMenuRowId);
  const rowToDelete = rows.find(row => row.id === deleteRowId);

  const columns: DataTableColumn[] = [
    { key: "name", label: "Name", width: 160, filterable: false },
    { key: "type", label: "Type", width: 120, filterable: true, filterType: "radio", filterOptions: [{ value: "Regular", label: "Regular" }, { value: "Express", label: "Express" }], renderCell: value => <Tag label={String(value)} variant={String(value) === "Express" ? "warning" : "default"} /> },
    { key: "orderDeadline", label: "Order deadline", width: 120, wrap: true, filterable: true, filterType: "time" },
    { key: "finishTime", label: "Finish time", width: 100, wrap: true, filterable: true, filterType: "time" },
    { key: "activeDays", label: "Active days", width: 185, filterable: true, filterType: "multiSelect", filterOptions: dayFilterOptions },
    { key: "carrier", label: "Carrier", width: 145, filterable: true, filterType: "multiSelect", filterOptions: carrierFilterOptions },
    { key: "cutoffBehavior", label: "Cutoff behavior", width: 160, wrap: true },
    { key: "active", label: "Active", width: 120, filterable: false, renderCell: value => <Toggle title="" checked={String(value) === "true"} onCheckedChange={() => {}} /> },
    {
      key: "more",
      label: "",
      align: "right",
      filterable: false,
      width: 48,
      renderCell: (_value, row) => {
        const rowId = String(row.id);
        const isOpen = openMenuRowId === rowId;
        return (
          <button
            type="button"
            className="btn--ghost"
            aria-label="More"
            ref={(el) => { if (isOpen) menuAnchorRef.current = el; }}
            onClick={(event) => {
              event.stopPropagation();
              setOpenMenuRowId(isOpen ? null : rowId);
            }}
          >
            <Icon name={isOpen ? "closeStroke" : "moreVert"} size="sm" />
          </button>
        );
      },
    },
  ];

  const tableRows = useMemo(() => rows.map(row => ({ ...row })), [rows]);

  function toggleDraftDay(day: string) {
    setDraft(current => ({
      ...current,
      activeDays: current.activeDays.includes(day)
        ? current.activeDays.filter(value => value !== day)
        : [...current.activeDays, day],
    }));
  }

  function openCreateDialog() {
    setDraft(INITIAL_PRIORITY_DRAFT);
    setEditingRowId(null);
    setDialogMode("create");
  }

  function parseTime(value: string, fallbackHour: string, fallbackMinute: string) {
    const [hour, minute] = value.split(":");
    return {
      hour: hour && hour !== "n/a" ? hour.padStart(2, "0") : fallbackHour,
      minute: minute && minute !== "n/a" ? minute.padStart(2, "0") : fallbackMinute,
    };
  }

  function draftFromRow(row: PriorityRow): PriorityDraft {
    const order = parseTime(row.orderDeadline, "10", "00");
    const finish = parseTime(row.finishTime, "18", "00");
    const activeDays = row.activeDays === "n/a"
      ? []
      : row.activeDays.split(",").map(day => day.trim()).filter(Boolean);

    return {
      name: row.name,
      type: row.type,
      orderHour: order.hour,
      orderMinute: order.minute,
      finishHour: finish.hour,
      finishMinute: finish.minute,
      activeDays,
      carrier: row.carrier === "n/a" ? "" : row.carrier,
      cutoffBehavior: row.cutoffBehavior,
    };
  }

  function openEditDialog(row: PriorityRow) {
    setDraft(draftFromRow(row));
    setEditingRowId(row.id);
    setDialogMode("edit");
  }

  function closePriorityDialog() {
    setDialogMode(null);
    setEditingRowId(null);
    setDraft(INITIAL_PRIORITY_DRAFT);
  }

  function buildPriorityRow(id: string, disabled = false): PriorityRow {
    const activeDays = draft.activeDays.length > 0 ? draft.activeDays.join(", ") : "n/a";

    return {
      id,
      name: draft.name.trim() || "New priority",
      type: draft.type,
      orderDeadline: `${draft.orderHour}:${draft.orderMinute}`,
      finishTime: `${draft.finishHour}:${draft.finishMinute}`,
      activeDays,
      carrier: draft.carrier.trim() || "n/a",
      cutoffBehavior: draft.cutoffBehavior,
      active: disabled ? "false" : "true",
      disabled,
      more: "",
    };
  }

  function savePriority() {
    if (dialogMode === "edit" && editingRowId) {
      setRows(current => current.map(row =>
        row.id === editingRowId ? buildPriorityRow(row.id, Boolean(row.disabled)) : row
      ));
      setNotification({ intent: "success", title: "Priority updated", message: "The priority has been updated." });
    } else {
      const newRow = buildPriorityRow(`${Date.now()}`);
      setRows(current => [...current, newRow]);
      setNotification({ intent: "success", title: "Priority created", message: "The new priority has been added." });
    }
    closePriorityDialog();
  }

  function togglePriority(row: PriorityRow) {
    const nextDisabled = !row.disabled;
    setRows(current => current.map(item =>
      item.id === row.id
        ? { ...item, disabled: nextDisabled, active: nextDisabled ? "false" : "true" }
        : item
    ));
    setNotification({
      intent: "success",
      title: nextDisabled ? "Priority disabled" : "Priority enabled",
      message: `${row.name} has been ${nextDisabled ? "disabled" : "enabled"}.`,
    });
  }

  function confirmDeletePriority() {
    if (!rowToDelete) return;
    setRows(current => current.filter(row => row.id !== rowToDelete.id));
    setDeleteRowId(null);
    setNotification({ intent: "danger", title: "Priority deleted", message: `${rowToDelete.name} has been deleted.` });
  }

  function handleMenuSelect(action: string) {
    if (!selectedMenuRow) return;

    if (action === "edit") {
      openEditDialog(selectedMenuRow);
    } else if (action === "disable") {
      togglePriority(selectedMenuRow);
    } else if (action === "delete") {
      setDeleteRowId(selectedMenuRow.id);
    }
    setOpenMenuRowId(null);
  }

  function InfoTip({ text }: { text: string }) {
    return (
      <button type="button" className="priority-dialog__info" aria-label={text} data-tooltip={text}>
        <Icon name="info" size="sm" />
      </button>
    );
  }

  return (
    <PageLayout title="Priorities" subtitle="Define processing priority for orders">
      <PageSection>
        <DataTableCore
          rowIdKey="id"
          columns={columns}
          rows={tableRows}
          showHeader
          showCustomize={false}
          showActiveFilters={false}
          headerActions={
            <Button variant="secondary" size="sm" leadingIcon="add" onClick={openCreateDialog}>
              Create priority
            </Button>
          }
        />

        <DropdownMenu
          open={openMenuRowId !== null}
          anchorRef={menuAnchorRef}
          items={[
            { id: "edit", label: "Edit", icon: "edit" },
            { id: "disable", label: selectedMenuRow?.disabled ? "Enable" : "Disable", icon: selectedMenuRow?.disabled ? "checkCircle" : "minusStroke" },
            { id: "delete", label: "Delete", icon: "delete", intent: "danger" },
          ]}
          onClose={() => setOpenMenuRowId(null)}
          onSelect={handleMenuSelect}
        />
      </PageSection>

      <Dialog
        isOpen={dialogMode !== null}
        intent="default"
        icon="add"
        title={dialogMode === "edit" ? "Edit priority" : "Create priority"}
        footerLeft={<Button variant="ghost" onClick={closePriorityDialog}>Cancel</Button>}
        footerRight={<Button variant="primary" disabled={!hasDraftChanges} onClick={savePriority}>Confirm</Button>}
      >
        <div className="priority-dialog">
          <div className="priority-dialog__label">Priority</div>
          <section className="priority-dialog__panel">
            <div className="priority-dialog__row">
              <span>Name</span>
              <TextField label="Give the priority a name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </div>
            <div className="priority-dialog__radio-row">
              <span>Type</span>
              {["Regular", "Express"].map(type => (
                <button key={type} type="button" onClick={() => setDraft({ ...draft, type })}>
                  <RadioButton checked={draft.type === type} />
                  {type}
                </button>
              ))}
            </div>
          </section>

          <div className="priority-dialog__label">Processing window</div>
          <section className="priority-dialog__panel">
            <div className="priority-dialog__row priority-dialog__time-row">
              <span>New or changed orders accepted until</span>
              <div className="priority-dialog__time-selectors">
                <Select label="" value={draft.orderHour} searchable={false} onChange={(value) => setDraft({ ...draft, orderHour: value ?? "10" })} options={hourOptions} />
                <span className="priority-dialog__time-separator">:</span>
                <Select label="" value={draft.orderMinute} searchable={false} onChange={(value) => setDraft({ ...draft, orderMinute: value ?? "00" })} options={minuteOptions} />
              </div>
              <InfoTip text={INFO_TEXT.orderDeadline} />
            </div>
            <div className="priority-dialog__row priority-dialog__time-row">
              <span>Must be picked by</span>
              <div className="priority-dialog__time-selectors">
                <Select label="" value={draft.finishHour} searchable={false} onChange={(value) => setDraft({ ...draft, finishHour: value ?? "18" })} options={hourOptions} />
                <span className="priority-dialog__time-separator">:</span>
                <Select label="" value={draft.finishMinute} searchable={false} onChange={(value) => setDraft({ ...draft, finishMinute: value ?? "00" })} options={minuteOptions} />
              </div>
              <InfoTip text={INFO_TEXT.finishTime} />
            </div>
            <div className="priority-dialog__days">
              <span>Active on</span>
              <div className="priority-dialog__days-list">
                {dayOptions.map(day => (
                  <button key={day} type="button" className={draft.activeDays.includes(day) ? "is-active" : ""} onClick={() => toggleDraftDay(day)}>
                    {day}
                  </button>
                ))}
              </div>
              <InfoTip text={INFO_TEXT.activeDays} />
            </div>
            <strong>Orders received before {draft.orderHour}:{draft.orderMinute} will be picked before {draft.finishHour}:{draft.finishMinute}.</strong>
          </section>

          <div className="priority-dialog__label">Scope</div>
          <section className="priority-dialog__panel">
            <div className="priority-dialog__row">
              <span>Carrier</span>
              <TextField label="Add carrier..." value={draft.carrier} onChange={(event) => setDraft({ ...draft, carrier: event.target.value })} />
            </div>
          </section>

          <div className="priority-dialog__label">Cutoff behavior</div>
          <section className="priority-dialog__panel">
            <span>When the deadline is reached:</span>
            {["Move to next", "Complete order"].map(option => (
              <button key={option} type="button" className="priority-dialog__radio-option" onClick={() => setDraft({ ...draft, cutoffBehavior: option })}>
                <RadioButton checked={draft.cutoffBehavior === option} />
                {option === "Move to next" ? "Move orders to the next eligible priority" : "Complete orders anyway"}
              </button>
            ))}
          </section>
        </div>
      </Dialog>

      <Dialog
        isOpen={deleteRowId !== null}
        intent="error"
        title="Delete priority"
        footerLeft={<Button variant="ghost" onClick={() => setDeleteRowId(null)}>Cancel</Button>}
        footerRight={<Button variant="primary" intent="danger" onClick={confirmDeletePriority}>Delete</Button>}
      >
        <p>Are you sure you want to delete {rowToDelete?.name ?? "this priority"}?</p>
      </Dialog>

      {notification && (
        <Notification intent={notification.intent} title={notification.title} message={notification.message} onClose={() => setNotification(null)} />
      )}
    </PageLayout>
  );
}
