import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger" | "success";
};

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
}: ModalProps) {
  if (!isOpen) return null;

  const confirmColor =
    type === "danger"
      ? "bg-red-500 hover:bg-red-600"
      : type === "success"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-blue-500 hover:bg-blue-600";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} 
      >
        {title && (
          <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
        )}

        <div className="text-gray-700 mb-6">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg text-white transition ${confirmColor}`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
