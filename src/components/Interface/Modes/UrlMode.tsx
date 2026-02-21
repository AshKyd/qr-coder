import { useState, useEffect } from "preact/hooks";
import IconInput from "../IconInput";

interface UrlModeProps {
  onChange: (qrString: string) => void;
}

export default function UrlMode({ onChange }: UrlModeProps) {
  const [urlData, setUrlData] = useState({
    base: "https://ashk.au",
    source: "offline",
    medium: "qr",
    campaign: "",
  });
  const [useUtm, setUseUtm] = useState(false);

  useEffect(() => {
    if (!urlData.base) {
      onChange("");
      return;
    }

    try {
      const url = new URL(
        urlData.base.startsWith("http")
          ? urlData.base
          : `https://${urlData.base}`,
      );
      if (useUtm) {
        if (urlData.source) url.searchParams.set("utm_source", urlData.source);
        if (urlData.medium) url.searchParams.set("utm_medium", urlData.medium);
        if (urlData.campaign)
          url.searchParams.set("utm_campaign", urlData.campaign);
      }
      onChange(url.toString());
    } catch (e) {
      onChange(urlData.base);
    }
  }, [urlData, useUtm, onChange]);

  return (
    <div class="row g-3">
      <div class="col-12">
        <IconInput
          label="Website URL"
          type="url"
          inputClass="form-control-lg"
          placeholder="https://example.com"
          value={urlData.base}
          icon="globe"
          onClick={(e) => e.currentTarget.select()}
          onInput={(val) =>
            setUrlData({
              ...urlData,
              base: val,
            })
          }
        />
      </div>
      <div class="col-12 mt-3">
        <div class="form-check form-switch mt-2">
          <input
            class="form-check-input cursor-pointer"
            type="checkbox"
            id="use-utm"
            checked={useUtm}
            onChange={(e) => setUseUtm(e.currentTarget.checked)}
          />
          <label
            class="form-check-label fw-semibold text-muted cursor-pointer"
            for="use-utm"
          >
            Add tracking (UTM) parameters
          </label>
        </div>

        {useUtm && (
          <div class="row g-3 utm-well p-3 mt-2 rounded">
            <div class="col-md-6">
              <label class="form-label small fw-bold">UTM Source</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. flyer"
                value={urlData.source}
                onClick={(e) => e.currentTarget.select()}
                onInput={(e) =>
                  setUrlData({
                    ...urlData,
                    source: e.currentTarget.value,
                  })
                }
              />
              <div class="form-text x-small mt-1">
                The specific origin (e.g., flyer).
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold">UTM Medium</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. qr"
                value={urlData.medium}
                onClick={(e) => e.currentTarget.select()}
                onInput={(e) =>
                  setUrlData({
                    ...urlData,
                    medium: e.currentTarget.value,
                  })
                }
              />
              <div class="form-text x-small mt-1">
                The marketing channel (e.g., qr).
              </div>
            </div>
            <div class="col-12">
              <label class="form-label small fw-bold">UTM Campaign</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. launch-event"
                value={urlData.campaign}
                onClick={(e) => e.currentTarget.select()}
                onInput={(e) =>
                  setUrlData({
                    ...urlData,
                    campaign: e.currentTarget.value,
                  })
                }
              />
              <div class="form-text x-small mt-1">
                The specific promotion or event (e.g., summer-sale).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
