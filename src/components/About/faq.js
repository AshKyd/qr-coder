/**
 * FAQ shown on the About page. Also imported by vite.config.js to build the
 * FAQPage JSON-LD, so answers stay plain text (no markup) and must match the
 * visible copy.
 */
export const faqItems = [
  {
    question: "Do these QR codes expire?",
    answer:
      "No. The QR code contains your link or text itself, so there is nothing to switch off. It works for as long as your link works.",
  },
  {
    question: "Is there a subscription or trial?",
    answer:
      "No. There is no account, no trial and no fee, now or later. QR Coder is free and open source.",
  },
  {
    question: "Can I print these QR codes on posters and signs?",
    answer:
      "Yes. Download the code as an image or SVG and print it at any size. Print one copy at the final size and scan it with a couple of different phones before you print a large run, because small sizes, low contrast and glare can stop a code from scanning.",
  },
  {
    question: "Do you track scans?",
    answer:
      "No. Scans go straight to your destination and never pass through our server, so we cannot count or see them.",
  },
  {
    question: "My old QR code stopped working. Can I fix it?",
    answer:
      "Usually not, because the code points at the generator's server. Make a new code here that points at your real destination and replace the old one.",
  },
];
