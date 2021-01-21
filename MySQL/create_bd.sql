USE bktcfx6ix4bmadjgpfqh;

DROP TABLE IF EXISTS  vehiculos;
DROP TABLE IF EXISTS  tipo_linea;
DROP TABLE IF EXISTS  tipo_marca;

CREATE TABLE vehiculo (
    nro_placa VARCHAR(5) PRIMARY KEY,
    id_linea INT(5) UNSIGNED NOT NULL,
    modelo ENUM('1999', '2003', '2005', '2008', '2020') NOT NULL,
    fecha_ven_seguro DATETIME NOT NULL, -- El vehiculo puede no poseer seguro alguno
    fecha_ven_tecnomecanica DATETIME NOT NULL, -- El vehiculo puede no tener tecnomécanica 
    fecha_ven_contratodo DATETIME NOT NULL, -- Puede que no tenga contratodo, por lo tanto no aplica 
    FOREIGN KEY (id_linea) REFERENCES tipo_linea(id_linea)
);


CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_linea VARCHAR(255) -- No es obligatorio, no todas las marcas tienen una descripción,
    activo  ENUM('S', 'N') NOT NULL,
    id_marca INT(5) UNSIGNED NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES tipo_marca(id_marca)
);


CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_marca VARCHAR(255), -- No es obligatorio, no todas las marcas tienen una descripción
    activo  ENUM('S', 'N') NOT NULL
);