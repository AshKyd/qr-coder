import { useState, useEffect } from "preact/hooks";
import Icon from "../../Icon/Icon";
import GeoPasteModal from "./GeoPasteModal";

interface GeoModeProps {
  onChange: (value: string) => void;
}

export default function GeoMode({ onChange }: GeoModeProps) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!lat.trim() || !lon.trim()) {
      onChange("");
      return;
    }
    onChange(`geo:${lat.trim()},${lon.trim()}`);
  }, [lat, lon, onChange]);

  return (
    <div className="geo-mode">
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center fw-semibold shadow-sm"
          onClick={() => setShowModal(true)}
        >
          <Icon name="location" className="me-2" />
          Paste Map Link
        </button>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="latInput" className="form-label small fw-bold">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            id="latInput"
            className="form-control"
            placeholder="e.g. -37.8136"
            value={lat}
            onInput={(e) => setLat((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lonInput" className="form-label small fw-bold">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            id="lonInput"
            className="form-control"
            placeholder="e.g. 144.9631"
            value={lon}
            onInput={(e) => setLon((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
      <div className="form-text x-small mt-3">
        When scanned, this will open the location directly in maps.
      </div>

      {showModal && (
        <GeoPasteModal
          onClose={() => setShowModal(false)}
          onPaste={(pLat, pLon) => {
            setLat(pLat);
            setLon(pLon);
          }}
        />
      )}
    </div>
  );
}
