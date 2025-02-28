import * as RH from 'react-hook-form';
import * as EA from '@/4_entities/apis';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = RH.useForm<LoginFormType>({
    defaultValues: {
      userId: '',
      userPwd: '',
    },
  });

  const onPost = async ({ payload }: { payload: LoginFormType }) => {
    const res = await EA.serverApi.post('/login', payload);

    return { res };
  };

  const onSubmit = handleSubmit((values: LoginFormType) => {
    console.log('values', values);
    onPost({ payload: values });
  });

  return { register, onSubmit, errors };
};
