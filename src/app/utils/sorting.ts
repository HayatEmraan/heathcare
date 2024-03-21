// { sortBy: [ 'name', 'createdAt' ], orderBy: 'desc' }

export const sortingQuery = async (query: Record<string, any>) => {
  const { sortBy, orderBy } = query;
  if (sortBy && orderBy) {
    return {
      [sortBy]: orderBy,
    };
  } else {
    return {
      createdAt: "desc" as any,
    };
  }
};
