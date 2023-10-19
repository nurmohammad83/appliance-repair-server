import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    subTitle: z.array(z.string()),
    description: z.array(z.string().optional()).optional(),
    price: z.number({
      required_error: 'price is required',
    }),
    rating: z.string({
      required_error: 'rating is required',
    }),
    categoryId: z.string({
      required_error: 'categoryId is required',
    }),
    trending: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    subTitle: z.array(z.string().optional()).optional(),
    description: z.array(z.string()).optional(),
    price: z.number().optional(),
    rating: z.string().optional(),
    categoryId: z.string().optional(),
    trending: z.string().optional(),
  }),
});

export const ReviewValidation = {
  create,
  update,
};
