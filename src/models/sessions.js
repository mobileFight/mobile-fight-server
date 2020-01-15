module.exports = function createSessionsModel(sequelize, DataTypes) {
  const sessions = sequelize.define(
    "sessions",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {},
  )

  sessions.associate = (models) => {
    sessions.hasOne(models.Users)
  }

  return sessions
}
