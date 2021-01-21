const {Router} = require('express');
const router = Router();
const {cnn_mysql} = require('./../config/database');


// Insert TIPO_MARCA 
router.post('/marca',async(req,res)=>{
    try {
        const {
            descripcion_marca,
            activo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_marca(descripcion_marca, activo) VALUES(?, ?)`, [descripcion_marca, activo]);

        if (rows.affectedRows > 0) {
            res.json({
                id: rows.insertId,
                descripcion_marca: descripcion_marca,
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

router.get('/marca/registros',(req,res)=>{
    cnn_mysql.query(`SELECT COUNT (*) AS cantidad FROM tipo_marca`, (err,result,fields) =>{
        if(err){
            return console.log(err)
        }else if(result[0].cantidad == 5){
            result.push('¡Cantidad de registros correcta!')
            res.send(result) 
        }else{
            res.send('¡Error!, cantidad de registros invalida!')
        }
        
    })
})

// Crear registro adicional TIPO_MARCA
router.post('/marca/crear', async(req, res) => {
    try {
        const {
            descripcion_marca,
            activo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_marca(descripcion_marca, activo) VALUES(?, ?)`, [descripcion_marca, activo]);

        if (rows.affectedRows > 0) {
            res.json({
                id: rows.insertId,
                descripcion_marca: descripcion_marca,
                activo: activo
            })
        } else {
            res.json({});
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message : "Error en el servidor"});
    }
});

// Eliminar registro TIPO_MARCA
router.delete('/marca/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await mysql.promise().query(`DELETE FROM tipo_marca WHERE id_marca=${id}`);
        return res.json(rows);
    } catch (err) {
        return res.json(err);
    }
});

module.exports = router;