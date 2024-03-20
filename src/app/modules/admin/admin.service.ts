import { Prisma, PrismaClient } from "@prisma/client";
import { searchFields } from "./admin.constant";
import { sortingQuery } from "../../utils/sorting";
import { paginationQuery } from "../../utils/pagination";

const prisma = new PrismaClient();

const retrieveAdminFromDB = async (query: Record<string, any>) => {
  const { searchQuery, page, limit, sortBy, orderBy, ...filterQuery } = query;
  const { skip, limitNumber, pageNumber } = await paginationQuery(page, limit);

  const sorting = await sortingQuery({ sortBy, orderBy });

  const conditions: Prisma.AdminWhereInput[] = [];

  if (searchQuery) {
    conditions.push({
      OR: searchFields.map((field) => {
        return {
          [field]: {
            contains: searchQuery,
            mode: "insensitive",
          },
        };
      }),
    });
  }
  if (filterQuery) {
    for (let key in filterQuery) {
      conditions.push({
        [key]: {
          equals: filterQuery[key],
          mode: "insensitive",
        },
      });
    }
  }

  conditions.push({
    isDeleted: false,
  });

  // console.dir(conditions, { depth: Infinity });

  const result = await prisma.admin.findMany({
    where: {
      AND: conditions,
    },
    skip,
    take: limitNumber,
    orderBy: sorting,
  });

  const total = await prisma.admin.count({
    where: {
      AND: conditions,
    },
  });

  return {
    data: result,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
  };
};

export const adminService = {
  retrieveAdminFromDB,
};
