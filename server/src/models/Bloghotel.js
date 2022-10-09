module.exports = (sequelize, DataTypes) => {
    const Bloghotel = sequelize.define('Bloghotel', {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      nroom: DataTypes.STRING,
      pnum: DataTypes.STRING,
      tel:DataTypes.STRING,
      dates: DataTypes.DATE,
      datee:DataTypes.DATE,
      other: DataTypes.STRING
    })
    return Bloghotel
}