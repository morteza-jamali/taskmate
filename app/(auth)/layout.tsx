'use client';

import { Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

import LoginImg from '@/public/login.svg';

const Root = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(5),
  position: 'fixed',
  inset: 0,
}));

const RegisterPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(10),
}));

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Root justifyContent="center" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={10}>
        <Image src={LoginImg} alt="login image" />
        <RegisterPaper elevation={8} square={false}>
          {children}
        </RegisterPaper>
      </Stack>
    </Root>
  );
}
