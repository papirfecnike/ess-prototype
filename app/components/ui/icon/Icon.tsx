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
import CloseIcon from "@mui/icons-material/Close";
import DatabaseIcon from "@mui/icons-material/Storage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import HistoryIcon from "@mui/icons-material/History";
import InboxIcon from "@mui/icons-material/Inbox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LastPageIcon from "@mui/icons-material/LastPage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import PrintIcon from "@mui/icons-material/Print";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import RefreshIcon from "@mui/icons-material/Refresh";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RuleIcon from "@mui/icons-material/Rule";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { IconName } from "./icons";

type IconSize = "xs" | "sm" | "md" | "lg";
type IconColor = "inherit" | "default" | "muted" | "primary" | "danger";

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
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
  user: PersonIcon,
  refresh: RefreshIcon,
  save: SaveIcon,
  print: PrintIcon,
  qrScanner: QrCodeScannerIcon,
  barcode: ViewWeekIcon,
  database: DatabaseIcon,
  archive: ArchiveIcon,
  inbox: InboxIcon,
  activity: ShowChartIcon,
  arrowUpward: ArrowUpwardIcon,
  arrowDownward: ArrowDownwardIcon,
  firstPage: FirstPageIcon,
  lastPage: LastPageIcon,
  rule: RuleIcon,
  timeline: TimelineIcon,
};
