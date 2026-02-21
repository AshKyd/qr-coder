import { useState, useEffect } from "preact/hooks";

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
          name="given-name"
          autocomplete="given-name"
          class="form-control"
          value={vcard.firstName}
          onInput={(e) =>
            setVcard({
              ...vcard,
              firstName: e.currentTarget.value,
            })
          }
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Last Name</label>
        <input
          type="text"
          name="family-name"
          autocomplete="family-name"
          class="form-control"
          value={vcard.lastName}
          onInput={(e) =>
            setVcard({
              ...vcard,
              lastName: e.currentTarget.value,
            })
          }
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Company</label>
        <input
          type="text"
          name="organization"
          autocomplete="organization"
          class="form-control"
          value={vcard.org}
          onInput={(e) => setVcard({ ...vcard, org: e.currentTarget.value })}
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Job Title</label>
        <input
          type="text"
          name="organization-title"
          autocomplete="organization-title"
          class="form-control"
          value={vcard.title}
          onInput={(e) => setVcard({ ...vcard, title: e.currentTarget.value })}
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Phone</label>
        <input
          type="tel"
          name="tel"
          autocomplete="tel"
          class="form-control"
          value={vcard.tel}
          onInput={(e) => setVcard({ ...vcard, tel: e.currentTarget.value })}
        />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-semibold">Email</label>
        <input
          type="email"
          name="email"
          autocomplete="email"
          class="form-control"
          value={vcard.email}
          onInput={(e) => setVcard({ ...vcard, email: e.currentTarget.value })}
        />
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Website</label>
        <input
          type="url"
          name="url"
          autocomplete="url"
          class="form-control"
          placeholder="https://example.com"
          value={vcard.url}
          onInput={(e) => setVcard({ ...vcard, url: e.currentTarget.value })}
        />
      </div>
      <div class="col-12">
        <label class="form-label fw-semibold">Address</label>
        <input
          type="text"
          name="street-address"
          autocomplete="street-address"
          class="form-control"
          placeholder="Street, City, Postcode, Country"
          value={vcard.address}
          onInput={(e) =>
            setVcard({ ...vcard, address: e.currentTarget.value })
          }
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
