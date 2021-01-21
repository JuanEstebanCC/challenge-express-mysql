const { Router } = require("express");
const router = Router();
const { cnn_mysql } = require("./../config/database");

// Insert VEHICULOS

router.post("/vehiculo", async (req, res) => {
  const {
    nro_placa,
    id_linea,
    modelo,
    fecha_ven_seguro,
    fecha_ven_tecnomecanica,
    fecha_ven_contratodo,
  } = req.body;
  const newVehiculo = {
    nro_placa,
    id_linea,
    modelo,
    fecha_ven_seguro,
    fecha_ven_tecnomecanica,
    fecha_ven_contratodo,
  };
  await cnn_mysql.query("INSERT INTO vehiculo SET ?", [newVehiculo], (err) => {
    if (err) {
      console.log(err);
    }
  });
});

// Verificar cantidad de registros

router.get("/vehiculo/registros", (req, res) => {
  cnn_mysql.query(
    `SELECT COUNT (*) AS num_registros FROM vehiculo`,
    (err, result, fields) => {
      if (err) {
        return console.log(err);
      } else if (result[0].num_registros == 30) {
        result.push("¡Cantidad de registros correcta!");
        res.send(result);
      } else {
        res.send("¡Error!, cantidad de registros invalida!");
      }
    }
  );
});

// Modelo máximo y mínimo

router.get("/vehiculo/modelo-max-min", async (req, res) => {
  try {
    const [rows] = await cnn_mysql.execute(
      `SELECT MAX(modelo) AS maximo_modelo, MIN(modelo) AS minimo_modelo FROM vehiculo`
    );
    if (rows[0]) {
      res.json(rows[0]);
    }
  } catch (e) {
    res.status(500).json({ errorCode: e.errno, message: "Error" });
  }
});

// Verificar DESC_MARCA y DESC_LINEA
router.get("/vehiculo/lineas-marca", async (req, res) => {
  row = await connectionBD.query(
    "SELECT tipo_linea.id_linea, tipo_linea.descripcion_linea, tipo_marca.descripcion_marca FROM tipo_linea INNER JOIN tipo_marca ON tipo_linea.id_marca=tipo_marca.id_marca;"
  );
  res.send(row);
});

// Consultar FECHA_VEN_SEGURO
router.get("/vehiculo/fecha-ven-seguro", (req, res) => {
  const { inicio_f, fin_f } = req.body;

  console.log(inicio_f, fin_f);
  cnn_mysql.query(
    `SELECT * FROM vehiculo WHERE fecha_ven_seguro 
    BETWEEN ? AND ?`,
    [inicio_f, fin_f],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Cambia estado de los Registros

router.put("/vehiculo/cambiar/:id", async (req, res) => {
  const { id } = req.params;
  const { estado, cambiar } = req.body;
  try {
    const rows = await mysql
      .promise()
      .query(
        `UPDATE tipo_${cambiar} SET activo='${estado}' WHERE id_${cambiar}='${id}'`
      );
    return res.json(rows);
  } catch (err) {
    return res.json(err);
  }
});

// Consulta  única 
router.get("/vehiculo/consulta-unica", (req, res) => {
  cnn_mysql.query(
    `SELECT nro_placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo
    JOIN tipo_linea ON vehiculo.id_linea = tipo_linea.id_linea
    JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca`,
    (error, resulset, fields) => {
      if (error) {
        return res.status(500).send("¡Error en la base de datos!");
      } else {
        return res.json(resulset);
      }
    }
  );
});

// Consulta única estado = 'S'
router.get("/vehiculo/consulta-unica-estado", (req, res) => {
  cnn_mysql.query(
    `SELECT nro_placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo JOIN tipo_linea ON vehiculo.id_linea = tipo_linea.id_linea JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca WHERE tipo_linea.activo = 'S'`,
    (error, resulset, fields) => {
      if (error) {
        return res.status(500).send("¡Error en la base de datos!");
      } else {
        return res.json(resulset);
      }
    }
  );
});

// Sumar modelos
router.get("/vehiculo/suma-modelos", async (req, res) => {
  await cnn_mysql.query(
    "SELECT modelo, COUNT(modelo) AS suma FROM vehiculo GROUP BY modelo",
    (err, rows, field) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Promedio modelos
router.get("/vehiculo/promedio-modelos", async (req, res) => {
  await cnn_mysql.query(
    "SELECT modelo, AVG(cantidad) AS promedio FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculo GROUP BY modelo) AS promedio",
    (err, rows, field) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});
// Unión de tablas JOIN
router.get("/vehiculo/inner", (req, res) => {
  cnn_mysql.query(
    `SELECT nro_placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo
    INNER JOIN tipo_linea ON vehiculo.id_linea = tipo_linea.id_linea
    INNER JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca WHERE tipo_linea.activo = 'S'`,
    (error, resulset, fields) => {
      if (error) {
        return res
          .status(500)
          .send("se presento un error en la base de datos.");
      } else {
        return res.json(resulset);
      }
    }
  );
});

// Unión de tables LEFT
router.get("/vehiculo/left", (req, res) => {
  cnn_mysql.query(
    `SELECT nro_placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo
    LEFT JOIN tipo_linea ON vehiculo.id_linea = tipo_linea.id_linea
    LEFT JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca WHERE tipo_linea.activo = 'S'`,
    (error, resulset, fields) => {
      if (error) {
        return res
          .status(500)
          .send("se presento un error en la base de datos.");
      } else {
        return res.json(resulset);
      }
    }
  );
});

//Consulta única sin campo nulos y con formato
router.get("/vehiculo/consulta-unica-formato", (req, res) => {
    cnn_mysql.query(`SELECT tipo_linea.id_linea, tipo_linea.descripcion_linea, tipo_linea.id_marca, IF(tipo_linea.activo = 'S', 'Activo', 'Inactivo') AS "Activo:" FROM tipo_linea WHERE descripcion_linea IS NOT NULL`,
      (err, result, fields) => {
        if (err) {
          return res.send(err);
        } else {
          res.json(result);
        }
      }
    );
});

module.exports = router;
