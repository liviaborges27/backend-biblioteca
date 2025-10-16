import {server} from "./server.js";

const port: number = 333;

server.listen(port, () => {
    console.log(`Servidor executando no endereço http://localhost:${port}`);
});