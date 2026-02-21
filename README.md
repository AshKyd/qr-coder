# QR Coder

A QR code generator built with Preact and Vite.

## Features

- **Privacy**: QR codes are generated locally in your browser. Sensitive data remains on your device.
- **Multiple Formats**: Support for URLs, WiFi credentials, vCards, Calendar events, Locations, Messaging shortcuts, and plain text.
- **Customizable**: Adjust error correction levels, margins, and colors.
- **Export**: Save as PNG or SVG in various sizes.
- **Offline Support**: PWA support for offline use.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AshKyd/qr-coder.git
   cd qr-coder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

Production output is in the `dist/` directory.

## Technology Stack

- [Preact](https://preactjs.com/)
- [Vite](https://vitejs.dev/)
- [node-qrcode](https://github.com/soldair/node-qrcode)
- [Bootstrap 5](https://getbootstrap.com/)

## License

MIT License. Doto font is SIL Open Font License.
