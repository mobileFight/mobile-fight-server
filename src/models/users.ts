export default function createUsersModel(sequelize, DataTypes) {
  const users = sequelize.define("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    password: DataTypes.STRING,
    login: DataTypes.STRING,
  })

  users.getByToken = async function(userId: number) {
    const user = await users.findOne({
      where: {
        id: userId,
      },
    })

    return user
  }

  return users
}
