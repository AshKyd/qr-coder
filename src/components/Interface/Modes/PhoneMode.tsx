import { useState, useEffect } from "preact/hooks";
import IconInput from "../IconInput";

interface PhoneModeProps {
  onChange: (value: string) => void;
}

export default function PhoneMode({ onChange }: PhoneModeProps) {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!phone.trim()) {
      onChange("");
      return;
    }
    // Clean phone number: keep only +, and digits
    const cleaned = phone.replace(/[^\d+]/g, "");
    onChange(`tel:${cleaned}`);
  }, [phone, onChange]);

  return (
    <div className="phone-mode">
      <IconInput
        label="Phone Number"
        icon="phone"
        value={phone}
        onInput={setPhone}
        helpText="Enter a phone number with country code for best compatibility."
      />
    </div>
  );
}
