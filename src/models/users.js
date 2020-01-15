module.exports = function createUsersModel(sequelize, DataTypes) {
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

  return users
}
