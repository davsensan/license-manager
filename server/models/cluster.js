const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize) {
  const Cluster = sequelize.define('Cluster',
      { 
        id:{
            type : DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Field name shouldn't be empty" }
            }
        },
        delete : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate : {
                notEmpty: {
                    msg: "Field delete shouldn't be empty"
                }
            }
        },
        comments : {
            type: DataTypes.STRING
        }  
    });
    return Cluster;
}