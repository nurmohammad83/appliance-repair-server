export const bookingSearchableFields = [
  'date',
  'email',
  'userId',
  'slotId',
  'serviceId',
];
export const bookingFilterableFields = [
  'searchTerm',
  'date',
  'email',
  'userId',
  'slotId',
  'serviceId',
];

export const bookingRelationalFields: string[] = [
  'userId',
  'slotId',
  'serviceId',
];
export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'service',
  userId: 'user',
  slotId: 'slots',
};
