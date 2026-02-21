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
    <div class="sms-email-mode">
      <div class="btn-group w-100 mb-4 shadow-sm" role="group">
        <button
          type="button"
          class={`btn btn-outline-primary py-2 ${subMode === "email" ? "active" : ""}`}
          onClick={() => setSubMode("email")}
        >
          <Icon name="email" class="me-2" />
          Email
        </button>
        <button
          type="button"
          class={`btn btn-outline-primary py-2 ${subMode === "sms" ? "active" : ""}`}
          onClick={() => setSubMode("sms")}
        >
          <Icon name="sms" class="me-2" />
          SMS
        </button>
      </div>

      <div class="mb-3">
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
        <div class="mb-3">
          <IconInput
            label="Subject Line"
            icon="text"
            id="subjectInput"
            placeholder="Feedback for..."
            value={subject}
            onInput={setSubject}
          />
        </div>
      )}

      <div class="mb-3">
        <IconInput
          label="Message Body"
          icon="text"
          type="textarea"
          id="bodyInput"
          placeholder="Type your message here..."
          value={body}
          onInput={setBody}
          rows={3}
        />
      </div>

      <div className="form-text x-small mt-2">
        Scanning this code will open the device's default messaging or email
        app.
      </div>
    </div>
  );
}
