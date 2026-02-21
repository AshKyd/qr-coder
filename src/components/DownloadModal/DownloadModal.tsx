import { useState, useEffect, useRef } from "preact/hooks";
import QRLib from "qrcode";
import "./DownloadModal.css";

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
  const modalEl = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalEl.current) return;
    if (!modalEl.current.open) {
      modalEl.current.showModal();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const dialog = modalEl.current;
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

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

  return (
    <div class="qr-download-overlay" onClick={onClose}>
      <dialog
        class="qr-download-modal"
        ref={modalEl}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="modal-header d-flex justify-content-between align-items-center mb-4">
          <h2 class="h5 mb-0 fw-bold">Save QR Code</h2>
          <button type="button" class="btn-close" onClick={onClose}></button>
        </div>

        <div class="modal-body">
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-semibold d-block">File Format</label>
              <div class="d-flex gap-3">
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
                    class="form-check-label cursor-pointer"
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
                    class="form-check-label cursor-pointer"
                    for="format-svg"
                  >
                    SVG (Vector)
                  </label>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">Size (Pixels)</label>
              <select
                class="form-select"
                value={size}
                onChange={(e) => setSize(Number(e.currentTarget.value))}
              >
                <option value={256}>256 x 256</option>
                <option value={512}>512 x 512</option>
                <option value={1024}>1024 x 1024</option>
                <option value={2048}>2048 x 2048</option>
                <option value={4096}>4096 x 4096</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-footer mt-4 border-0 p-0">
          <button
            type="button"
            class="btn btn-secondary me-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary px-4"
            onClick={handleDownload}
          >
            Save
          </button>
        </div>
      </dialog>
    </div>
  );
}
