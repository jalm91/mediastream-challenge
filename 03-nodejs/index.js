'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var csv = require('csv-express')

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

app.use(morgan('dev'));
app.get('/', function (req, res) {
  res.send('Usuarios');
});

app.get('/crear', function (req, res) {
	//creo usuarios aleatoriamente solo para verificarlos 
	for (var i = 0; i < 25; i++) {
		var user = new User({email: 'pruebas' + i + '@gmail.com',password:'123pruebas'});
		user.save(function(err,user){
		});	
	}
  res.send('usuario creado exitosamente');
});
app.get('/consultar', function (req, res) {
	User.find(function(err,usuarios){
		console.log("usuarios lista");
		console.log(usuarios);
	})
  res.send('Usuarios -- consulta');
});

app.get('/users', function(req, res) {
	User.find(function(err,usuarios){
		var usrTmp = [];
		for (var i = 0; i < usuarios.length; i++) {
			usrTmp.push({
				"No.": i,
				"email":usuarios[i].email
			})
		}
		res.csv(usrTmp, true);
	})
})

app.listen(3000);
