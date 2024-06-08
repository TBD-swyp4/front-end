import { useForm } from 'react-hook-form';
import type { UserFormType } from '@models/user';

const useUserForm = () => {
  return useForm<UserFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      budget: '',
      gender: 'MALE',
      EI: 'E',
      NS: 'N',
      TF: 'T',
      PJ: 'P',
    },
  });
};
export default useUserForm;
