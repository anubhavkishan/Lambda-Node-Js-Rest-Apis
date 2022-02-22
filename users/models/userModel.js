
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User;
}