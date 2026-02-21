import globeIcon from "bootstrap-icons/icons/globe.svg?raw";
import textIcon from "bootstrap-icons/icons/file-earmark-text.svg?raw";
import wifiIcon from "bootstrap-icons/icons/wifi.svg?raw";
import contactIcon from "bootstrap-icons/icons/person-badge.svg?raw";
import saveIcon from "bootstrap-icons/icons/save.svg?raw";

const ICON_REGISTRY = {
  globe: globeIcon,
  text: textIcon,
  wifi: wifiIcon,
  contact: contactIcon,
  save: saveIcon,
};

export default function Icon({ name, className = "" }) {
  const src = ICON_REGISTRY[name] || "";

  return (
    <span
      class={`bi-icon ${className}`}
      dangerouslySetInnerHTML={{ __html: src }}
    />
  );
}
