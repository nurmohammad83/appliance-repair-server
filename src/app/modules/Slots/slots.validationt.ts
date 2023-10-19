import { z } from 'zod';

const create = z.object({
  body: z.object({
    slotTime: z.string({
      required_error: 'slotTime is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    slotTime: z.string().optional(),
  }),
});

export const SlotsValidation = {
  create,
  update,
};
