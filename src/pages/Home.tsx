import React, { useRef } from "react";
import { fileToBase64, saveToLocalStorage } from "../utils/constants";
import { FileInLocalStorage, FileTypes } from "../utils/interfaces";
import * as Papa from "papaparse";

const HomePage = () => {
  const localStorageData = localStorage.getItem("files");
  const reader = new FileReader();
  const uploaderRef = useRef();
  let files: FileInLocalStorage[] = [];
  const save = (obj: FileInLocalStorage) => {
    if (localStorageData!) {
      files = JSON.parse(localStorageData);
    }
    files.push(obj);
    saveToLocalStorage("files", files);
  };
  const readAndSave = async (file: File) => {
    try {
      let fileObj: FileInLocalStorage;
      if (/\.(png)$/i.test(file.name)) {
        const res = await fileToBase64(reader, file);
        fileObj = {
          name: file.name,
          timestamp: Date.now(),
          src: res,
          fileType: FileTypes.png,
        };
        save(fileObj);
      } else {
        reader.onload = async ({ target }) => {
          const csv: Papa.ParseResult<unknown> = Papa.parse(
            target?.result! as string
          );
          const parsedData = csv?.data;
          const columns = parsedData[0] as string[];
          // NOT SURE IF THIS IS WHAT THE CHALLENGE WANTS ;)
          if (columns[0] === 'Title') {
            const text = target?.result;
            fileObj = {
              name: file.name,
              timestamp: Date.now(),
              src: JSON.stringify(text),
              fileType: FileTypes.csv,
              amount: parsedData.length -1,
            };
            save(fileObj);
          } else alert("INVALID CSV FORMAT");
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files?.length) {
        readAndSave(e.target.files[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Uploader:</h2>
      <div className="mb-3">
        <label htmlFor="fileUploader" className="form-label">
          Allowed files are <strong>.png or .csv</strong>
        </label>
        <input
          className="form-control"
          type="file"
          id="fileUploader"
          accept={".png, .csv"}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};
export default HomePage;
