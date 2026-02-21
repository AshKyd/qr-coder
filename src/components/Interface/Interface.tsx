import { useState } from "preact/hooks";
import QRCode from "../QRCode/QRCode";
import "./Interface.css";

const EC_LEVELS = ["L", "M", "Q", "H"];
const EC_LABELS = [
  "Low (~7%)",
  "Medium (~15%)",
  "Quartile (~25%)",
  "High (~30%)",
];

export default function Interface() {
  const [value, setValue] = useState("");
  const [ecIndex, setEcIndex] = useState(1); // Default to "M"

  const errorCorrectionLevel = EC_LEVELS[ecIndex];

  return (
    <div class="container py-4">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0 bg-card">
            <div class="card-body p-4">
              <h1 class="h4 mb-4 fw-bold">QR Configuration</h1>

              <div class="mb-4">
                <label for="qr-content" class="form-label fw-semibold">
                  Content
                </label>
                <textarea
                  id="qr-content"
                  class="form-control form-control-lg"
                  placeholder="Type or paste something to encode..."
                  rows={4}
                  value={value}
                  onInput={(e) => setValue(e.currentTarget.value)}
                ></textarea>
              </div>

              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <label for="qr-ec" class="form-label fw-semibold mb-0">
                    Error Correction
                  </label>
                  <span class="badge bg-primary rounded-pill">
                    {EC_LABELS[ecIndex]}
                  </span>
                </div>
                <input
                  id="qr-ec"
                  type="range"
                  class="form-range"
                  min="0"
                  max="3"
                  step="1"
                  value={ecIndex}
                  onInput={(e) => setEcIndex(Number(e.currentTarget.value))}
                />
                <div class="d-flex justify-content-between x-small text-muted px-1">
                  <span>Lite</span>
                  <span>Robust</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card shadow-sm border-0 bg-card h-100">
            <div class="card-body p-4 d-flex flex-column align-items-center justify-content-center min-h-preview">
              <h2 class="h5 mb-4 fw-bold text-muted w-100 text-center">
                Preview
              </h2>
              <div class="qr-preview-wrapper d-flex align-items-center justify-content-center flex-grow-1">
                {value ? (
                  <QRCode
                    data={value}
                    errorCorrectionLevel={errorCorrectionLevel}
                  />
                ) : (
                  <div class="text-center text-muted opacity-50">
                    <div class="mb-2">✨</div>
                    <small>Enter content to see the QR code</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
