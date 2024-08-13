import { Checkbox } from '@mui/material';
import React from 'react';
import {
  PopupOverlay,
  PopupContainer,
  PopupHeader,
  ChecklistContainer,
  ChecklistItem,
  EmptyMessage,
  CloseButton,
  PopupButtonWrapper,
} from '../styles/components/PopupStyle';

interface PopupProps {
  title: string;
  onClose: () => void;
  checklistItems?: { id: string, label: string }[];
  selectedItems?: string[];
  onChecklistChange?: (id: string) => void;
}

const Popup: React.FC<PopupProps> = ({
  title,
  onClose,
  checklistItems,
  selectedItems,
  onChecklistChange,
}) => (
  <>
    <PopupOverlay onClick={onClose} />
    <PopupContainer>
      <PopupHeader>{title}</PopupHeader>
      {checklistItems && checklistItems.length > 0 ? (
        <ChecklistContainer>
          {checklistItems.map((item) => (
            <ChecklistItem key={item.id}>
              <Checkbox
                checked={selectedItems?.includes(item.id) || false}
                onChange={() => onChecklistChange?.(item.id)}
              />
              {item.label}
            </ChecklistItem>
          ))}
        </ChecklistContainer>
      ) : (
        <EmptyMessage>No hay archivos cargados.</EmptyMessage>
      )}
      <PopupButtonWrapper>
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </PopupButtonWrapper>
    </PopupContainer>
  </>
);

export default Popup;
