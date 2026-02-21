import { useEffect, useRef } from "preact/hooks";
import "./Interstitial.css";

export default function Interstitial({ onClose }) {
  const modalEl = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalEl.current) return;

    // showModal() is necessary for the native <dialog> backdrop and top-layer behavior
    if (!modalEl.current.open) {
      modalEl.current.showModal();
    }

    // Handle the browser's native 'cancel' (Escape key)
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const dialog = modalEl.current;
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  return (
    <div
      class="qr-interstitial"
      onClick={onClose} // Clicking the blurred overlay
    >
      <dialog
        class="qr-interstitial__modal"
        ref={modalEl}
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing
      >
        <div class="qr-interstitial__top">
          <h1>
            <span class="qr-toolbar__title-a">qr</span>{" "}
            <span class="qr-toolbar__title-b">coder</span>
          </h1>
          <p class="qr-interstitial__sub">A simple QR code generator</p>
        </div>
        <div class="qr-interstitial__content">
          <div class="qr-interstitial__container">
            <p>
              The app is built in <a href="https://preactjs.com/">Preact</a> and{" "}
              <a href="https://github.com/soldair/node-qrcode">node-qrcode</a>.
              <a href="https://github.com/AshKyd/qr-coder">Source code</a> is on
              Github.
            </p>
            <p>Please feel free to browse around and enjoy.</p>
          </div>
        </div>
        <div class="qr-interstitial__bar">
          <div class="qr-interstitial__container">
            <button onClick={onClose}>Ok</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
