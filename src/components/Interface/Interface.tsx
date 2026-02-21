import { useState, useEffect } from "preact/hooks";
import QRCode from "../QRCode/QRCode";
import "./Interface.css";

// Import Mode Components
import TextMode from "./Modes/TextMode";
import UrlMode from "./Modes/UrlMode";
import WifiMode from "./Modes/WifiMode";
import ContactMode from "./Modes/ContactMode";
import DownloadModal from "../DownloadModal/DownloadModal";
import Icon from "../Icon/Icon";

const EC_LEVELS = ["L", "M", "Q", "H"];
const EC_LABELS = [
  "Low (~7%)",
  "Medium (~15%)",
  "Quartile (~25%)",
  "High (~30%)",
];

const MODES = [
  {
    id: "url",
    label: "URL",
    icon: "globe",
    component: UrlMode,
    explainer:
      "Create a QR code for a website link. Optional UTM parameters can be added for tracking clicks from physical placements like flyers or business cards.",
  },
  {
    id: "text",
    label: "Text",
    icon: "text",
    component: TextMode,
    explainer:
      "Encode plain text directly into a QR code. When scanned, the device will display the literal text content on the screen.",
  },
  {
    id: "wifi",
    label: "WiFi",
    icon: "wifi",
    component: WifiMode,
    explainer:
      "Generate a configuration code for a wireless network. Scanning this allows devices to join the network without manually entering the SSID or password.",
  },
  {
    id: "vcard",
    label: "Contact",
    icon: "contact",
    component: ContactMode,
    explainer:
      "Generate a vCard (3.0) file. Scanners will recognize this as contact information and prompt the user to save it to their address book.",
  },
];

export default function Interface() {
  const [modeId, setModeId] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return MODES.some((m) => m.id === hash) ? hash : "url";
  });
  const [ecIndex, setEcIndex] = useState(0); // Default to "L" (Lowest)
  const [qrValue, setQrValue] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    window.location.hash = modeId;
  }, [modeId]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (MODES.some((m) => m.id === hash)) {
        setModeId(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const errorCorrectionLevel = EC_LEVELS[ecIndex];
  const activeMode = MODES.find((m) => m.id === modeId) || MODES[0];
  const ModeComponent = activeMode.component;

  return (
    <div class="container py-4">
      {/* Mode Selector */}
      <div class="row mb-4">
        <div class="col-12 text-center">
          <div class="btn-group shadow-sm mode-toggle" role="group">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                class={`btn btn-outline-primary d-inline-flex align-items-center justify-content-center px-3 px-md-4 py-2 ${modeId === m.id ? "active" : ""}`}
                onClick={() => setModeId(m.id)}
              >
                <Icon name={m.icon} className="fs-5 me-sm-2" />
                <span class="d-none d-sm-inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0 bg-card">
            <div class="card-body p-4">
              <div class="mb-4">
                {MODES.map((m) => (
                  <div
                    key={m.id}
                    className={modeId === m.id ? "d-block" : "d-none"}
                  >
                    <h1 class="h4 mb-2 fw-bold text-capitalize">
                      {m.label} QR Code Generator
                    </h1>
                    <p class="text-muted small mb-0">{m.explainer}</p>
                  </div>
                ))}
              </div>

              <div class="mb-4">
                <ModeComponent onChange={setQrValue} />
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
              <div class="qr-preview-wrapper d-flex align-items-center justify-content-center flex-grow-1 mb-4">
                {qrValue ? (
                  <QRCode
                    data={qrValue}
                    errorCorrectionLevel={errorCorrectionLevel}
                  />
                ) : (
                  <div class="text-center text-muted opacity-50">
                    <div class="mb-2">✨</div>
                    <small>Enter details above to see the QR code</small>
                  </div>
                )}
              </div>

              {qrValue && (
                <div class="w-100">
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

                  <button
                    type="button"
                    class="btn btn-primary w-100 mt-4 py-2 fw-bold"
                    onClick={() => setShowDownloadModal(true)}
                  >
                    <Icon name="save" className="me-2" />
                    Save QR Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal
          data={qrValue}
          errorCorrectionLevel={errorCorrectionLevel}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </div>
  );
}
