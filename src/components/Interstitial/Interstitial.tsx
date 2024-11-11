import { useEffect, useRef } from "preact/hooks";
import "./Interstitial.css";

export default function Interstitial({ onClose }) {
  const modalEl = useRef();
  useEffect(() => {
    if (!modalEl.current) return;
    modalEl.current.showModal();
  }, [modalEl]);

  return (
    <div class="qr-interstitial">
      <dialog
        class="qr-interstitial__modal"
        ref={modalEl}
        onClick={(e) => {
          if (e.target === modalEl.current) {
            onClose();
          }
        }}
      >
        <div class="qr-interstitial__top">
          <h1>qr</h1>
          <p class="qr-interstitial__sub">A sprite recolouriser</p>
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
