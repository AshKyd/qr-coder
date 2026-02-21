import "./Footer.css";
import Interstitial from "../Interstitial/Interstitial";

export default function Footer({ onShowHelp, showHelp, onHideHelp }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="qr-footer mt-auto py-5 uppercase-headings">
      <div class="container text-center text-muted x-small">
        <div class="mb-3 mx-auto" style="max-width: 600px;">
          <span class="branding">QR Coder</span> makes QR codes for URLs with
          UTMs, WiFi credentials, and vCard contact info. Secure, fast, and
          private.
        </div>
        <div class="d-flex justify-content-center flex-wrap gap-2">
          <span>&copy; {currentYear}</span>
          <a
            href="https://ashk.au"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            Ash Kyd
          </a>
          <span class="text-muted mx-1">&bull;</span>
          <a
            href="https://github.com/soldair/node-qrcode"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            node-qrcode
          </a>
          <span class="text-muted mx-1">&bull;</span>
          <a
            href="https://github.com/AshKyd/qr-coder"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            GitHub
          </a>
          <span class="text-muted mx-1">&bull;</span>
          <button
            type="button"
            class="btn btn-link p-0 x-small text-muted hover-link text-decoration-none"
            onClick={onShowHelp}
          >
            Help
          </button>
        </div>
        <div class="mt-2">
          QR codes are generated in-browser. No data is collected or stored.
        </div>
      </div>
      <Interstitial isOpen={showHelp} onClose={onHideHelp} />
    </footer>
  );
}
