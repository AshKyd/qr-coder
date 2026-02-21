import globeIcon from "bootstrap-icons/icons/globe.svg?raw";
import textIcon from "bootstrap-icons/icons/file-earmark-text.svg?raw";
import wifiIcon from "bootstrap-icons/icons/wifi.svg?raw";
import contactIcon from "bootstrap-icons/icons/person-badge.svg?raw";
import saveIcon from "bootstrap-icons/icons/save.svg?raw";
import gearIcon from "bootstrap-icons/icons/gear.svg?raw";
import calendarIcon from "bootstrap-icons/icons/calendar-event.svg?raw";
import geoIcon from "bootstrap-icons/icons/geo-alt.svg?raw";
import emailIcon from "bootstrap-icons/icons/envelope.svg?raw";
import smsIcon from "bootstrap-icons/icons/chat-dots.svg?raw";
import phoneIcon from "bootstrap-icons/icons/telephone.svg?raw";
import buildingIcon from "bootstrap-icons/icons/building.svg?raw";
import briefcaseIcon from "bootstrap-icons/icons/briefcase.svg?raw";
import personIcon from "bootstrap-icons/icons/person.svg?raw";
import mapIcon from "bootstrap-icons/icons/map.svg?raw";
import caretDownFillIcon from "bootstrap-icons/icons/caret-down-fill.svg?raw";

const ICON_REGISTRY = {
  globe: globeIcon,
  text: textIcon,
  wifi: wifiIcon,
  contact: contactIcon,
  save: saveIcon,
  settings: gearIcon,
  calendar: calendarIcon,
  location: geoIcon,
  email: emailIcon,
  sms: smsIcon,
  phone: phoneIcon,
  building: buildingIcon,
  briefcase: briefcaseIcon,
  person: personIcon,
  address: mapIcon,
  "chevron-down": caretDownFillIcon,
};

export default function Icon({ name, className = "", style = {}, ...props }) {
  const src = ICON_REGISTRY[name] || "";

  return (
    <span
      class={`bi-icon ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: src }}
      {...props}
    />
  );
}
