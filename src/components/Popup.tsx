import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

interface PopupProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

const Popup: React.FC<PopupProps> = ({
  title,
  onClose,
  onSave,
  inputValue = '',
  onInputChange,
}) => {
  const [text, setText] = useState(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onInputChange?.(newValue);
  };

  const handleSave = () => {
    onSave(text);
  };

  return (
    <>
      <PopupOverlay onClick={onClose} />
      <PopupContainer>
        <PopupHeader>{title}</PopupHeader>
        <StyledTextField 
          label="Ingresa un valor..."
          variant="outlined"
          value={text}
          onChange={handleInputChange}
        />
        <PopupButtonWrapper>
          <CloseButton onClick={onClose}>Cerrar</CloseButton>
          <SaveButton onClick={handleSave}>Guardar</SaveButton>
        </PopupButtonWrapper>
      </PopupContainer>
    </>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 400px;
  max-width: 90%;
  z-index: 1001;
`;

const PopupHeader = styled.h2`
  color: #24313D;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.p`
  color: #24313D;
  font-size: 14px;
  margin-top: 16px;
`;

const PopupButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const CloseButton = styled(Button)`
  color: #24313D;
  margin-right: 8px;
`;

const SaveButton = styled(Button)`
  color: #24313D;
  background: #e0e0e0;
  &:hover {
    background: #d0d0d0;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
  
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #24313D;
    }
  }

  .MuiFormLabel-root {
    color: #24313D;
  }

  .MuiInputBase-input {
    color: #24313D;
  }
`;

export default Popup;
