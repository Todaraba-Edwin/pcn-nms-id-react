import styled from 'styled-components';

export const Fieldset = styled.fieldset`
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldsetLabel = styled.label`
  font-size: 18px;
  font-weight: 400;
  color: #404e6d;
`;

export const FieldsetInput = styled.input`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 8px;
  border: solid 1px #cacce7;
  background-color: #fff;
  padding: 0 15px;
  font-size: 16px;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    height: 50px;
    border: 1px solid #878ab6 !important;
    outline: none;
  }
`;

