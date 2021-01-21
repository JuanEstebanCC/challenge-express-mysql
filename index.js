const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();


// Importando las rutas
const tipo_marca = require('./routes/t_marca')
const tipo_linea = require('./routes/t_linea')
const tipo_vehiculos = require('./routes/vehiculos')


// Uso de morgan y express
app.use(morgan('dev'));
app.use(express.json());

// Rutas (endpoints)
app.use('/api', tipo_marca)

app.use('/api', tipo_linea)

app.use('/api', tipo_vehiculos)




// Iniciar servidor

app.set('port',process.env.PORT || 4000)

app.listen(app.get('port'),(req,res)=>{
  console.log(`Server on port ${app.get('port')}`)
});
