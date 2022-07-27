export interface FileInLocalStorage {
  name: string;
  timestamp: number;
  src: string;
  fileType: string;
  amount?: number;
}
export enum FileTypes {
  png = "png",
  csv = "csv",
}