import { useState, useEffect } from "preact/hooks";
import { useRoute, useLocation } from "preact-iso";
import QRCode from "../QRCode/QRCode";
import { routeMeta } from "../../route-meta";
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
import Modal from "../Common/Modal/Modal";

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
      "Links to a website. Optional UTM parameters can be added for tracking.",
  },
  {
    id: "wifi",
    label: "WiFi",
    icon: "wifi",
    component: WifiMode,
    explainer:
      "Allows the user to join a WiFi network without having to enter the password manually. Note: your password can still be extracted from the qr code.",
  },
  {
    id: "vcard",
    label: "Contact",
    icon: "contact",
    component: ContactMode,
    explainer: "Generate a vCard file for sharing contact information.",
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
    label: "Messaging",
    icon: "email",
    component: SmsEmailMode,
    explainer:
      "Opens messaging apps (SMS, Email, WhatsApp) with recipient and body text pre-filled.",
  },
  {
    id: "phone",
    label: "Phone",
    icon: "phone",
    component: PhoneMode,
    explainer: "Prompts the user to call the given number.",
  },
  {
    id: "text",
    label: "Text",
    icon: "text",
    component: TextMode,
    explainer:
      "Encode plain text directly into a QR code, for creating custom formats or sharing data.",
  },
];

export default function Interface({
  showModeSwitcher: showModeDropdown = false,
  setShowModeSwitcher = (_val: boolean) => {},
  path: _path,
}: {
  showModeSwitcher?: boolean;
  setShowModeSwitcher?: (val: any) => void;
  path?: string;
}) {
  const { params } = useRoute();
  const { route } = useLocation();

  const modeId = params.mode || "url";
  const [ecIndex, setEcIndex] = useState(0); // Default to "L" (Lowest)
  const [qrValue, setQrValue] = useState("");
  const [margin, setMargin] = useState(1);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const errorCorrectionLevel = EC_LEVELS[ecIndex];
  const activeMode = MODES.find((m) => m.id === modeId) || MODES[0];
  const ModeComponent = activeMode.component;

  useEffect(() => {
    if (typeof document !== "undefined") {
      const currentPath = modeId === "url" ? "/" : `/${modeId}`;
      const meta = routeMeta[currentPath] || routeMeta["/"];

      if (meta) {
        document.title = meta.title;
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) descMeta.setAttribute("content", meta.description);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", meta.title);

        const ogDesc = document.querySelector(
          'meta[property="og:description"]',
        );
        if (ogDesc) ogDesc.setAttribute("content", meta.description);
      }
    }
  }, [modeId]);

  return (
    <div class="container py-4">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="card shadow-sm border-0 bg-card">
            <div class="card-body p-4">
              <div class="mb-4">
                <div class="d-flex align-items-center flex-wrap gap-2">
                  <h1 class="h4 mb-0 fw-bold d-inline-flex align-items-center gap-2">
                    <div class="mode-dropdown-header">
                      <button
                        type="button"
                        class="mode-dropdown-toggle fw-bold"
                        onClick={() => setShowModeSwitcher(!showModeDropdown)}
                        aria-expanded={showModeDropdown}
                        aria-haspopup="true"
                        id="modeDropdownButton"
                      >
                        <span>{activeMode.label}</span>
                        <Icon
                          name="chevron-down"
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      </button>
                    </div>
                    QR Code creator
                  </h1>

                  <Modal
                    isOpen={showModeDropdown}
                    onClose={() => setShowModeSwitcher(false)}
                    title="Choose your QR Type"
                    subtitle="Select the format for your QR code"
                    size="lg"
                  >
                    <div class="qr-mode-list">
                      {MODES.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          class={`qr-mode-item ${(modeId === m.id && modeId !== "url") || (!params.mode && m.id === "url") ? "active" : ""}`}
                          onClick={() => {
                            route(m.id === "url" ? "/" : "/" + m.id);
                            setShowModeSwitcher(false);
                          }}
                        >
                          <div class="qr-mode-item__icon">
                            <Icon name={m.icon} />
                          </div>
                          <div class="qr-mode-item__content">
                            <div class="qr-mode-item__title">{m.label}</div>
                            <div class="qr-mode-item__description">
                              {m.explainer}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Modal>
                </div>
                <p class="text-muted small mt-2 mb-0">{activeMode.explainer}</p>
              </div>

              <hr />

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
