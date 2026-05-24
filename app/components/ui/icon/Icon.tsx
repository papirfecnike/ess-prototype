import "./icon.css";
import type { SvgIconComponent } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CloseIcon from "@mui/icons-material/Close";
import CompressIcon from "@mui/icons-material/Compress";
import DatabaseIcon from "@mui/icons-material/Storage";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import HistoryIcon from "@mui/icons-material/History";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import InboxIcon from "@mui/icons-material/Inbox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LastPageIcon from "@mui/icons-material/LastPage";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import PrintIcon from "@mui/icons-material/Print";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RefreshIcon from "@mui/icons-material/Refresh";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RuleIcon from "@mui/icons-material/Rule";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimelineIcon from "@mui/icons-material/Timeline";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import UploadIcon from "@mui/icons-material/FileUploadOutlined";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import type { IconName } from "./icons";

type IconSize = "xs" | "sm" | "md" | "lg";
type IconColor = "inherit" | "default" | "muted" | "primary" | "danger";

const SIZE_MAP: Record<IconSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 28,
};

type Props = {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

export function Icon({
  name,
  size = "md",
  color = "inherit",
  className,
  fill: _fill,
  stroke: _stroke,
  strokeWidth: _strokeWidth,
  ...rest
}: Props) {
  const px = SIZE_MAP[size];
  const MaterialIcon = MATERIAL_ICONS[name];

  if (!MaterialIcon) return null;

  return (
    <MaterialIcon
      style={{ width: px, height: px, fontSize: px }}
      className={[
        "icon",
        color !== "inherit" ? `icon--${color}` : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  );
}

const MATERIAL_ICONS: Record<IconName, SvgIconComponent> = {
  search: SearchIcon,
  filter: FilterListIcon,
  chevronDown: KeyboardArrowDownIcon,
  chevronDownStroke: KeyboardArrowDownIcon,
  chevronLeftStroke: KeyboardArrowLeftIcon,
  chevronRightStroke: KeyboardArrowRightIcon,
  chevronUpStroke: KeyboardArrowUpIcon,
  closeStroke: CloseIcon,
  checkStroke: CheckIcon,
  checklist: ChecklistIcon,
  minusStroke: RemoveIcon,
  moreVert: MoreVertIcon,
  dragIndicator: DragIndicatorIcon,
  close: CloseIcon,
  add: AddIcon,
  delete: DeleteOutlineIcon,
  edit: EditIcon,
  download: DownloadIcon,
  settings: SettingsIcon,
  barChart: AssessmentIcon,
  rocket: RocketLaunchIcon,
  profile: PersonIcon,
  forklift: LocalShippingIcon,
  history: HistoryIcon,
  warning: WarningAmberIcon,
  warehouse: WarehouseIcon,
  orders: ReceiptLongIcon,
  listAlt: ListAltIcon,
  compress: CompressIcon,
  straighten: StraightenIcon,
  alertTriangle: WarningAmberIcon,
  error: ErrorOutlineIcon,
  info: InfoOutlinedIcon,
  checkCircle: CheckCircleOutlineIcon,
  security: SecurityIcon,
  flag: BookmarkBorderIcon,
  inventory: Inventory2OutlinedIcon,
  inventory2: Inventory2OutlinedIcon,
  widthNormal: ViewColumnIcon,
  lock: LockIcon,
  clock: AccessTimeIcon,
  time: AccessTimeIcon,
  hourglass: HourglassEmptyIcon,
  schedule: ScheduleIcon,
  user: PersonIcon,
  refresh: RefreshIcon,
  save: SaveIcon,
  sensorDoor: SensorDoorIcon,
  print: PrintIcon,
  upload: UploadIcon,
  qrScanner: QrCodeScannerIcon,
  barcode: ViewWeekIcon,
  database: DatabaseIcon,
  archive: ArchiveIcon,
  unarchive: UnarchiveIcon,
  inbox: InboxIcon,
  activity: ShowChartIcon,
  arrowUpward: ArrowUpwardIcon,
  arrowDownward: ArrowDownwardIcon,
  firstPage: FirstPageIcon,
  lastPage: LastPageIcon,
  rule: RuleIcon,
  preset: DashboardCustomizeIcon,
  timeline: TimelineIcon,
};
