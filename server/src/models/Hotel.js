module.exports = ( sequelize, DataTypes ) => {
    const Hotel = sequelize.define('Hotel', {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      pictures: DataTypes.STRING,
      content: DataTypes.TEXT,
      catagori: DataTypes.STRING,
      price: DataTypes.STRING
    })
    return Hotel
  }
  