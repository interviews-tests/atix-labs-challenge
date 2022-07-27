import React, { useEffect, useState } from "react";
import { getSheetsFromLocalStorage } from "../utils/constants";
import { FileInLocalStorage } from "../utils/interfaces";

const SheetsPage = () => {
  const [sheets, setSheets] = useState<FileInLocalStorage[]>([]);
  const getSheets = async () => {
    try {
      const _sheets = await getSheetsFromLocalStorage();
      setSheets(_sheets);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSheets();
  }, []);
  return (
    <>
      <h2>Sheets:</h2>
      {sheets.length ? (
        <div className="container mt-2">
          <ul className="list-group">
            {sheets.map((sheet) => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {sheet.name}
                  <div>
                    <small>Amount: </small>
                    <span className="badge bg-primary rounded-pill">
                      {sheet.amount}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>NO SHEETS TO SHOW</p>
      )}
    </>
  );
};
export default SheetsPage;
