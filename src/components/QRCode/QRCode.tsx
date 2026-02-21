import { useEffect, useState } from "preact/hooks";
import QRLib from "qrcode";

export default function QRCode({ data, errorCorrectionLevel }) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!data) {
      setDataUrl("");
      return;
    }

    // Import dynamically for code splitting if needed, though 'qrcode' is small
    import("qrcode")
      .then((module) =>
        module.default.toDataURL(data, {
          errorCorrectionLevel,
          margin: 1,
          width: 300,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }),
      )
      .then(setDataUrl)
      .catch((err) => {
        console.error("QR Code generation failed:", err);
      });
  }, [data, errorCorrectionLevel]);

  if (!dataUrl) return null;

  // Using key={dataUrl} ensures the <img> element is replaced (and animation re-triggered)
  // whenever the dataUrl changes.
  return (
    <img
      key={dataUrl}
      src={dataUrl}
      alt="The corresponding QR code"
      class="animate-pulse"
    />
  );
}
