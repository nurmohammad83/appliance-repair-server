type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
};

type IOptionsResults = {
  page: number;
  size: number;
  skip: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice: number | null;
  maxPrice: number | null;
};

const calculatePagination = (option: IOptions): IOptionsResults => {
  const page = Number(option.page || 1);
  const size = Number(option.size || 10);
  const skip = (page - 1) * size;
  const minPrice = Number(option.minPrice);
  const maxPrice = Number(option.maxPrice);
  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder || 'desc';
  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};

export const paginationHelper = {
  calculatePagination,
};
