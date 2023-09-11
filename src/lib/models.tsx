export interface NotiType {
  type: "success" | "error" | "info";
  message: string;
  isOpen: boolean;
}
