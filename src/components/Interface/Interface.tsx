import { useState } from "preact/hooks";
import QRCode from "../QRCode/QRCode";
import "./Interface.css";

export default function Interface() {
  const [value, setValue] = useState("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  return (
    <div class="qr-interface">
      <form class="qr-interface__form">
        <label class="qr-interface__field">
          Content:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </label>
        <label class="qr-interface__field">
          Error correction
          <select
            onChange={(e) => setErrorCorrectionLevel(e.target.value)}
            value={errorCorrectionLevel}
          >
            <option value="L">Low (~7%)</option>
            <option value="M">Medium (~15%)</option>
            <option value="Q">Quartile (~25%)</option>
            <option value="H">High (~30%)</option>
          </select>
        </label>
      </form>
      <div class="qr-interface__preview">
        <QRCode data={value} errorCorrectionLevel={errorCorrectionLevel} />
      </div>
    </div>
  );
}
