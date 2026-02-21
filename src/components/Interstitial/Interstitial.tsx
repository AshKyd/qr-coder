import Modal from "../Common/Modal/Modal";

export default function Interstitial({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About QR Coder"
      subtitle="Privacy-first QR code generator"
      size="md"
    >
      <div class="qr-interstitial__container">
        <section class="mb-4">
          <p class="small text-muted">
            <span class="branding">QR Coder</span> generates QR codes locally in
            your browser. Sensitive data—like WiFi passwords and contact
            details—stays on your device.
          </p>
        </section>

        <section class="mb-4">
          <h2 class="h6 fw-bold text-uppercase mb-2">Privacy</h2>
          <p class="small text-muted mb-0">
            Processing happens locally. It's a private way to generate codes
            without sending your data to a server.
          </p>
        </section>

        <section>
          <h2 class="h6 fw-bold text-uppercase mb-2">Open Source</h2>
          <p class="small text-muted mb-0">
            Built with{" "}
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
            . View the source or contribute on{" "}
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
      </div>
    </Modal>
  );
}
