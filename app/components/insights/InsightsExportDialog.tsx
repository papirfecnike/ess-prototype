import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { Select } from "@/components/ui/select/Select";

type Props = {
  isOpen: boolean;
  format: string | null;
  onFormatChange: (value: string | null) => void;
  onClose: () => void;
};

export function InsightsExportDialog({
  isOpen,
  format,
  onFormatChange,
  onClose,
}: Props) {
  return (
    <Dialog
      isOpen={isOpen}
      intent="default"
      icon="info"
      title="Export"
      footerLeft={
        <Button variant="ghost" intent="danger" leadingIcon="closeStroke" onClick={onClose}>
          Cancel
        </Button>
      }
      footerRight={
        <Button variant="primary" disabled={!format} onClick={onClose}>
          Download
        </Button>
      }
    >
      <div className="insights-export-dialog">
        <p>Choose a format to download your file: CSV, XLSX, or PNG</p>
        <Select
          label="Select here"
          value={format}
          searchable={false}
          onChange={onFormatChange}
          options={[
            { value: "csv", label: "CSV" },
            { value: "xlsx", label: "XLSX" },
            { value: "png", label: "PNG" },
          ]}
        />
      </div>
    </Dialog>
  );
}
