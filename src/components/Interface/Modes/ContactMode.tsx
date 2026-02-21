import { useState, useEffect } from "preact/hooks";
import IconInput from "../IconInput";

interface ContactModeProps {
  onChange: (qrString: string) => void;
}

export default function ContactMode({ onChange }: ContactModeProps) {
  const [vcard, setVcard] = useState({
    firstName: "",
    lastName: "",
    org: "",
    title: "",
    tel: "",
    email: "",
    url: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (!vcard.firstName && !vcard.lastName) {
      onChange("");
      return;
    }

    const vcardString = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${vcard.lastName};${vcard.firstName};;;`,
      `FN:${vcard.firstName} ${vcard.lastName}`,
      vcard.org ? `ORG:${vcard.org}` : "",
      vcard.title ? `TITLE:${vcard.title}` : "",
      vcard.tel ? `TEL;TYPE=CELL:${vcard.tel}` : "",
      vcard.email ? `EMAIL:${vcard.email}` : "",
      vcard.url ? `URL:${vcard.url}` : "",
      vcard.address ? `ADR:;;${vcard.address};;;;` : "",
      vcard.note ? `NOTE:${vcard.note}` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");

    onChange(vcardString);
  }, [vcard, onChange]);

  return (
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label fw-semibold">First Name</label>
        <input
          type="text"
          class="form-control"
          value={vcard.firstName}
          onInput={(e) =>
            setVcard({ ...vcard, firstName: e.currentTarget.value })
          }
          autocomplete="given-name"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Last Name</label>
        <input
          type="text"
          class="form-control"
          value={vcard.lastName}
          onInput={(e) =>
            setVcard({ ...vcard, lastName: e.currentTarget.value })
          }
          autocomplete="family-name"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Company</label>
        <input
          type="text"
          class="form-control"
          value={vcard.org}
          onInput={(e) => setVcard({ ...vcard, org: e.currentTarget.value })}
          autocomplete="organization"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Job Title</label>
        <input
          type="text"
          class="form-control"
          value={vcard.title}
          onInput={(e) => setVcard({ ...vcard, title: e.currentTarget.value })}
          autocomplete="organization-title"
        />
      </div>
      <div class="col-md-6">
        <IconInput
          label="Phone"
          icon="phone"
          type="tel"
          value={vcard.tel}
          onInput={(val) => setVcard({ ...vcard, tel: val })}
          autocomplete="tel"
        />
      </div>
      <div class="col-md-6">
        <IconInput
          label="Email"
          icon="email"
          type="email"
          value={vcard.email}
          onInput={(val) => setVcard({ ...vcard, email: val })}
          autocomplete="email"
        />
      </div>
      <div class="col-12">
        <IconInput
          label="Website"
          icon="globe"
          type="url"
          placeholder="https://example.com"
          value={vcard.url}
          onInput={(val) => setVcard({ ...vcard, url: val })}
          autocomplete="url"
        />
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Address</label>
        <input
          type="text"
          class="form-control"
          placeholder="Street, City, Postcode, Country"
          value={vcard.address}
          onInput={(e) =>
            setVcard({ ...vcard, address: e.currentTarget.value })
          }
          autocomplete="street-address"
        />
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Note</label>
        <textarea
          class="form-control"
          rows={2}
          value={vcard.note}
          onInput={(e) => setVcard({ ...vcard, note: e.currentTarget.value })}
        ></textarea>
      </div>
    </div>
  );
}
