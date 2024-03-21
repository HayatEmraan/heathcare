import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
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

const retrieveSingleAdminFromDB = async (id: string) => {
  // checking admin
  const findAdmin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findAdmin) {
    throw new Error("Admin isn't found");
  }
  return findAdmin;
};

const updateSingleAdminFromDB = async (id: string, data: Partial<Admin>) => {
  // checking admin
  const findAdmin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findAdmin) {
    throw new Error("Admin isn't found");
  }

  const updateAdmin = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return updateAdmin;
};

const deleteSingleAdminFromDB = async (id: string) => {
  // checking admin
  const findAdmin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findAdmin) {
    throw new Error("Admin isn't found");
  }

  const softDeleteAdmin = prisma.admin.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  const softDeleteUser = prisma.user.update({
    where: {
      email: findAdmin.email,
    },
    data: {
      status: UserStatus.DELETED,
    },
  });

  const [softDelete] = await prisma.$transaction([
    softDeleteAdmin,
    softDeleteUser,
  ]);

  return softDelete;
};

export const adminService = {
  retrieveAdminFromDB,
  retrieveSingleAdminFromDB,
  deleteSingleAdminFromDB,
  updateSingleAdminFromDB,
};
