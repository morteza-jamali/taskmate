import { authClient } from '@/lib/auth-client';
import * as z from 'zod';

const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: 'First name must be at least 2 characters long.' })
    .trim(),
  lastName: z
    .string()
    .min(2, { error: 'Last name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
});

type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
      };
      data: {
        firstName?: FormDataEntryValue | null;
        lastName?: FormDataEntryValue | null;
        email?: FormDataEntryValue | null;
        password?: FormDataEntryValue | null;
      };
    }
  | undefined;

const messages: Record<string, string> = {
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'email',
};

export async function register(state: FormState, formData: FormData) {
  let errors:
    | Record<string, string | string[]>
    | NonNullable<FormState>['errors'] = {};
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    errors = z.flattenError(validatedFields.error).fieldErrors;

    return {
      errors,
      data,
    };
  }

  const { error: err } = await authClient.signUp.email({
    email: data.email as string,
    password: data.password as string,
    name: `${data.firstName} ${data.lastName}`,
  });

  if (!!err) {
    errors = { [messages[err.code!]]: err.message };
  }

  return {
    errors,
    data,
  };
}
