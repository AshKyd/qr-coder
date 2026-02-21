import { useState, useEffect } from "preact/hooks";

interface WifiModeProps {
  onChange: (qrString: string) => void;
}

export default function WifiMode({ onChange }: WifiModeProps) {
  const [wifi, setWifi] = useState({
    ssid: "",
    password: "",
    hidden: false,
    encryption: "WPA",
  });

  useEffect(() => {
    if (!wifi.ssid) {
      onChange("");
      return;
    }
    onChange(
      `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};H:${wifi.hidden};;`,
    );
  }, [wifi, onChange]);

  return (
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label fw-semibold">Network Name (SSID)</label>
        <input
          type="text"
          class="form-control"
          placeholder="e.g. MyHomeWiFi"
          value={wifi.ssid}
          onInput={(e) => setWifi({ ...wifi, ssid: e.currentTarget.value })}
        />
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Network Password"
          value={wifi.password}
          onInput={(e) => setWifi({ ...wifi, password: e.currentTarget.value })}
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Encryption</label>
        <select
          class="form-select"
          value={wifi.encryption}
          onChange={(e) =>
            setWifi({ ...wifi, encryption: e.currentTarget.value })
          }
        >
          <option value="WPA">WPA/WPA2 (usually correct)</option>
          <option value="SAE">WPA3 (SAE)</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>
      <div class="col-md-6 d-flex align-items-end">
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="wifi-hidden"
            checked={wifi.hidden}
            onChange={(e) =>
              setWifi({ ...wifi, hidden: e.currentTarget.checked })
            }
          />
          <label class="form-check-label" for="wifi-hidden">
            Hidden SSID
          </label>
        </div>
      </div>
    </div>
  );
}
