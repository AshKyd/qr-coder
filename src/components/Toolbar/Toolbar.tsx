import { useEffect, useState } from "preact/hooks";
import "./Toolbar.css";
import Interstitial from "../Interstitial/Interstitial";
export default function Toolbar({}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <header className="qr-toolbar">
      <h1 className="qr-toolbar__title">
        <span class="qr-toolbar__title-a">qr</span>{" "}
        <span class="qr-toolbar__title-b">coder</span>
      </h1>
      {/* <div className="qr-toolbar__item"></div> */}
      <div class="qr-toolbar__flex"></div>
      <button
        className="qr-toolbar__button"
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
      >
        ⓘ
      </button>
      <Interstitial isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
