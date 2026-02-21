import Icon from "../Icon/Icon";
import "./Toolbar.css";

export default function Toolbar({ onOpenMenu }) {
  return (
    <header class="qr-toolbar">
      <h1 class="qr-toolbar__title branding">
        <span class="qr-toolbar__title-a">qr</span>{" "}
        <span class="qr-toolbar__title-b">coder</span>
      </h1>
      <div class="qr-toolbar__flex"></div>
      <button
        type="button"
        class="qr-toolbar__button btn btn-sm btn-outline-secondary btn-square d-flex align-items-center justify-content-center transition-all"
        onClick={(e) => {
          e.preventDefault();
          onOpenMenu();
        }}
        aria-label="Menu"
      >
        <Icon name="menu" />
      </button>
    </header>
  );
}
