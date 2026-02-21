import { useEffect, useRef } from "preact/hooks";
import { ComponentChildren } from "preact";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ComponentChildren;
  footer?: ComponentChildren;
  size?: "sm" | "md" | "lg" | "fullscreen";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const modalEl = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalEl.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "auto";
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <div
      class={`qr-modal-backdrop ${isOpen ? "is-open" : "is-closed"}`}
      onClick={onClose}
    >
      <dialog
        class={`qr-modal qr-modal--${size}`}
        ref={modalEl}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby={title ? "modalTitle" : undefined}
      >
        {(title || subtitle) && (
          <div class="qr-modal__header">
            <div class="qr-modal__header-content">
              {title && (
                <h2 id="modalTitle" class="h4 mb-0 fw-bold">
                  {title}
                </h2>
              )}
              {subtitle && <p class="qr-modal__subtitle mb-0">{subtitle}</p>}
            </div>
            <button
              type="button"
              class="btn-close"
              onClick={onClose}
              aria-label="Close modal"
            ></button>
          </div>
        )}

        <div class="qr-modal__content">{children}</div>

        {footer && <div class="qr-modal__footer">{footer}</div>}
      </dialog>
    </div>
  );
}
