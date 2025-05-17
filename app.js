const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: 'contenedor-mysql',
  user: 'root',
  password: 'hpotter123',
  database: 'practica_ifts'
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM varitas_magicas', (error, results) => {
    if (error) {
      return res.status(500).send('Error en la conexión a la base de datos');
    }
    let html = '<h1>Mensajes desde MySQL:</h1>';
    results.forEach(row => {
      html += `<p>${row.descripcion} + ' - ' + ${row.mago}</p>`;
    });
    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
