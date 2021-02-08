const prisma = require('../prisma')

module.exports = {
  findOrCreate: async (oAuthData) => {
    console.log('findOrCreate')
    
    try {
      const user = await prisma.user.findFirst( { where : { oAuthId: oAuthData.id } });

      if (!user) {
        console.log('user dont exist, create')
        const newUser =  await prisma.user.create({ data : {oAuthId: oAuthData.id, oAuthData: oAuthData} })
        return newUser
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findMany: async (id) => {
    return prisma.user.findMany();
  },
  findById: async (id) => {
    return prisma.user.findUnique({ where : { id: id } });
  },
  create : async (data, user)=>{
    return prisma.user.create({ data })
  },
  update : async (id, data)=>{
    return prisma.user.update({ data , where : {
      id : id || prisma.user.id
    } })
  },
  delete : async (id)=>{
    return prisma.user.delete({
      where : {
        id : id 
      }
    })
  }
};
