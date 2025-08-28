---------------------------------------------------------INSERT--------------------------------------------------------------------

-- SALON
INSERT INTO `salones`( `titulo`, `direccion`, `latitud`, `longitud`, `capacidad`, `importe`) 
    VALUES ('Bosquesito', 'La Paz 166', -31.350, -58.052, 500, 600000);

-- SERVICIO
INSERT INTO `servicios`(`descripcion`, `importe`) VALUES ('Fotografía instantanea', 220000);

-- RESERVA CON LOS DATOS CREADOS PREVIAMENTE
INSERT INTO `reservas`(`fecha_reserva`, `salon_id`, `usuario_id`, `turno_id`, `tematica`, `importe_salon`, `importe_total`)
    VALUES ('2025-08-30', 8,9,1,'sirenita', 600000,820000);


---------------------------------------------------------UPDATE--------------------------------------------------------------------


-- MODIFICAR CAMPO ACTIVO DE USUARIO
UPDATE `usuarios` SET `activo`=0 WHERE usuario_id = 7;

-- MODIFICAR EL IMPORTE DE UN SERVICIO
UPDATE `servicios` SET `importe`=150000 WHERE  servicio_id = 8;

---------------------------------------------------------DELETE--------------------------------------------------------------------

-- ELIMINAR UN USUARIO FISICAMENTE
DELETE FROM `usuarios` WHERE usuario_id = 3;

-- ELIMINAR UN SERVICIOS
DELETE FROM `servicios` WHERE usuario_id = ;


---------------------------------------------------------SELECTS--------------------------------------------------------------------

-- TODAS LAS RESERVAS
SELECT * FROM `reservas`;

-- USUARIOS ACTIVOS
SELECT * FROM `usuarios` WHERE activo =1;

-- SALONES ACTIVOS
SELECT * FROM `salones` WHERE activo =1;


-- [ORDER BY]
-- SALONES ORDENADOS POR CAPACIDAD: 
-- ASCENDENTE
SELECT * FROM `salones` WHERE activo = 1 ORDER BY capacidad;

-- DESCENDENTE
SELECT * FROM `salones` WHERE activo = 1 ORDER BY capacidad DESC;

-- [GROUP BY]
-- RESERVAS TOTALES
SELECT COUNT(salon_id) as cantidad FROM `reservas` 

-- RESERVAS TOTALES DE UN SALON
SELECT COUNT(salon_id) as cantidad FROM `reservas` WHERE salon_id = 2;

-- RESERVAS TOTALES POR SALON
SELECT salon_id, COUNT(salon_id) as cantidad FROM `reservas` GROUP BY salon_id;

SELECT r.salon_id, COUNT(r.salon_id) as cantidad , s.titulo
FROM `reservas` as r 
inner join salones as s on s.salon_id = r.salon_id
GROUP BY r.salon_id;

-- [HAVING]
-- SALONES CON MAS DE X RESERVAS
SELECT salon_id, COUNT(salon_id) as cantidad FROM `reservas` GROUP BY salon_id
HAVING cantidad > 2;



---------------------------------------------------------JOIN--------------------------------------------------------------------

-- INFORMACION DE SALONES CON RESERVAS MAYORES A 2
SELECT r.salon_id, COUNT(r.salon_id) as cantidad, s.titulo, s.direccion 
	FROM reservas as r
    INNER JOIN salones as s ON s.salon_id = r.salon_id
    GROUP BY r.salon_id
	HAVING cantidad > 2;


-- INFORMACION DE LOS USUARIOS QUE LO CREO A LA RESERVA
SELECT r.reserva_id, r.fecha_reserva, u.nombre, u.apellido, CONCAT(u.nombre, ' - ', u.apellido) 
    FROM `reservas` as r INNER JOIN usuarios AS u ON u.usuario_id = r.usuario_id;    

-- INFORMACION DE LOS SERVICIOS DE UNA RESERVA
SELECT r.fecha_reserva, r.reserva_id, rs.importe, s.descripcion 
FROM reservas as r 
INNER JOIN reservas_servicios as rs on rs.reserva_id = r.reserva_id
INNER JOIN servicios as s on s.servicio_id = rs.servicio_id;


-- INFORMACION DE LAS RESERVAS AGRUPADAS POR RESERVAS, TOTALIZADAS POR COSTO DEL SERVICIO
SELECT r.fecha_reserva, r.reserva_id, sum(rs.importe) as imp_tot 
FROM reservas as r 
INNER JOIN reservas_servicios as rs on rs.reserva_id = r.reserva_id 
INNER JOIN servicios as s on s.servicio_id = rs.servicio_id 
GROUP BY r.reserva_id;


-- INFORMACION SIN DETALLE DE SERVICIOS PARA LAS RESERVAS
SELECT r.fecha_reserva, r.reserva_id, sa.titulo, sa.direccion, t.orden, concat(u.apellido, '-', u.nombre)
FROM reservas as r 
INNER JOIN salones as sa on sa.salon_id = r.salon_id
INNER JOIN usuarios as u on u.usuario_id = r.usuario_id
INNER JOIN turnos as t on t.turno_id = r.turno_id;


-- INFORMACION DE LAS RESERVAS CON LOS SERVICIOS CONTRATADOS
SELECT r.fecha_reserva, r.reserva_id, sa.titulo, sa.direccion, t.orden, concat(u.apellido, '-', u.nombre), s.descripcion, s.importe
FROM reservas as r 
INNER JOIN salones as sa on sa.salon_id = r.salon_id
INNER JOIN usuarios as u on u.usuario_id = r.usuario_id
INNER JOIN turnos as t on t.turno_id = r.turno_id
LEFT join reservas_servicios as rs on rs.reserva_id = r.reserva_id
LEFT JOIN servicios as s on s.servicio_id = rs.servicio_id;



---------------------------------------------------------PROCEDIMIENTO ALMACENADO---------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE obtener_detalle_de_resevas()
BEGIN
	SELECT r.fecha_reserva, r.reserva_id, sa.titulo, sa.direccion, t.orden, concat(u.apellido, '-', u.nombre), s.descripcion, s.importe 
    FROM reservas as r 
    INNER JOIN salones as sa on sa.salon_id = r.salon_id 
    INNER JOIN usuarios as u on u.usuario_id = r.usuario_id 
    INNER JOIN turnos as t on t.turno_id = r.turno_id 3
    LEFT JOIN reservas_servicios as rs on rs.reserva_id = r.reserva_id 
    LEFT JOIN servicios as s on s.servicio_id = rs.servicio_id;
END // 
DELIMITER ;
