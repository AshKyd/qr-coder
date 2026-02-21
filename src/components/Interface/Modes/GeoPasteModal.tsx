import { useState, useEffect, useRef } from "preact/hooks";
import Icon from "../../Icon/Icon";
import IconInput from "../IconInput";
import "./GeoPasteModal.css";

interface GeoPasteModalProps {
  onPaste: (lat: string, lon: string) => void;
  onClose: () => void;
}

export default function GeoPasteModal({
  onPaste,
  onClose,
}: GeoPasteModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
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

  const handleParse = () => {
    if (!input.trim()) {
      setError("Please paste a link or coordinates.");
      return;
    }

    try {
      // 1. Try URL parsing
      const urlString = input.trim();
      let latVal = "";
      let lonVal = "";

      if (urlString.startsWith("http")) {
        const url = new URL(urlString);
        const params = url.searchParams;

        // Apple Maps 'coordinate' or Google Maps 'll'
        const coordParam = params.get("coordinate") || params.get("ll");
        if (coordParam) {
          const [pLat, pLon] = coordParam.split(",");
          if (pLat && pLon) {
            latVal = pLat.trim();
            lonVal = pLon.trim();
          }
        }

        // Google Maps path format: /@lat,lon
        if (!latVal) {
          const pathCoords = url.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
          if (pathCoords) {
            latVal = pathCoords[1];
            lonVal = pathCoords[2];
          }
        }

        // If still nothing, try to find ANY lat,lon in the URL (including query string)
        if (!latVal) {
          const genericCoords = urlString.match(
            /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/,
          );
          if (genericCoords) {
            latVal = genericCoords[1];
            lonVal = genericCoords[2];
          }
        }
      } else {
        // Not a URL, try generic regex for "lat, lon"
        const genericCoords = input.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
        if (genericCoords) {
          latVal = genericCoords[1];
          lonVal = genericCoords[2];
        }
      }

      if (
        latVal &&
        lonVal &&
        !isNaN(Number(latVal)) &&
        !isNaN(Number(lonVal))
      ) {
        onPaste(latVal, lonVal);
        onClose();
      } else {
        setError(
          "Could not find coordinates in that link. Make sure it contains a latitude and longitude.",
        );
      }
    } catch (e) {
      setError("Invalid link format.");
    }
  };

  return (
    <div class="qr-download-overlay" onClick={onClose}>
      <dialog
        class="geo-paste-modal"
        ref={modalEl}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="modal-header d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex align-items-center">
            <Icon name="location" className="me-2 text-primary" />
            <h2 class="h5 mb-0 fw-bold">Paste Map Link</h2>
          </div>
          <button type="button" class="btn-close" onClick={onClose}></button>
        </div>

        <div class="modal-body">
          <p class="small text-muted mb-4">
            Paste a link from Apple Maps, Google Maps, or a raw coordinate
            string to automatically extract the location.
          </p>

          <IconInput
            label="Link or Coordinates"
            icon="globe"
            placeholder="https://maps.apple.com/..."
            value={input}
            onInput={(val) => {
              setInput(val);
              setError("");
            }}
            type="textarea"
            rows={3}
          />

          {error && (
            <div class="alert alert-danger py-2 px-3 small mt-3 mb-0">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
        </div>

        <div class="modal-footer mt-4 border-0 p-0">
          <button
            type="button"
            class="btn btn-primary w-100 py-2 fw-bold"
            onClick={handleParse}
          >
            Extract Coordinates
          </button>
        </div>
      </dialog>
    </div>
  );
}
