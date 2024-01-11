import React from 'react';
import { Button, Text, Modal, ActionIcon } from '@mantine/core';

interface ModalConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

export function ModalConfirm({ isOpen, onConfirm, onCancel, text }: ModalConfirmProps) {
  return (
    <Modal
      title="Confirme"
      opened={isOpen}
      onClose={onCancel}
    >
      <Text size="sm">{text}</Text>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Button
          style={{ marginRight: '10px' }}
          color="gray"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button color="red" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
