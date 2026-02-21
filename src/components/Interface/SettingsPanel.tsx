import "./SettingsPanel.css";

const EC_LABELS = [
  "Low (~7%)",
  "Medium (~15%)",
  "Quartile (~25%)",
  "High (~30%)",
];

interface SettingsPanelProps {
  isOpen: boolean;
  ecIndex: number;
  setEcIndex: (val: number) => void;
  margin: number;
  setMargin: (val: number) => void;
  fgColor: string;
  setFgColor: (val: string) => void;
  bgColor: string;
  setBgColor: (val: string) => void;
}

export default function SettingsPanel({
  isOpen,
  ecIndex,
  setEcIndex,
  margin,
  setMargin,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
}: SettingsPanelProps) {
  return (
    <div class={`qr-settings-panel ${isOpen ? "is-open" : ""}`}>
      <div class="qr-settings-panel__content pt-3 pb-4 px-1">
        <div class="row g-3">
          <div class="col-12">
            <label
              for="ec-range"
              class="form-label fw-bold small text-uppercase text-muted d-flex justify-content-between mb-2"
            >
              Error Correction
              <span class="badge bg-primary rounded-pill">
                {EC_LABELS[ecIndex]}
              </span>
            </label>
            <input
              id="ec-range"
              type="range"
              class="form-range"
              min="0"
              max="3"
              step="1"
              value={ecIndex}
              onInput={(e) => setEcIndex(Number(e.currentTarget.value))}
            />
          </div>

          <div class="col-12 mb-2">
            <label
              for="margin-select"
              class="form-label fw-bold small text-uppercase text-muted mb-2"
            >
              Quiet Zone (Margin)
            </label>
            <select
              id="margin-select"
              class="form-select form-select-sm"
              value={margin}
              onChange={(e) => setMargin(Number(e.currentTarget.value))}
            >
              <option value={0}>No Margin</option>
              <option value={1}>Small (1)</option>
              <option value={4}>Standard (4)</option>
              <option value={8}>Large (8)</option>
            </select>
          </div>

          <div class="col-6">
            <label
              for="fg-color"
              class="form-label fw-bold small text-uppercase text-muted mb-2"
            >
              Foreground
            </label>
            <div class="d-flex align-items-center gap-2">
              <input
                id="fg-color"
                type="color"
                class="form-control form-control-color"
                value={fgColor}
                onInput={(e) => setFgColor(e.currentTarget.value)}
              />
              <code class="x-small text-muted">{fgColor}</code>
            </div>
          </div>

          <div class="col-6">
            <label
              for="bg-color"
              class="form-label fw-bold small text-uppercase text-muted mb-2"
            >
              Background
            </label>
            <div class="d-flex align-items-center gap-2">
              <input
                id="bg-color"
                type="color"
                class="form-control form-control-color"
                value={bgColor}
                onInput={(e) => setBgColor(e.currentTarget.value)}
              />
              <code class="x-small text-muted">{bgColor}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
