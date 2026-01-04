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

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigurationVersionHistory() {
  /* =========================
     STATE
     ========================= */

  const [versionName, setVersionName] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 SINGLE select
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [backupCurrent, setBackupCurrent] = useState(false);

  /* =========================
     DERIVED STATE
     ========================= */

  const canSave = Boolean(versionName && description);
  const canLoad = Boolean(selectedVersion);
  const canApply = canSave && canLoad;

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
          {/* SAVE CONFIGURATION */}
          <Card className="layout-card-fill">
            <div>
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
                onChange={(e) => setVersionName(e.target.value)}
              />

              <TextField
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="layout-card-action">
                <Button leadingIcon="save" disabled={!canSave}>
                  Save configuration
                </Button>
              </div>
            </div>
          </Card>

          {/* LOAD CONFIGURATION */}
          <Card className="layout-card-fill">
            <div>
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
                onChange={setSelectedVersion}
                options={[
                  { value: "v2.4.1", label: "v2.4.1 – Production" },
                  { value: "v2.4.0", label: "v2.4.0 – Stable" },
                ]}
              />

              <label className="layout-checkbox">
                <input
                  type="checkbox"
                  checked={backupCurrent}
                  onChange={(e) => setBackupCurrent(e.target.checked)}
                />
                Backup current configuration
              </label>

              <div className="layout-card-action">
                <Button
                  leadingIcon="refresh"
                  disabled={!canLoad}
                >
                  Load configuration
                </Button>
              </div>
            </div>
          </Card>

          {/* APPLY CONFIGURATION */}
          <Card className="layout-card-fill">
            <div>
              <Icon name="rocket" />
              <div>
                <h3>Apply configuration</h3>
                <p>Apply configuration to current environment</p>
              </div>
            </div>

            <div className="layout-stack layout-card-body">
              <p>
                Make sure a configuration is saved and loaded before applying.
              </p>

              <div className="layout-card-action">
                <Button
                  leadingIcon="rocket"
                  disabled={!canApply}
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
        <div className="layout-stack">
          <div className="layout-split">
            <div className="layout-stack">
              {/* HEADER ROW */}
              <div className="version-header-row">
                <Tag label="v2.4.1" />
                <span className="version-title">Production release</span>
                <Tag label="Current" variant="success" />
              </div>

              {/* DESCRIPTION */}
              <p className="version-description">
                Updated robot arm timeout settings and improved error handling
                across warehouse modules.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="version-actions">
              <span className="version-meta">
                <Icon name="time" size="xs" />
                23-10-2025
              </span>

              <span className="version-meta">
                <Icon name="user" size="xs" />
                Admin
              </span>

              <Button variant="ghost" leadingIcon="refresh">
                Restore
              </Button>

              <button
                type="button"
                className="version-expand-trigger"
                aria-label="Expand version"
              >
                <Icon name="chevronDown" />
              </button>
            </div>
          </div>

          {/* EXPANDED CONTENT (accordion body – később state-ből) */}
          {/* <div className="version-expanded">
            …további részletek…
          </div> */}
        </div>
      </div>
      </Card>
    </PageSection>

    </PageLayout>
  );
}
