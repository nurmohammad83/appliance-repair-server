export const servicesSearchableFields = ['name', 'categoryId'];
export const servicesFilterableFields = [
  'searchTerm',
  'category',
  'categoryId',
];

export const servicesRelationalFields: string[] = ['categoryId'];
export const servicesRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
