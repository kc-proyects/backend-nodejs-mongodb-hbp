import http from 'node:http';
import app from './app.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});