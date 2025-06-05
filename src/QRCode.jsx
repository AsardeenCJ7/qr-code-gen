import { useEffect, useState } from "react";
import "./qrcode.css";

const QRCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQRData] = useState(
    "https://asardeencj7.github.io/qr-code-gen/"
  );
  const [size, setSize] = useState(250);
  const [countdown, setCountdown] = useState("");

  console.log(img);

  async function generateQR() {
    setLoading(true);

    // this is added for count down time loading
    // setCountdown(5); // set countdown seconds here
    // let counter = 5;

    // const interval = setInterval(() => {
    //   counter -= 1;
    //   setCountdown(counter);
    //   if (counter <= 0) clearInterval(interval);
    // }, 1000);

    try {
      // https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=asardeen
      // QR Code Generator

      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qrData
      )}`;
      // This is added for testing whether the loading state and disabled button are working properly
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait... {countdown}</p>}
      {img && (
        <img
          className="qr-code-image"
          src={img}
          alt=""
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            border: "1px solid black",
          }}
        />
      )}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          type="text"
          id="dataInput"
          placeholder="Enter data for QR code "
          value={qrData}
          onChange={(event) => {
            setQRData(event.target.value);
          }}
        />

        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150:)
        </label>
        <input type="text" id="sizeInput" placeholder="Enter image size" />
        {/* <button
          className="genBtn"
          onClick={() => {
            alert("Saved");
          }}
        >
          Generate QR Code
        </button> */}

        <div className="buttonContainer">
          <button className="genBtn" onClick={generateQR} disabled={loading}>
            Generate QR Code
          </button>
          <button className="downBtn" onClick={downloadQR}>
            Download QR Code
          </button>
        </div>
      </div>
      <p className="footer">
        Designed by : <a href="">AsardeenDev7</a>
      </p>
    </div>
  );
};

export default QRCode;
