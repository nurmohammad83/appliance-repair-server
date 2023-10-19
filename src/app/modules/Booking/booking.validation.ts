import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    slotId: z.string({
      required_error: 'slotId is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    status: z.string({
      required_error: 'status is required',
    }),
    payment: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    slotId: z.string().optional(),
    date: z.string().optional(),
    status: z.string().optional(),
    payment: z.string().optional(),
  }),
});

export const BookingValidation = {
  create,
  update,
};
