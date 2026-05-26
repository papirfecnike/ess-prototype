import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button/Button";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { Icon } from "@/components/ui/icon/Icon";
import { Notification } from "@/components/ui/notification/Notification";
import { TextField } from "@/components/ui/input/TextField";
import "@/styles/configuration-manager.css";

export const loader: LoaderFunction = async () => null;

type ConfigStatus = "initial" | "draft" | "saved" | "published";
type NotificationState = { title: string; message: string } | null;
type ParameterRow = DataTableRow & { id: string; code: string; value: string };

const LAST_MODIFIED = "25/02/2026, 15:02:43";

const PARAMETER_GROUPS = [
  "Inbound",
  "Outbound",
  "Inventory",
  "Robotic piece picking",
  "Logistics components",
  "AS/RS",
  "Stock reservation",
  "Event log",
  "PII",
  "Material handling",
  "Warehouse orchestration",
  "Portal",
];

const PARAMETER_ROWS: ParameterRow[] = [
  { id: "refil-category", code: "As.Refil.Category", value: "-1" },
  { id: "ports-to-log", code: "System.DriverEvent.DatabasePersister.PortsToLog", value: "–" },
  { id: "balance-correction", code: "Integration.BalanceCorrection.Level", value: "3 - Product" },
  { id: "pack-note", code: "PrintUsePackNote500", value: "–" },
  { id: "display-date", code: "Web.Format.DisplayDate", value: "–" },
  { id: "decimal-separator", code: "Sys.Qty.Decimal.Separator", value: "." },
  { id: "multiple-products", code: "As.Allow.Multiple.Products.Per.Bin", value: "0" },
  { id: "autostore-bin-ready", code: "Integration.AutoStoreBinReadyInPort.Export.On", value: "0" },
  { id: "thousands-separator", code: "Sys.Qty.Thousands.Separator", value: "–" },
  { id: "allow-zero-container", code: "Picking.AllowZeroQuantityContainer ON", value: "checked" },
  { id: "zero-item-0", code: "Picking.AllowZeroQuantityContainerItem", value: "0" },
  { id: "zero-item-12", code: "Picking.AllowZeroQuantityContainerItem", value: "12" },
  { id: "zero-item-1251", code: "Picking.AllowZeroQuantityContainerItem", value: "1251" },
  { id: "zero-item-empty", code: "Picking.AllowZeroQuantityContainerItem", value: "–" },
];

const PARAMETER_COLUMNS: DataTableColumn[] = [
  { key: "code", label: "Code", width: "50%", filterable: false },
  {
    key: "value",
    label: "Value",
    width: "50%",
    filterable: false,
    renderCell: value => value === "checked" ? <Checkbox state="checked" /> : String(value),
  },
];

