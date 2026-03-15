import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { Chip } from "@/components/ui/chip/Chip";
import { Tag } from "@/components/ui/tag/Tag";
import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { RadioButton } from "@/components/ui/radiobutton/RadioButton";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { Notification } from "@/components/ui/notification/Notification";

function renderReasonTag(reason: string) {
  switch (reason) {
    case "Count mismatch": return <Tag label={reason} variant="mismatch" />;
    case "Expired": return <Tag label={reason} variant="expired" />;
    case "Missing": return <Tag label={reason} variant="missing" />;
    case "Wrong location": return <Tag label={reason} variant="location" />;
    case "Damaged": return <Tag label={reason} variant="damaged" />;
    default: return reason;
  }
}

export default function CompartmentsTab() {

  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeReasons, setActiveReasons] = useState<string[]>([]);

  const [showInspectionDialog, setShowInspectionDialog] = useState(false);
  const [inspectionMode, setInspectionMode] = useState<"existing" | "new" | null>(null);
  const [existingOpen, setExistingOpen] = useState(true);

  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleReasonCode, setScheduleReasonCode] = useState<string | null>(null);
  const [scheduleTime, setScheduleTime] = useState<string | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const columns: DataTableColumn[] = [
    { key: "product", label: "Product" },
    { key: "compartment", label: "Compartment ID" },
    { key: "bin", label: "Bin ID" },
    { key: "sku", label: "SKU" },
    { key: "stock", label: "Stock quantity" },
    { key: "reason", label: "Reason codes", renderCell: (v) => renderReasonTag(String(v)) },
    { key: "tasks", label: "Existing tasks" },
  ];

  const rows = [
    { id: 1, product: "Bisgaard Winter Boots - Pixie - Khaki", compartment: "COMP 1", bin: "HU-00246095", sku: "WD750", stock: 17, reason: "Wrong location", tasks: "INV-0000004" },
    { id: 2, product: "Name It Jumpsuit - NkfRoka - Burgundy", compartment: "COMP 2", bin: "HU-00246111", sku: "WF773", stock: 41, reason: "Count mismatch", tasks: "INV-0000004" },
    { id: 3, product: "Minymo Cardigan - Knitted - Woodrose", compartment: "COMP 1", bin: "HU-00292341", sku: "BW975", stock: 32, reason: "Wrong location", tasks: "INV-0000004" },
    { id: 4, product: "Minymo Cardigan w. Teddy - Parisian Night", compartment: "COMP 1", bin: "HU-01997721", sku: "WC551", stock: 45, reason: "Wrong location", tasks: "INV-0000004" },
    { id: 5, product: "adidas Performance Shoes - Advantage 2.0", compartment: "COMP 1", bin: "HU-01990082", sku: "WF685", stock: 45, reason: "Damaged", tasks: "INV-0000004" },
    { id: 6, product: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", compartment: "COMP 2", bin: "HU-01990987", sku: "WF681", stock: 27, reason: "Damaged", tasks: "INV-0000004" },
    { id: 7, product: "adidas Performance Shoes - Run 70s 2.0 EL C - Navy/White", compartment: "COMP 1", bin: "HU-01990989", sku: "BM841", stock: 32, reason: "Damaged", tasks: "INV-0000005" },
    { id: 8, product: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", compartment: "COMP 1", bin: "HU-01917882", sku: "WH768", stock: 11, reason: "Wrong location", tasks: "INV-0000005" },
  ];

  const selectedRowData = useMemo(() => {
    const idSet = new Set(selectedRows);
    return rows.filter(row => idSet.has(String(row.id)));
  }, [rows, selectedRows]);

  const inspectionBins = useMemo(() => {
    return Array.from(new Set(selectedRowData.map(r => r.bin)));
  }, [selectedRowData]);

  function toggleReason(reason: string) {
    setActiveReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  }

  const filteredRows = useMemo(() => {
    if (activeReasons.length === 0) return rows;
    return rows.filter(row => activeReasons.includes(row.reason));
  }, [rows, activeReasons]);

  const reasonStats = useMemo(() => {
    const map: Record<string, number> = {};
    rows.forEach(row => { map[row.reason] = (map[row.reason] ?? 0) + 1; });
    return Object.entries(map);
  }, [rows]);

  const detailsContent = (
    <>
      <div className="data-table__text">REASON CODES</div>
      <div className="data-table__chips">
        {reasonStats.map(([reason, count]) => (
          <Chip key={reason} isActive={activeReasons.includes(reason)} onClick={() => toggleReason(reason)}>
            {reason} ({count})
          </Chip>
        ))}
      </div>
    </>
  );

  const batchActions = (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setInspectionMode(null);
          setExistingOpen(true);
          setShowInspectionDialog(true);
        }}
      >
        Inspection
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setScheduleReasonCode(null);
          setScheduleTime(null);
          setShowScheduleDialog(true);
        }}
      >
        Schedule
      </Button>
      <Button size="sm" variant="ghost" intent="danger">Delete</Button>
    </>
  );

  const uniqueBins = useMemo(() => {
    return Array.from(new Set(selectedRowData.map(r => r.bin)));
  }, [selectedRowData]);

  return (
    <>
      <SelectableDataTable
        rowIdKey="id"
        columns={columns}
        rows={filteredRows}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        detailsContent={detailsContent}
        batchActions={batchActions}
      />

      {/* SCHEDULE DIALOG */}
      {showScheduleDialog && (
        <Dialog
          isOpen
          title="Schedule inspection"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              disabled={!scheduleTime}
              onClick={() => {
                setShowScheduleDialog(false);
                setShowSuccessNotification(true);
              }}
            >
              Schedule
            </Button>
          }
        >
          <div className="start-inspection-dialog__block">
            <div className="start-inspection-dialog__new">
              <span className="start-inspection-dialog__title">Selected compartments</span>
              <span className="start-inspection-dialog__count">
                {selectedRowData.length} compartments in {uniqueBins.length} bins
              </span>
            </div>

            <div className="start-inspection-dialog__row">
              <span>Bins included</span>
              <div className="start-inspection-dialog__chips">
                {uniqueBins.map(bin => (
                  <Chip key={bin}>{bin}</Chip>
                ))}
              </div>
            </div>
          </div>

          <Select
            label="Reason code (optional)"
            variant="single"
            value={scheduleReasonCode}
            onChange={setScheduleReasonCode}
            options={[
              { value: "count_mismatch", label: "Count mismatch" },
              { value: "expired", label: "Expired" },
              { value: "missing", label: "Missing" },
              { value: "wrong_location", label: "Wrong location" },
              { value: "damaged", label: "Damaged" },
            ]}
          />

          <Select
            label="Expected time of scheduling"
            variant="single"
            value={scheduleTime}
            onChange={setScheduleTime}
            options={[
              { value: "asap", label: "As soon as possible" },
              { value: "today", label: "Today" },
              { value: "this_week", label: "This week" },
              { value: "next_week", label: "Next week" },
            ]}
          />

          <div className="start-inspection-dialog__info">
            <Icon name="info" />
            <span>
              All compartments will be assigned the same inspection ID. The status will
              progress: Scheduled → Preparing → Prepared
            </span>
          </div>
        </Dialog>
      )}

      {/* INSPECTION DIALOG */}
      {showInspectionDialog && (
        <Dialog
          isOpen
          title="Start inspection"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowInspectionDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              disabled={!inspectionMode}
              onClick={() => {
                if (!inspectionMode) return;
                const firstRow = selectedRowData[0];
                setShowInspectionDialog(false);
                setInspectionMode(null);
                if (firstRow) {
                  navigate(`/inventory/inspection-product?id=${firstRow.sku}`);
                }
              }}
            >
              Start
            </Button>
          }
        >

          <div className="start-inspection-dialog__info">
            <Icon name="info" />
            <span>
              You have selected compartments that are connected to an existing task group.
              All the connected tasks will be delivered to the port if you proceed.
            </span>
          </div>

          <div className="start-inspection-dialog__block">
            <span className="start-inspection-dialog__title">
              Select existing task group:
            </span>

            <div
              className="start-inspection-dialog__option-row"
              onClick={() => setInspectionMode("existing")}
            >
              <RadioButton checked={inspectionMode === "existing"} />
              <div className="start-inspection-dialog__task">
                <div
                  className="start-inspection-dialog__task-header"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectionMode("existing");
                    setExistingOpen(o => !o);
                  }}
                >
                  <Tag label="INV-0000004" variant="outlined" />
                  <span className="start-inspection-dialog__task-count">
                    ({selectedRowData.length} compartments)
                  </span>
                  <Icon name={existingOpen ? "chevronUpStroke" : "chevronDownStroke"} />
                </div>

                {existingOpen && (
                  <div className="start-inspection-dialog__table-wrapper">
                    <table className="start-inspection-dialog__table">
                      <thead>
                        <tr>
                          <th>Bin</th>
                          <th>Comp.</th>
                          <th>SKU</th>
                          <th>Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRowData.map((row, i) => (
                          <tr key={i}>
                            <td>{row.bin}</td>
                            <td>{row.compartment}</td>
                            <td>{row.sku}</td>
                            <td>{row.product}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="start-inspection-dialog__divider">OR</div>

          <div className="start-inspection-dialog__block">
            <span className="start-inspection-dialog__title">
              Create a new inspection from the selected compartments:
            </span>

            <div
              className="start-inspection-dialog__option-row"
              onClick={() => setInspectionMode("new")}
            >
              <RadioButton checked={inspectionMode === "new"} />
              <div className="start-inspection-dialog__container">
                <div className="start-inspection-dialog__new">
                  <span>Compartments</span>
                  <span className="start-inspection-dialog__count">
                    {selectedRowData.length} compartments
                  </span>
                </div>
                <div className="start-inspection-dialog__row">
                  <span>Bins to be delivered</span>
                  <div className="start-inspection-dialog__chips">
                    {inspectionBins.map(bin => (
                      <Chip key={bin}>{bin}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Dialog>
      )}

      {/* SUCCESS NOTIFICATION */}
      {showSuccessNotification && (
        <Notification
          intent="success"
          title="Inspection scheduled"
          message="The selected compartments have been successfully scheduled for inspection."
          onClose={() => setShowSuccessNotification(false)}
        />
      )}
    </>
  );
}