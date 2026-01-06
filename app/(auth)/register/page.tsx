'use client';

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from '@/components/Link';
import { useActionState, useEffect } from 'react';
import { register } from '@/actions/auth';
import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [state, action, pending] = useActionState(register, undefined);

  useEffect(() => {
    if (
      state?.errors === undefined ||
      Object.keys(state?.errors).length === 0
    ) {
      console.log('Registered successfully !');
    }
  }, [state]);

  return (
    <AuthForm action={action}>
      <Typography variant="h4">Sign up</Typography>
      <Stack direction="row" justifyContent="stretch" spacing={3}>
        <TextField
          fullWidth
          name="firstName"
          label="First Name"
          error={state?.errors?.firstName !== undefined}
          helperText={state?.errors?.firstName}
          defaultValue={state?.data.firstName}
        />
        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          error={state?.errors?.lastName !== undefined}
          helperText={state?.errors?.lastName}
          defaultValue={state?.data.lastName}
        />
      </Stack>
      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        error={state?.errors?.email !== undefined}
        helperText={state?.errors?.email}
        defaultValue={state?.data.email}
      />
      <FormControl error={state?.errors?.password !== undefined}>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <OutlinedInput
          id="password-input"
          aria-describedby="password-input-text"
          label="Password"
          name="password"
          type="password"
          defaultValue={state?.data.password}
        />
        <FormHelperText
          id="password-input-text"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {state?.errors?.password
            ? (state?.errors?.password as string[]).map((err, key) => (
                <span key={key}>{err}</span>
              ))
            : 'Use 8 or more characters with a mix of letters, numbers & symbols'}
        </FormHelperText>
      </FormControl>
      <Stack direction="row" spacing={5} alignItems="center">
        <Button
          loading={pending}
          type="submit"
          variant="contained"
          size="large"
        >
          Submit
        </Button>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1">Already have an acount ?</Typography>
          <Link href="/login">Login</Link>
        </Stack>
      </Stack>
    </AuthForm>
  );
}
