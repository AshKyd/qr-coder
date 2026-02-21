import { useEffect, useRef } from "preact/hooks";
import "./Interstitial.css";

export default function Interstitial({ isOpen, onClose }) {
  const modalEl = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalEl.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [isOpen, onClose]);

  return (
    <div
      class={`qr-interstitial ${isOpen ? "is-open" : "is-closed"}`}
      onClick={onClose}
    >
      <dialog
        class="qr-interstitial__modal"
        ref={modalEl}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="qr-interstitial__top">
          <h1>
            <span class="qr-toolbar__title-a">qr</span>{" "}
            <span class="qr-toolbar__title-b">coder</span>
          </h1>
          <p class="qr-interstitial__sub">Professional QR Code Generator</p>
        </div>
        <div class="qr-interstitial__content">
          <div class="qr-interstitial__container">
            <section class="mb-4">
              <p class="small text-muted">
                This app is built with{" "}
                <a href="https://preactjs.com/">Preact</a> and{" "}
                <a href="https://github.com/soldair/node-qrcode">node-qrcode</a>
                . The source code is on{" "}
                <a href="https://github.com/AshKyd/qr-coder">GitHub</a>.
              </p>
            </section>

            <section class="mb-4">
              <h2 class="h6 fw-bold text-uppercase mb-2">Privacy & Data</h2>
              <p class="small text-muted mb-0">
                Data is never sent to a server. All QR codes are generated
                locally in your browser. Your URLs, WiFi passwords, and contact
                info stay on your device.
              </p>
            </section>

            <section>
              <h2 class="h6 fw-bold text-uppercase mb-2">About the codes</h2>
              <p class="small text-muted mb-0">
                You can generate as many QR codes as you like. They are
                permanent and will work forever.
              </p>
            </section>
          </div>
        </div>
        <div class="qr-interstitial__bar border-top pt-3 mt-4">
          <div class="qr-interstitial__container d-flex justify-content-end">
            <button class="btn btn-primary px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
