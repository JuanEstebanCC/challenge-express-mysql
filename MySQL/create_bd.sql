DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS  tipo_linea;
DROP TABLE IF EXISTS  tipo_marca;

CREATE TABLE vehiculos(
    nro_placa VARCHAR(5) UNSIGNED PRIMARY KEY,
    id_linea INT(5) UNSIGNED,
    modelo ENUM('1999', '2001', '2003', '2004', '2005','2006','2012','2010') NOT NULL,
    fecha_ven_seguro DATE, -- El vehiculo puede no poseer seguro alguno
    fecha_ven_tecnomecanica DATE, -- El vehiculo puede no tener tecnomécanica 
    fecha_ven_contratodo DATE, -- Puede que no tenga contratodo, por lo tanto no aplica 
    FOREIGN KEY (id_linea) REFERENCES tipo_linea(id_linea)
)ENGINE=INNODB;


CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_linea VARCHAR(255) -- No es obligatorio, no todas las marcas tienen una descripción,
    activo  ENUM('S', 'N') NOT NULL,
    id_marca INT(5) UNSIGNED NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES tipo_marca(id_marca)
)ENGINE=INNODB;


CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_marca VARCHAR(255), -- No es obligatorio, no todas las marcas tienen una descripción
    activo  ENUM('S', 'N') NOT NULL
)ENGINE=INNODB;