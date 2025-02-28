import * as RH from 'react-hook-form';
import styled from 'styled-components';
import * as FC from '@/3_features/common';
import * as EA from '@/4_entities/apis';
import * as SC from '@/5_shared/constants';

type FormValues = {
  userId: string;
  userPwd: string;
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = RH.useForm<FormValues>({
    defaultValues: {
      userId: '',
      userPwd: '',
    },
  });

  const onPost = async ({ payload }: { payload: FormValues }) => {
    const res = await EA.serverApi.post('/login', payload);

    return { res };
  };

  const onSubmit = handleSubmit((values: FormValues) => {
    console.log('values', values);
    onPost({ payload: values });
  });
  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <FormTitle>
          <WelcomeImg src={`${SC.imagePath.login.welcome}`} />
          <FormDesc children="아래의 빈칸에 계정을 입력하세요" />
        </FormTitle>
        <FC.LoginInput<FormValues>
          label="아이디"
          name={'userId'}
          placeholder="ID"
          register={register}
          options={{
            required: '아이디를 입력해 주세요.',
          }}
          {...(errors.userId && {
            errorMessage: (
              <FieldsetErrorMessage children={errors.userId.message} />
            ),
          })}
        />
        <FC.LoginInput<FormValues>
          label="비밀번호"
          name={'userPwd'}
          placeholder="PW"
          register={register}
          options={{
            required: '비밀번호를 입력해 주세요.',
          }}
          {...(errors.userPwd && {
            errorMessage: (
              <FieldsetErrorMessage children={errors.userPwd.message} />
            ),
          })}
        />

        <FormSubmit />
        <FormFooter>(주) PCN © 2020-2025</FormFooter>
      </Form>
    </Main>
  );
};

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
