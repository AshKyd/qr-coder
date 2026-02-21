import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="qr-footer mt-auto py-5 uppercase-headings">
      <div class="container text-center text-muted x-small">
        <div class="mb-3 mx-auto" style="max-width: 600px;">
          QR Coder makes QR codes for URLs with UTMs, WiFi credentials, and
          vCard contact info. Secure, fast, and private.
        </div>
        <div>
          &copy; {currentYear}{" "}
          <a
            href="https://ashk.au"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            Ash Kyd
          </a>
          . Uses{" "}
          <a
            href="https://github.com/soldair/node-qrcode"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            node-qrcode
          </a>
          .
          <a
            href="https://github.com/AshKyd/qr-coder"
            target="_blank"
            rel="noopener noreferrer"
            class="hover-link"
          >
            Edit on GitHub
          </a>
          . QR codes are generated in-browser. No data is collected or stored.
        </div>
      </div>
    </footer>
  );
}
