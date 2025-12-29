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

export async function register(state: FormState, formData: FormData) {
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
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      data,
    };
  }

  // Call the provider or db to create a user...
}
