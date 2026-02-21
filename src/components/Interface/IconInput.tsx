import Icon from "../Icon/Icon";

interface IconInputProps {
  label?: string;
  value: string;
  onInput: (value: string) => void;
  icon: string;
  id?: string;
  type?: string;
  placeholder?: string;
  helpText?: string;
  className?: string;
  autocomplete?: string;
  rows?: number;
}

export default function IconInput({
  label,
  value,
  onInput,
  icon,
  id,
  type = "text",
  placeholder,
  helpText,
  className = "",
  autocomplete,
  rows,
}: IconInputProps) {
  const isTextArea = type === "textarea";

  return (
    <div className={`icon-input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label small fw-bold">
          {label}
        </label>
      )}
      <div className="input-group">
        <span className="input-group-text border-end-0">
          <Icon name={icon} className="text-muted" />
        </span>
        {isTextArea ? (
          <textarea
            id={id}
            className="form-control ps-2"
            placeholder={placeholder}
            value={value}
            onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
            rows={rows || 3}
          />
        ) : (
          <input
            type={type}
            id={id}
            className="form-control ps-2"
            placeholder={placeholder}
            value={value}
            onInput={(e) => onInput((e.target as HTMLInputElement).value)}
            autoComplete={autocomplete}
          />
        )}
      </div>
      {helpText && <div className="form-text x-small mt-2">{helpText}</div>}
    </div>
  );
}
