import prisma from "../DB/db.config.js";


const isExistsUser = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });
};

export default isExistsUser;