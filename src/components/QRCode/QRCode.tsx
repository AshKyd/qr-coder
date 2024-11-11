import { useEffect, useState } from "preact/hooks";
import QRLib from "qrcode";

export default function QRCode({ data, errorCorrectionLevel }) {
  const [dataUrl, setDataUrl] = useState("");
  useEffect(() => {
    console.log("making code for", data);
    if (!data) {
      setDataUrl("");
      return;
    }
    // With promises
    QRLib.toDataURL(data, { errorCorrectionLevel })
      .then(setDataUrl)
      .catch((err) => {
        console.error(err);
      });
  }, [data, errorCorrectionLevel]);
  if (!dataUrl) return null;
  return <img src={dataUrl} alt="The corresponding QR code" />;
}
