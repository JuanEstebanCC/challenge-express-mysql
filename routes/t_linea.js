const {Router} = require('express');
const router = Router();
const {cnn_mysql} = require('./../config/database');

// Insert TIPO_LINEA

router.post('/linea', async(req, res) => {
    try {
        const {
            descripcion_linea,
            id_marca,
            activo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_linea(descripcion_linea, id_marca, activo) VALUES(?, ?, ?)`, [descripcion_linea, id_marca, activo]);

        if (rows.affectedRows > 0) {
            res.json({
                id: rows.insertId,
                descripcion_linea: descripcion_linea,
                id_marca: id_marca,
                activo: activo
            })
        } else {
            res.json({});
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message : "Error en el servidor"});
    }
});


// Verificar cantidad de registros 

router.get('/linea/registros',(req,res)=>{
    cnn_mysql.query(`SELECT COUNT (*) AS num_registros FROM tipo_linea`, (err,result,fields) =>{
        if(err){
            return console.log(err)
        }else if(result[0].num_registros == 20){
            result.push('¡Cantidad de registros correcta!')
            res.send(result) 
        }else{
            res.send('¡Error!, cantidad de registros invalida!')
        }
        
    })
})

// Verificar activos e inactivos
router.get('/linea/activos', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(activo) AS activo FROM tipo_linea WHERE activo = 'S' UNION
    SELECT COUNT(activo) FROM tipo_linea WHERE activo = 'N'`, (error, resulset, fields) => {
        if (error) {
            return res.status(500).send('¡Error en la base de datos!')
        } else {
            const result = {
                activos: resulset[0].activo,
                inactivos: resulset[1].activo
            }
            return res.json(result)
        }
    })
});


module.exports = router;