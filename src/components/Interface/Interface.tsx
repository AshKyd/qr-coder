import { useState, useEffect } from "preact/hooks";
import QRCode from "../QRCode/QRCode";
import "./Interface.css";

// Import Mode Components
import TextMode from "./Modes/TextMode";
import UrlMode from "./Modes/UrlMode";
import WifiMode from "./Modes/WifiMode";
import ContactMode from "./Modes/ContactMode";
import CalendarMode from "./Modes/CalendarMode";
import GeoMode from "./Modes/GeoMode";
import SmsEmailMode from "./Modes/SmsEmailMode";
import PhoneMode from "./Modes/PhoneMode";
import DownloadModal from "../DownloadModal/DownloadModal";
import SettingsPanel from "./SettingsPanel";
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
      "Create a QR code for a website link. Optional UTM parameters can be added for tracking.",
  },
  {
    id: "text",
    label: "Text",
    icon: "text",
    component: TextMode,
    explainer: "Encode plain text directly into a QR code for literal display.",
  },
  {
    id: "wifi",
    label: "WiFi",
    icon: "wifi",
    component: WifiMode,
    explainer: "Generate a configuration code for a wireless network.",
  },
  {
    id: "vcard",
    label: "Contact",
    icon: "contact",
    component: ContactMode,
    explainer: "Generate a vCard (3.0) file for saving contact information.",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: "calendar",
    component: CalendarMode,
    explainer:
      "Prompts to add an event with title, date, and location to the calendar.",
  },
  {
    id: "geo",
    label: "Location",
    icon: "location",
    component: GeoMode,
    explainer: "Opens coordinates directly in maps for easy navigation.",
  },
  {
    id: "sms_email",
    label: "SMS / Email",
    icon: "email",
    component: SmsEmailMode,
    explainer: "Opens messaging apps with recipient and body text pre-filled.",
  },
  {
    id: "phone",
    label: "Phone",
    icon: "phone",
    component: PhoneMode,
    explainer: "Generates a link to instantly call the encoded phone number.",
  },
];

export default function Interface() {
  const [modeId, setModeId] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return MODES.some((m) => m.id === hash) ? hash : "url";
  });
  const [ecIndex, setEcIndex] = useState(0); // Default to "L" (Lowest)
  const [qrValue, setQrValue] = useState("");
  const [margin, setMargin] = useState(1);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
        <div class="col-12">
          <div class="mode-scroll-container">
            <div class="mx-auto btn-group shadow-sm mode-toggle" role="group">
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
              <div class="w-100 d-flex justify-content-between align-items-center mb-0">
                <h2 class="h5 mb-0 fw-bold text-muted text-center flex-grow-1">
                  Preview
                </h2>
                <button
                  type="button"
                  class={`btn btn-sm ${showSettingsModal ? "btn-primary" : "btn-outline-secondary"} btn-square d-flex align-items-center justify-content-center ms-n5 transition-all`}
                  onClick={() => setShowSettingsModal(!showSettingsModal)}
                  title="Settings"
                >
                  <Icon name="settings" />
                </button>
              </div>

              <SettingsPanel
                isOpen={showSettingsModal}
                ecIndex={ecIndex}
                setEcIndex={setEcIndex}
                margin={margin}
                setMargin={setMargin}
                fgColor={fgColor}
                setFgColor={setFgColor}
                bgColor={bgColor}
                setBgColor={setBgColor}
              />

              <div class="qr-preview-wrapper d-flex align-items-center justify-content-center flex-grow-1 my-4">
                {qrValue ? (
                  <QRCode
                    data={qrValue}
                    errorCorrectionLevel={errorCorrectionLevel}
                    margin={margin}
                    fgColor={fgColor}
                    bgColor={bgColor}
                  />
                ) : (
                  <div class="text-center text-muted opacity-50">
                    <div class="mb-2">✨</div>
                    <small>Enter details above to see the QR code</small>
                  </div>
                )}
              </div>

              {qrValue && (
                <div class="w-100 mt-2">
                  <button
                    type="button"
                    class="btn btn-primary w-100 py-2 fw-bold"
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
          margin={margin}
          fgColor={fgColor}
          bgColor={bgColor}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </div>
  );
}
