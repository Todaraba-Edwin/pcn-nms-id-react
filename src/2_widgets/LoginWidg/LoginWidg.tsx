import * as F from '@/3_features';
import * as EH from '@/4_entities/hooks';

export const LoginWidg = () => {
  const loginBodyProps = EH.useLoginForm();
  return <F.LoginBody {...loginBodyProps} />;
};