export default function ConfigurationManager() {
  const [status, setStatus] = useState<ConfigStatus>("initial");
  const [saveOpen, setSaveOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportName, setExportName] = useState("Christmas high season config");
  const [notification, setNotification] = useState<NotificationState>(null);

  const showPanel = status !== "initial";
  const showFooter = status === "draft" || status === "saved";

  function createDraft() {
    setStatus("draft");
  }

  function saveConfiguration() {
    setSaveOpen(false);
    setStatus("saved");
  }

  function publishConfiguration() {
    setPublishOpen(false);
    setStatus("published");
  }

  function exportConfiguration() {
    setExportOpen(false);
    setNotification({
      title: "Configuration exported",
      message: `${exportName || "Configuration"} has been generated successfully.`,
    });
  }

  return (
    <>
      <PageLayout
        title="Configuration manager"
        subtitle="Control how the warehouse system behaves"
        headerActions={
          <VersionControls
            status={status}
            onCreateDraft={createDraft}
            onDiscard={() => setStatus("initial")}
          />
        }
      >
        <div className={["configuration-manager", showFooter ? "has-footer" : ""].join(" ")}>
          {showPanel && (
            <section className="configuration-manager__panel" aria-label="Parameters groups">
              <div className="configuration-manager__panel-header">
                <div className="configuration-manager__panel-title">
                  <span className="configuration-manager__panel-icon">
                    <Icon name="info" size="md" />
                  </span>
                  <strong>Parameters groups</strong>
                </div>

                <div className="configuration-manager__panel-actions">
                  <Button variant="secondary" leadingIcon="download" onClick={() => {}}>Import</Button>
                  <Button
                    variant="secondary"
                    leadingIcon="upload"
                    disabled={status === "draft"}
                    onClick={() => setExportOpen(true)}
                  >
                    Export
                  </Button>
                </div>
              </div>

              <div className="configuration-manager__panel-body">
                <aside className="configuration-manager__groups" aria-label="Parameter group list">
                  {PARAMETER_GROUPS.map(group => (
                    <button
                      key={group}
                      type="button"
                      className={[
                        "configuration-manager__group-item",
                        group === "Inbound" ? "is-active" : "",
                      ].join(" ")}
                    >
                      {group}
                    </button>
                  ))}
                </aside>

                <div className="configuration-manager__table-area">
                  <DataTableCore
                    columns={PARAMETER_COLUMNS}
                    rows={PARAMETER_ROWS}
                    rowIdKey="id"
                    showCustomize={false}
                    showActiveFilters={false}
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      </PageLayout>

      {showFooter && (
        <footer className="configuration-manager__footer">
          <strong>Configuration manager</strong>
          <div className="configuration-manager__footer-actions">
            <Button variant="secondary" leadingIcon="save" onClick={() => setSaveOpen(true)}>
              Save configuration
            </Button>
            <Button
              variant={status === "saved" ? "primary" : "secondary"}
              leadingIcon="public"
              disabled={status !== "saved"}
              onClick={() => setPublishOpen(true)}
            >
              Publish
            </Button>
          </div>
        </footer>
      )}

      <Dialog
        isOpen={saveOpen}
        title="Save configuration"
        icon="save"
        footerLeft={
          <Button variant="ghost" onClick={() => setSaveOpen(false)}>
            Cancel
          </Button>
        }
        footerRight={
          <Button onClick={saveConfiguration}>
            Save
          </Button>
        }
      >
        <div className="configuration-manager-dialog configuration-manager-dialog--save">
          <div className="configuration-manager-dialog__callout">
            <Icon name="info" size="sm" />
            <span>No data will be published immediately after you save your changes.</span>
          </div>
          <div className="configuration-manager-dialog__divider" />
          <div className="configuration-manager-dialog__summary-row">
            <span>Total edited:</span>
            <strong>216 parameters</strong>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={publishOpen}
        intent="warning"
        title="Publish configuration"
        icon="public"
        footerLeft={
          <Button variant="ghost" onClick={() => setPublishOpen(false)}>
            Cancel
          </Button>
        }
        footerRight={
          <Button onClick={publishConfiguration}>
            Publish
          </Button>
        }
      >
        <div className="configuration-manager-dialog configuration-manager-dialog--publish">
          <strong>You are about to publish new version to the live environment.</strong>
          <p>
            This will overwrite the current live configuration and cannot be undone from the UI. Make sure all parameters are correct before proceeding.
          </p>
          <div className="configuration-manager-dialog__divider" />
          <div className="configuration-manager-dialog__summary-row">
            <span>Version edition:</span>
            <strong>v 1.0.1</strong>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={exportOpen}
        title="Export configuration"
        icon="upload"
        footerLeft={
          <Button variant="ghost" onClick={() => setExportOpen(false)}>
            Cancel
          </Button>
        }
        footerRight={
          <Button onClick={exportConfiguration}>
            Generate file
          </Button>
        }
      >
        <div className="configuration-manager-dialog configuration-manager-dialog--export">
          <TextField
            label="Name of config"
            value={exportName}
            onChange={event => setExportName(event.target.value)}
          />
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
    </>
  );
}

type VersionControlsProps = {
  status: ConfigStatus;
  onCreateDraft: () => void;
  onDiscard: () => void;
};

function VersionControls({ status, onCreateDraft, onDiscard }: VersionControlsProps) {
  return (
    <div className="configuration-manager__version-bar">
      {status === "draft" && (
        <>
          <Button variant="ghost" intent="danger" size="sm" leadingIcon="delete" onClick={onDiscard}>
            Discard draft
          </Button>
          <span className="configuration-manager__version-separator" />
        </>
      )}

      <span className="configuration-manager__modified">Last modified: {LAST_MODIFIED}</span>
      <span className="configuration-manager__version-separator" />

      {status === "initial" && (
        <Button variant="secondary" leadingIcon="add" onClick={onCreateDraft}>
          Create new version
        </Button>
      )}

      {status === "draft" && <VersionPill label="New version" detail="Draft" tone="draft" />}
      {status === "saved" && (
        <>
          <VersionPill label="New version" detail="Saved" tone="saved" />
          <span className="configuration-manager__version-separator" />
          <Button variant="ghost" leadingIcon="add" onClick={onCreateDraft}>
            Create new version
          </Button>
        </>
      )}
      {status === "published" && (
        <>
          <VersionPill label="Current version" detail="Live" tone="live" />
          <span className="configuration-manager__version-separator" />
          <Button variant="ghost" leadingIcon="add" onClick={onCreateDraft}>
            Create new version
          </Button>
        </>
      )}
    </div>
  );
}

type VersionPillProps = {
  label: string;
  detail: string;
  tone: "draft" | "saved" | "live";
};

function VersionPill({ label, detail, tone }: VersionPillProps) {
  return (
    <span className={`configuration-manager__version-pill configuration-manager__version-pill--${tone}`}>
      <span className="configuration-manager__version-dot" />
      <span>{label}</span>
      <span className="configuration-manager__version-detail">{detail}</span>
    </span>
  );
}
