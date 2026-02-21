import { useState, useEffect } from "preact/hooks";
import Icon from "../../Icon/Icon";
import IconInput from "../IconInput";

interface SmsEmailModeProps {
  onChange: (value: string) => void;
}

export default function SmsEmailMode({ onChange }: SmsEmailModeProps) {
  const [subMode, setSubMode] = useState<"email" | "sms">("email");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!recipient.trim()) {
      onChange("");
      return;
    }

    if (subMode === "email") {
      const params = new URLSearchParams();
      if (subject.trim()) params.append("subject", subject.trim());
      if (body.trim()) params.append("body", body.trim());
      const queryString = params.toString();
      onChange(
        `mailto:${recipient.trim()}${queryString ? `?${queryString}` : ""}`,
      );
    } else {
      onChange(
        `sms:${recipient.trim()}${body.trim() ? `?body=${encodeURIComponent(body.trim())}` : ""}`,
      );
    }
  }, [subMode, recipient, subject, body, onChange]);

  return (
    <div className="sms-email-mode">
      <div className="btn-group w-100 mb-4 shadow-sm" role="group">
        <button
          type="button"
          className={`btn btn-outline-primary py-2 ${subMode === "email" ? "active" : ""}`}
          onClick={() => setSubMode("email")}
        >
          <Icon name="email" className="me-2" />
          Email
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary py-2 ${subMode === "sms" ? "active" : ""}`}
          onClick={() => setSubMode("sms")}
        >
          <Icon name="sms" className="me-2" />
          SMS
        </button>
      </div>

      <div className="mb-3">
        {subMode === "email" ? (
          <IconInput
            label="Email Address"
            icon="email"
            type="email"
            id="recipientInput"
            placeholder="hello@example.com"
            value={recipient}
            onInput={setRecipient}
          />
        ) : (
          <IconInput
            label="Phone Number"
            icon="phone"
            type="tel"
            id="recipientInput"
            placeholder="+1 234 567 890"
            value={recipient}
            onInput={setRecipient}
          />
        )}
      </div>

      {subMode === "email" && (
        <div className="mb-3">
          <label htmlFor="subjectInput" className="form-label small fw-bold">
            Subject Line
          </label>
          <input
            type="text"
            id="subjectInput"
            className="form-control"
            placeholder="Feedback for..."
            value={subject}
            onInput={(e) => setSubject((e.target as HTMLInputElement).value)}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="bodyInput" className="form-label small fw-bold">
          Message Body
        </label>
        <textarea
          id="bodyInput"
          className="form-control"
          rows={3}
          placeholder="Type your message here..."
          value={body}
          onInput={(e) => setBody((e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </div>

      <div className="form-text x-small mt-2">
        Scanning this code will open the device's default messaging or email
        app.
      </div>
    </div>
  );
}
