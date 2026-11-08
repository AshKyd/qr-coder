import { useEffect } from "preact/hooks";
import { applyRouteMeta } from "../../utils/applyRouteMeta.js";
import { faqItems } from "./faq.js";
import "./About.css";

export default function About(_props: { path?: string }) {
  useEffect(() => {
    applyRouteMeta("/about");
  }, []);

  return (
    <div class="container py-4">
      <div class="row justify-content-center">
        <article class="qr-about col-12 col-lg-8">
          <div class="card shadow-sm border-0 bg-card">
            <div class="card-body p-4">
              <h1 class="h3 fw-bold mb-3">
                Free QR codes that never expire
              </h1>
              <p class="lead">
                QR Coder makes free, permanent QR codes. There is no trial, no
                subscription and no account. A code you make today works for as
                long as the link inside it does.
              </p>
              <p>
                <a href="/" class="btn btn-primary">
                  Make a free QR code
                </a>
              </p>

              <h2 class="h5 fw-bold mt-4">What is a QR code?</h2>
              <p>
                A QR code is a square barcode that a phone camera can read. It
                holds a small amount of data, such as a web address, WiFi
                details, a phone number or plain text. Scanning it opens or
                uses that data.
              </p>

              <h2 class="h5 fw-bold mt-4">
                Why are these QR codes free forever?
              </h2>
              <ul>
                <li>
                  The code holds your link or text itself. Nothing is stored on
                  our server, so there is nothing to expire.
                </li>
                <li>
                  Scans do not pass through us, so there is no traffic to pay
                  for.
                </li>
                <li>
                  Codes are made in your browser. We do not see your data.
                </li>
                <li>
                  There is no account to lock, no trial to end and no tracking
                  to sell.
                </li>
                <li>
                  QR Coder is open source on{" "}
                  <a
                    href="https://github.com/AshKyd/qr-coder"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                  .
                </li>
              </ul>

              <h2 class="h5 fw-bold mt-4">
                Static and dynamic QR codes: why some sites charge
              </h2>
              <p>
                A <strong>static</strong> QR code contains your data directly.
                It cannot change and it cannot be switched off. All codes made
                here are static.
              </p>
              <p>
                A <strong>dynamic</strong> QR code contains a short link to the
                generator's own server, which then redirects to your page. That
                lets the site count scans and change the destination. It also
                means the site can stop the redirect. Many sites give you a
                free trial, then disable the code until you pay.
              </p>

              <h2 class="h5 fw-bold mt-4">
                Burnt by a QR code that stopped working?
              </h2>
              <p>
                If a code you printed now asks you to pay, it is almost
                certainly a dynamic code, and the original cannot be fixed.
                Make a new static code here that points to your real
                destination, then replace the printed one.
              </p>
              <p>
                Before you print a large run, print one copy at the final size
                and scan it with a couple of different phones. A code that
                works on screen can still fail on paper:
              </p>
              <ul>
                <li>
                  Small prints, or long links that make the code dense, can be
                  too fine for a phone camera to read.
                </li>
                <li>
                  Low-contrast colours, light-on-dark codes and busy
                  backgrounds can confuse some scanners.
                </li>
                <li>
                  Glossy paper, glare and curved surfaces can hide parts of the
                  code.
                </li>
                <li>
                  Older phones and different camera apps read codes with
                  different success, so one phone working is not proof.
                </li>
                <li>
                  Scan from the distance people will actually stand at. As a
                  rough guide, the code should be about one tenth as wide as
                  the scanning distance.
                </li>
              </ul>
              <p>
                A failed test costs one sheet. A failed print run costs the
                whole run.
              </p>

              <h2 class="h5 fw-bold mt-4">Frequently asked questions</h2>
              {faqItems.map(({ question, answer }) => (
                <section key={question} class="mb-3">
                  <h3 class="h6 fw-bold mb-1">{question}</h3>
                  <p class="mb-0">{answer}</p>
                </section>
              ))}

              <p class="mt-4 mb-0">
                <a href="/" class="btn btn-primary">
                  Make a free QR code
                </a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
