"use client";
import React from "react";
import Alert from "react-bootstrap/Alert";

type Props = {
  message?: string;
  variant?: "success" | "danger" | "warning" | "info";
  onClose?: () => void;
};

export default function SuccessAlert({
  message,
  variant = "success",
  onClose,
}: Props) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1060,
        minWidth: "320px",
        maxWidth: "90%",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <Alert
        variant={variant}
        dismissible={!!onClose}
        onClose={onClose}
        className="text-center mb-0 fw-semibold py-3 border-0 rounded-4"
      >
        <i
          className={`fa-solid ${
            variant === "success"
              ? "fa-circle-check"
              : variant === "danger"
                ? "fa-triangle-exclamation"
                : "fa-circle-info"
          } me-2`}
        ></i>
        {message}
      </Alert>
    </div>
  );
}
