"use client";

import React from "react";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button";

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  cancelClassName?: string;
  confirmClassName?: string;
  hideCancel?: boolean;
  onConfirm: () => void;
}

export default function ConfirmModal({
  show,
  onHide,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  onConfirm,
  confirmText = "Ya",
  cancelText = "Batal",
  cancelClassName = "btn btn-outline-light",
  confirmClassName = "btn btn-danger",
  hideCancel = false,
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered className="custom-dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {!hideCancel && (
          <Button className={cancelClassName} onClick={onHide}>
            {cancelText}
          </Button>
        )}
        <Button className={confirmClassName} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
