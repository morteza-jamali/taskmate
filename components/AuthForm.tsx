import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { type FormHTMLAttributes } from 'react';

const FormRootStack = styled(Stack)(({ theme }) => ({
  '& > :first-child': {
    marginBottom: theme.spacing(3),
  },
  '& > :last-child': {
    marginTop: theme.spacing(5),
  },
}));

export interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const AuthForm = ({ children, ...props }: AuthFormProps) => (
  <form {...props}>
    <FormRootStack spacing={3}>{children}</FormRootStack>
  </form>
);

export default AuthForm;
