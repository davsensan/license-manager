module.exports = function (sequelize){
	//Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos
	const User = require('./user')(sequelize);
	const Group = require('./group')(sequelize);
	const License = require('./license')(sequelize);
	const Cluster = require('./cluster')(sequelize);
	const License_pool = require('./license_pool')(sequelize);

	//Un usuario pertenece a un grupo
	User.belongsTo(Group);

	//Un grupo tiene muchos usuarios o ninguno en caso de que sea null la clave externa
	Group.hasMany(User);

	//Un grupo tiene muchos clusters o ninguno
	Group.hasMany(Cluster);

	//Una licencia es creada por un usuario ("pertenece" a un usuario). 
	//Si el usuario se borra, se pierde la referencia al usuario poniendose el campo UserId a null
	License.belongsTo(User);

	//Un pool de licencias pertenece a un grupo, y no puede NO pertener a ninguno (no puede ser null)
	//Si una organización se borra, se borrarán todas las licencias asociadas a ella. Sin embargo no se borrarán sino que se marcarán como borradas
	Group.hasMany(License_pool, {foreignKey: {allowNull: false}, onDelete: 'Cascade'});

	//Una licencia pertence a un cluster 
	License.belongsTo(Cluster);


	return {
		User: User,
		Group: Group,
		License: License,
		License_pool: License_pool,
		Cluster: Cluster
	};
};