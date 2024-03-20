export const paginationQuery = async (
  page: string | number,
  limit: string | number
) => {
  const pageNumber = Number(page || 1);
  const limitNumber = Number(limit || 10);
  const skip = (pageNumber - 1) * limitNumber;
  return {
    skip,
    limitNumber,
    pageNumber,
  };
};
