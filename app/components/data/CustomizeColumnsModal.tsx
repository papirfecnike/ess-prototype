import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { Icon } from "@/components/ui/icon/Icon";

import "./customize-columns-modal.css";

export type ColumnConfig = {
  key: string;
  label: string;
  visible: boolean;
  locked?: boolean;
};

type Props = {
  columns: ColumnConfig[];
  onClose: () => void;
  onSave: (columns: ColumnConfig[]) => void;
};

export function CustomizeColumnsModal({
  columns,
  onClose,
  onSave,
}: Props) {
  const [localColumns, setLocalColumns] =
    useState<ColumnConfig[]>(columns);

  function toggleColumn(key: string) {
    setLocalColumns((prev) =>
      prev.map((c) =>
        c.key === key && !c.locked
          ? { ...c, visible: !c.visible }
          : c
      )
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* HEADER */}
        <div className="modal-header">
          <Icon name="widthNormal" />
          <h3>Customize columns</h3>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <div className="modal-columns">
            {/* ACTIVE */}
            <div>
              <h4>Active columns</h4>

              {localColumns
                .filter((c) => c.visible)
                .map((c) => (
                  <div key={c.key} className="modal-row">
                    <Checkbox
                      state="checked"
                      disabled={c.locked}
                    />
                    <span>{c.label}</span>
                    {c.locked && (
                      <Icon name="lock" />
                    )}
                  </div>
                ))}
            </div>

            <div className="modal-divider" />

            {/* AVAILABLE */}
            <div>
              <h4>Available columns</h4>

              {localColumns
                .filter((c) => !c.visible)
                .map((c) => (
                  <div key={c.key} className="modal-row">
                    <Checkbox
                      state="unchecked"
                      onClick={() =>
                        toggleColumn(c.key)
                      }
                    />
                    <span>{c.label}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <Button
            variant="ghost"
            intent="danger"
            onClick={() =>
              setLocalColumns(columns)
            }
          >
            Reset to default
          </Button>

          <div className="modal-footer-actions">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={() => onSave(localColumns)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
