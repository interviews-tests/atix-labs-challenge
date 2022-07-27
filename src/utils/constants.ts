import { FileInLocalStorage, FileTypes } from "./interfaces";
export const fileToBase64 = (
  reader: FileReader,
  file: File | Blob
): Promise<string> =>
  new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
    reader.onerror = reject;
  });
export const decodeFileBase64 = (base64String: string) => {
  return decodeURIComponent(
    atob(base64String)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};
export const saveToLocalStorage = (
  key: string,
  items: FileInLocalStorage[]
) => {
  localStorage.setItem(key, JSON.stringify(items));
};
export const getImagesFromLocalStorage = (): Promise<FileInLocalStorage[]> =>
  new Promise((resolve, reject) => {
    try {
      const files = localStorage.getItem("files");
      const pngFiles: FileInLocalStorage[] = JSON.parse(files!);
      resolve(pngFiles.filter((file) => file.fileType === FileTypes.png));
    } catch (error) {
      reject(error);
    }
  });
export const getSheetsFromLocalStorage = (): Promise<FileInLocalStorage[]> =>
  new Promise((resolve, reject) => {
    try {
      const files = localStorage.getItem("files");
      const sheetFiles: FileInLocalStorage[] = JSON.parse(files!);
      resolve(sheetFiles.filter((file) => file.fileType === FileTypes.csv));
    } catch (error) {
      reject(error);
    }
  });
