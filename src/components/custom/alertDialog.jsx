import { useEffect, useRef } from "react";

export default function DeleteAlertDialog({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
}) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  // Trap focus inside dialog when open
  useEffect(() => {
    if (!isOpen) return;
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === "Escape") onCancel();
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    firstEl?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div
        ref={dialogRef}
        className="bg-white mx-4 rounded-lg max-w-sm w-full shadow-xl p-6"
      >
        <h2
          id="delete-dialog-title"
          className="text-xl font-bold text-gray-800 mb-2"
        >
          {title}
        </h2>
        <p id="delete-dialog-desc" className="text-gray-600 mb-4">
          {message}
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
