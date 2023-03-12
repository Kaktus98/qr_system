import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useSelector } from "react-redux";

const ScanningPage = () => {
  const [uuidCode, setUuidCode] = useState(null);
  const scannerRef = useRef(null);
  const id_student = useSelector((state) => state.id);

  const sendValidationRequest = () => {
    fetch(`http://localhost:8080/validate`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ uuidCode, id_student }),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json()]);
        } else return Promise.reject("Invalid login attempt");
      })
      .then((data) => {
        // spracovanie úspešnej odpovede
        console.log(data);
      })
      .catch((error) => {
        // spracovanie chyby
        console.error(error);
      });
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    console.log(`Scan result: ${decodedText}`, decodedResult);
 
    setUuidCode(decodedText);

    sendValidationRequest();
  };

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };
    const scanner = new Html5QrcodeScanner(
      "reader",
      config /* { fps: 10, qrbox: 250 } */
    );
    scannerRef.current = scanner;
    scanner.render(onScanSuccess);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div id="reader" style={{ width: "10%" }}></div>
    </div>
  );
};

export default ScanningPage;
