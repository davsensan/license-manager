const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize) {
  const Group = sequelize.define('Group',
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
        sensors: {
            type: DataTypes.STRING, //Lista de sensores separados por ;
            allowNull: false,
            validate: {
                notEmpty: {msg: "Field sensors shouldn't be empty'"},
            }
        },        
        type: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                isIn: {
                    args: [['RedBorder', 'Teldat']],
                    msg: "Type must be RedBorder or Teldat"
                    }
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
    return Group;
}