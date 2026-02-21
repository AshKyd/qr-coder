import { useState, useEffect } from "preact/hooks";
import IconInput from "../IconInput";

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
        <IconInput
          label="Network Name (SSID)"
          icon="wifi"
          placeholder="e.g. MyHomeWiFi"
          value={wifi.ssid}
          onInput={(val) => setWifi({ ...wifi, ssid: val })}
        />
      </div>
      <div class="col-12">
        <IconInput
          label="Password"
          type="password"
          icon="lock"
          placeholder="Network Password"
          value={wifi.password}
          onInput={(val) => setWifi({ ...wifi, password: val })}
        />
      </div>
      <div class="col-md-6">
        <label for="wifi-encryption" class="form-label fw-semibold">
          Encryption
        </label>
        <select
          id="wifi-encryption"
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
