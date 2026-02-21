import { useEffect, useState } from "preact/hooks";
import "./QRCode.css";

export default function QRCode({
  data,
  errorCorrectionLevel,
  margin,
  fgColor = "#000000",
  bgColor = "#ffffff",
}) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!data) {
      setDataUrl("");
      return;
    }

    import("qrcode")
      .then((module) =>
        module.default.toDataURL(data, {
          errorCorrectionLevel,
          margin, // Revert to library-native margin
          width: 300,
          color: {
            dark: fgColor,
            light: bgColor, // Revert to library-native background
          },
        }),
      )
      .then(setDataUrl)
      .catch((err) => {
        console.error("QR Code generation failed:", err);
      });
  }, [data, errorCorrectionLevel, margin, fgColor, bgColor]);

  if (!dataUrl) return null;

  return (
    <div
      class="qr-preview-wrapper-inner"
      style={{
        backgroundColor: bgColor,
        borderRadius: "0.5rem",
      }}
    >
      <img
        key={`${dataUrl}-${margin}-${bgColor}`}
        src={dataUrl}
        alt="The corresponding QR code"
        class="qr-code-image animate-pulse"
      />
    </div>
  );
}
