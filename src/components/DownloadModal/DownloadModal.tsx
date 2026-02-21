import { useState } from "preact/hooks";
import QRLib from "qrcode";
import Modal from "../Common/Modal/Modal";

interface DownloadModalProps {
  data: string;
  errorCorrectionLevel: string;
  margin: number;
  fgColor: string;
  bgColor: string;
  onClose: () => void;
}

export default function DownloadModal({
  data,
  errorCorrectionLevel,
  margin,
  fgColor,
  bgColor,
  onClose,
}: DownloadModalProps) {
  const [format, setFormat] = useState("image/png");
  const [size, setSize] = useState(1024);

  const handleDownload = async () => {
    try {
      let downloadUrl = "";
      const filename = `qrcode-${Date.now()}.${format.split("/")[1] || "png"}`;

      if (format === "image/svg+xml") {
        const svgString = await QRLib.toString(data, {
          type: "svg",
          errorCorrectionLevel: errorCorrectionLevel as any,
          margin,
          width: size,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        downloadUrl = URL.createObjectURL(blob);
      } else {
        downloadUrl = await QRLib.toDataURL(data, {
          type: format as any,
          errorCorrectionLevel: errorCorrectionLevel as any,
          margin,
          width: size,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
      }

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (format === "image/svg+xml") {
        URL.revokeObjectURL(downloadUrl);
      }

      onClose();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to generate download. Please try again.");
    }
  };

  const footer = (
    <button
      type="button"
      class="btn btn-primary px-4 fw-bold"
      onClick={handleDownload}
    >
      Save
    </button>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Save QR Code"
      subtitle="Choose your preferred format and size"
      footer={footer}
      size="md"
    >
      <div class="row g-4">
        <div class="col-12">
          <label class="form-label fw-bold d-block mb-3">File Format</label>
          <div class="d-flex gap-4">
            <div class="form-check">
              <input
                class="form-check-input cursor-pointer"
                type="radio"
                name="qr-format"
                id="format-png"
                value="image/png"
                checked={format === "image/png"}
                onChange={(e) => setFormat(e.currentTarget.value)}
              />
              <label
                class="form-check-label cursor-pointer fw-medium"
                for="format-png"
              >
                PNG
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input cursor-pointer"
                type="radio"
                name="qr-format"
                id="format-svg"
                value="image/svg+xml"
                checked={format === "image/svg+xml"}
                onChange={(e) => setFormat(e.currentTarget.value)}
              />
              <label
                class="form-check-label cursor-pointer fw-medium"
                for="format-svg"
              >
                SVG (Vector)
              </label>
            </div>
          </div>
        </div>

        <div class="col-12">
          <label for="download-size" class="form-label fw-bold">
            Size (Pixels)
          </label>
          <select
            id="download-size"
            class="form-select form-select-lg"
            value={size}
            onChange={(e) => setSize(Number(e.currentTarget.value))}
          >
            <option value={256}>256 x 256</option>
            <option value={512}>512 x 512</option>
            <option value={1024}>1024 x 1024</option>
            <option value={2048}>2048 x 2048</option>
            <option value={4096}>4096 x 4096</option>
          </select>
          <div class="form-text mt-2">
            Higher resolution allows for larger prints without losing quality.
          </div>
        </div>
      </div>
    </Modal>
  );
}
