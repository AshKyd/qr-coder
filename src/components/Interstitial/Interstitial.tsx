import Modal from "../Common/Modal/Modal";

export default function Interstitial({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Coder"
      subtitle="Professional QR Code Generator"
      size="md"
    >
      <div class="qr-interstitial__container">
        <section class="mb-4">
          <p class="small text-muted">
            This app is built with{" "}
            <a href="https://preactjs.com/" target="_blank" rel="noopener">
              Preact
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/soldair/node-qrcode"
              target="_blank"
              rel="noopener"
            >
              node-qrcode
            </a>
            . The source code is on{" "}
            <a
              href="https://github.com/AshKyd/qr-coder"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <section class="mb-4">
          <h2 class="h6 fw-bold text-uppercase mb-2">Privacy & Data</h2>
          <p class="small text-muted mb-0">
            Data is never sent to a server. All QR codes are generated locally
            in your browser. Your URLs, WiFi passwords, and contact info stay on
            your device.
          </p>
        </section>

        <section>
          <h2 class="h6 fw-bold text-uppercase mb-2">About the codes</h2>
          <p class="small text-muted mb-0">
            You can generate as many QR codes as you like. They are permanent
            and will work forever.
          </p>
        </section>
      </div>
    </Modal>
  );
}
