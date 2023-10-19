import { z } from 'zod';

const create = z.object({
  body: z.object({
    review: z.string({
      required_error: 'review is required',
    }),
    rating: z.number({
      required_error: 'rating is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    serviceId: z.string().optional(),
    userId: z.string().optional(),
  }),
});

export const ReviewValidation = {
  create,
  update,
};
