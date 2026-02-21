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
  onClick?: (e: any) => void;
  inputClass?: string;
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
  onClick,
  inputClass = "",
}: IconInputProps) {
  const isTextArea = type === "textarea";

  return (
    <div class={`icon-input-group ${className}`}>
      {label && (
        <label htmlFor={id} class="form-label small fw-bold">
          {label}
        </label>
      )}
      <div class="input-group">
        <span class="input-group-text border-end-0">
          <Icon name={icon} class="text-muted" />
        </span>
        {isTextArea ? (
          <textarea
            id={id}
            class={`form-control ps-2 ${inputClass}`}
            placeholder={placeholder}
            value={value}
            onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
            onClick={onClick}
            rows={rows || 3}
          />
        ) : (
          <input
            type={type}
            id={id}
            class={`form-control ps-2 ${inputClass}`}
            placeholder={placeholder}
            value={value}
            onInput={(e) => onInput((e.target as HTMLInputElement).value)}
            onClick={onClick}
            autoComplete={autocomplete}
          />
        )}
      </div>
      {helpText && <div class="form-text x-small mt-2">{helpText}</div>}
    </div>
  );
}
