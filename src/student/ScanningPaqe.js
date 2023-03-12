import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";

const ScanningPage = () => {
  const id_student = useSelector((state) => state.id);
  const [uuidCode, setData] = useState(null);

  useEffect(() => {
    if (uuidCode) {
      fetch(`http://localhost:8080/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ uuidCode, id_student }),
      })
        .then((response) => {
          if (response.status === 204) {
            return Promise.resolve();
          } else return Promise.reject("Invalid scanning attempt");
        })
        .then((uuidCode) => {
          // spracovanie úspešnej odpovede
        })
        .catch((error) => {
          // spracovanie chyby
          console.error(error);
        });
    }
  }, [uuidCode, id_student]);

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            console.log(result?.text);
          }

          if (!!error) {
            //console.info(error);
          }
        }}
        style={{ width: "100%" }}
        scanDelay={500} //kazda nova snimka po 500 milsec
      />
    </div>
  );
};

export default ScanningPage;
