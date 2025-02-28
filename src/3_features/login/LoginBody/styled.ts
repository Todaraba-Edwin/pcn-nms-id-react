import styled from 'styled-components';

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: ${({ theme }) => theme.imageUrls.login.bg};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WelcomeImg = styled.img`
  width: 100%;
`;

export const Form = styled.form`
  width: 460px;
  max-width: 80vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const FormTitle = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const FormDesc = styled.p`
  font-size: 18px;
  color: #6b7488;
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: #6b7488;
`;

export const FormSubmit = styled.input.attrs({
  type: 'submit',
  value: '로그인',
})`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(144, 126, 196, 1) 0%,
    rgba(54, 77, 216, 1) 100%
  );
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const FieldsetErrorMessage = styled.p`
  margin-top: -3px;
  color: red;
`;

export const FormFooter = styled.footer`
  color: #3e49a0;
`;
