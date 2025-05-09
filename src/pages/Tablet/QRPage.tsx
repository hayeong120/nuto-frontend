import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import style from "../../styles/QRPage.module.css";

function QRPage() {
  return (
    <div className={style.qrContainer}>
      <img
        src="/images/QR.jpg"
        alt="QR"
        style={{ width: "100vw", height: "100vh", scrollBehavior: "smooth" }}
      />
      <QRCodeCanvas value={process.env.REACT_APP_NUTO_ROUTE!} />
    </div>
  );
}

export default QRPage;
