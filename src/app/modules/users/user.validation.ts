import { z } from 'zod';

const create = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.string().optional(),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    isPasswordReset: z.boolean().optional(),
    profileImage: z.boolean().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    isPasswordReset: z.boolean().optional(),
    profileImage: z.boolean().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),
  }),
});

export const UserValidation = {
  create,
  update,
};
