const assert = require('assert');
const passwordHash = require('password-hash');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;
const connectDB = require('../../server/db').connectDB;

//Cargamos los modelos
const models = require('../../server/models')(sequelize);



describe('Model User', function() {
	
  beforeEach(function(done){
	  //Sincronizamos la base de datos
	  sequelize.sync({force:true}).then( () => {
			done();
		}, (err) => {
			console.log("Error connecting DB, retrying...");
			setTimeout(connectDB, 1000);
		})
  });

  it('Should create a empty models', function(done) {
  	models.User.findAll({where: {}})
  	.then(function(Users){
  		try{
			assert.equal(Users.length,0);
			done();
		} catch (e) {
		 	done(e);
		}
	}, function(err){
		done(err);
	})
  });

  it('Should create only 1 user', function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "1234567890",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length,1);
					done();
				}catch (e){
					done(e);
				}
		  	}, function(err){
				done(err);
			})
		}, function(err){ 
         	done(err);
        	});
	});

  it("Shouldn't create user. Password too short", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "1234567",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Format password is incorrect. Password should be between 8 and 15 alphanumeric characters"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });

  it("Shouldn't create user. Password too long", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "1234567890123456",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Format password is incorrect. Password should be between 8 and 15 alphanumeric characters"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });
  it("Shouldn't create user. Password empty", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Format password is incorrect. Password should be between 8 and 15 alphanumeric characters"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });


  it("Shouldn't create user. Role invalid", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "invalid role"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Rol user must be normal or admin"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
       	});
	});

  	it("Shouldn't create user. Role empty", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: ""
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Rol user must be normal or admin"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
       	});
	});

	it("Shouldn't create user. Email wrong format", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "invalid email", 
		  password: "0987654321",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Email should be a correct email"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
       	});
	});

	it("Should find user created by email", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
  		models.User.findOne({
  			where: {
  				email: "DAVID@prueba.com"}
  			}).then(function(Found_User, err){
  			if(!err){
	  			try{
				  	assert.notEqual(Found_User, null);
				  	}catch (e){
				  		return done(e);
				  	}
				return done();
			}
			else
				return done(err)
			}, function(err){
	         	return done(err); //No ha de haber error, si no lo hay el test no pasa
	       	});
  		});
	});

	it("Should create one user with correct paramaters", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		});
  	NewUser.save().then(function(NewUser) {
  		models.User.findOne({where: {
  			email: "DAVID@prueba.com"}
  			}).then(function(Found_User, err){
	  			try{
	  				assert.equal(NewUser.getDataValue("name"),"David");
	  				assert.equal(NewUser.getDataValue("email"),"david@prueba.com");
	  				assert.notEqual(NewUser.getDataValue("password"),"0987654321");
	  				assert.equal(NewUser.getDataValue("role"),"normal");
				  	}catch (e){
				  		return done(e);
				  	}
				return done();
			}, function(err){
	         	return done(err); //No ha de haber error, si no lo hay el test no pasa
	       	});
  		});
	});

	it("Should create one user with correct hash password", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		}); //Ya no es necesario buscar en las base de datos debido a que si antes funcionó ahora también
	try{
  		assert.equal(NewUser.verifyPassword("0987654321"), true)
  		done();
  	}catch (e){
  		done(e);
  		}
  	});

  	it("Should change password user correctly", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		}); //Ya no es necesario buscar en las base de datos debido a que si antes funcionó ahora también
	try{
		assert.equal(NewUser.changePassword("0987654321","1234567890"), true);
  		assert.equal(NewUser.verifyPassword("0987654321"), false);
  		assert.equal(NewUser.verifyPassword("1234567890"), true);
  		done();
  	}catch (e){
  		done(e);
  		}
  	});

  	it("Shouldn't change password user correctly. Current password incorrect", function(done) {
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		}); //Ya no es necesario buscar en las base de datos debido a que si antes funcionó ahora también
	try{
		assert.equal(NewUser.changePassword("incorrect","1234567890"), false);
  		assert.equal(NewUser.verifyPassword("0987654321"), true);
  		assert.equal(NewUser.verifyPassword("1234567890"), false);
  		done();
  	}catch (e){
  		done(e);
  		}
  	});

  	it("Should change password user saved", function(done){
  	const NewUser = models.User.build({
		  name: "David",
		  email: "David@prueba.com", 
		  password: "0987654321",
		  role: "normal"
		});
  	NewUser.save().then(function() {
  		models.User.findOne({where: 
  			{email:"DAVID@prueba.com"}
  		}).then(function(Found_User, err){
	  				Found_User.changePassword("0987654321", "1234567890");
	  				Found_User.update(Found_User).then(function(Change_User){
	  					try{
	  					assert.equal(Change_User.verifyPassword("0987654321"), false);
  						assert.equal(Change_User.verifyPassword("1234567890"), true);
  						return done();
  						}catch (e){
				  			return done(e)
				  		}
	  				}, function(err){
	         			return done(err);
	         		})
				});
			}, function(err){
	         	return done(err); //No ha de haber error, si no lo hay el test no pasa
	       	});
  		});
});
