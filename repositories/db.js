import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    "postgres://zmxvhaen:whaf134KzRXpIWcI7Ivptc7cwAgKtQF9@peanut.db.elephantsql.com/zmxvhaen",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
)

export default sequelize