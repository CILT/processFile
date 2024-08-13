import React from 'react';
import styled from 'styled-components';
import ReplayIcon from '@mui/icons-material/Replay';

const ResetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.7vh 2vw;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ResetButton: React.FC = () => (
  <ResetWrapper onClick={() => alert('Reset clicked')}>
    <ReplayIcon style={{ color: '#333' }} /> 
    <span style={{ marginLeft: '8px', color: '#333' }}>Reset</span>
  </ResetWrapper>
);

export default ResetButton;
