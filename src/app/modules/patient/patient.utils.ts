export const pickQuery = async (query: Record<string, any>, fields: string[]) => {

  Object.keys(query).forEach((key) => {
    if (!fields.includes(key)) {
      delete query[key];
    }
  });

  return query;
};
