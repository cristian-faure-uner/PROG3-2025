import mysql from 'mysql2/promise';

export const conexion = await mysql.createConnection({
  host: 'localhost',
  user: 'reservas',
  database: 'reservas',
  password: '*reservas.25*'  
});
