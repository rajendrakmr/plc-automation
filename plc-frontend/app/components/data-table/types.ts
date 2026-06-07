// ─── Shared types for DataTable system ───────────────────────────────────────

export type SortDir = "asc" | "desc";

/** One column definition — key maps to a field in your row data */
export interface ColDef<T> {
  key: keyof T;
  label: string;
  width?: string;
  /** Optional custom cell renderer */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/** Tab definition */
export interface TabDef {
  key: string;
  label: string;
  count?: number | null;
  /** "info" | "success" | "danger" */
  badgeType?: "info" | "success" | "danger";
}

/** Bulk action button definition */
export interface BulkAction {
  label: string;
  icon: string;
  action: string;
  danger?: boolean;
}

/** Row action in the three-dot menu */
export interface RowAction {
  label: string;
  icon: string;
  action: string;
  danger?: boolean;
}

/** Props passed into DataTable */
export interface DataTableProps<T extends Record<string, unknown>> {
  // Data
  rows: T[];
  rowKey: keyof T;
  columns: ColDef<T>[];
  total: number;

  // Pagination
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onLimitChange: (l: number) => void;

  // Search & sort
  onSearch: (q: string) => void;
  searchPlaceholder?: string;
  sortKey?: keyof T;
  sortDir?: SortDir;
  onSort?: (key: keyof T) => void;

  // State
  loading?: boolean;
  error?: string | null;
  onRefetch?: () => void;

  // Tabs
  tabs?: TabDef[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;

  // Actions
  rowActions?: RowAction[];
  bulkActions?: BulkAction[];
  onRowAction?: (action: string, id: string | number) => void;
  onBulkAction?: (action: string, ids: (string | number)[]) => void;

  // Topbar
  title?: string;
  editPage?: string;
  headerSlot?: React.ReactNode;
}