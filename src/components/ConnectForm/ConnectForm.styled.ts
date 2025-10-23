import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DigitInput = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: var(--red);
  }
`;

export const ErrorText = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
`;

export const VerifyButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  background: var(--red);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
`;
