import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import * as S from './styled';

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  options?: Parameters<UseFormRegister<T>>[1];
  errorMessage?: React.ReactNode;
};

export const LoginInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  options,
  errorMessage,
}: Props<T>) => {
  return (
    <S.Fieldset>
      <S.FieldsetLabel children={label} />
      <S.FieldsetInput
        {...register(name as Path<T>, { ...options })}
        placeholder={placeholder}
      />
      {errorMessage}
    </S.Fieldset>
  );
};
