import { useState, useEffect } from "preact/hooks";

interface TextModeProps {
  onChange: (qrString: string) => void;
}

export default function TextMode({ onChange }: TextModeProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <>
      <label for="qr-text" class="form-label fw-semibold">
        Content
      </label>
      <textarea
        id="qr-text"
        class="form-control form-control-lg"
        placeholder="Type or paste something to encode..."
        rows={4}
        value={text}
        onClick={(e) => e.currentTarget.select()}
        onInput={(e) => setText(e.currentTarget.value)}
      ></textarea>
    </>
  );
}
