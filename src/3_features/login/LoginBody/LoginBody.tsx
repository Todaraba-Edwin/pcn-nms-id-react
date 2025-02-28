import * as S from './styled';
import * as RH from 'react-hook-form';
import * as FC from '@/3_features/common';
import * as SC from '@/5_shared/constants';

type Props = {
  register: RH.UseFormRegister<LoginFormType>;
  onSubmit: () => void;
  errors: RH.FieldErrors<LoginFormType>;
};

export const LoginBody = ({ register, onSubmit, errors }: Props) => {
  return (
    <S.Main>
      <S.Form onSubmit={onSubmit}>
        <S.FormTitle>
          <S.WelcomeImg src={`${SC.imagePath.login.welcome}`} />
          <S.FormDesc children="아래의 빈칸에 계정을 입력하세요" />
        </S.FormTitle>
        <FC.LoginInput<LoginFormType>
          label="아이디"
          name={'userId'}
          placeholder="ID"
          register={register}
          options={{
            required: '아이디를 입력해 주세요.',
          }}
          {...(errors.userId && {
            errorMessage: (
              <S.FieldsetErrorMessage children={errors.userId.message} />
            ),
          })}
        />
        <FC.LoginInput<LoginFormType>
          label="비밀번호"
          name={'userPwd'}
          placeholder="PW"
          register={register}
          options={{
            required: '비밀번호를 입력해 주세요.',
          }}
          {...(errors.userPwd && {
            errorMessage: (
              <S.FieldsetErrorMessage children={errors.userPwd.message} />
            ),
          })}
        />

        <S.FormSubmit />
        <S.FormFooter children="(주) PCN © 2020-2025" />
      </S.Form>
    </S.Main>
  );
};
