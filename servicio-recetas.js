const fs = require("fs");
const server = require("fastify")({
    /*https : {
        key: fs.readFileSync(__dirname + "/tls/llave-privada.key"),
        cert: fs.readFileSync(__dirname + "shared/tls/certificado-publico.cert")
    }*/
});

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

console.log(`Proceso pid=${process.pid}`);

//localhost:4000/recetas/42
server.get('/recetas/:id', async (request, response) => {
    console.log(`Proceso de atención de solicitud pid=${process.pid}`);
    const id = Number(request.params.id);
    if (id !== 42) {
        response.statusCode = 404;
        return { error : "No se encontró la receta" };
    }
    return {
        pid : process.pid,
        receta : {
            id,
            nombre: "Taco de pollo",
            pasos: "Agarra una tortilla y échale pollo",
            ingredientes: [
                {id: 1, nombre: "Tortilla", cantidad: "2 unidades"},
                {id: 2, nombre: "pollo", cantidad: "80grs"},
            ]
        }
    };
});

server.listen(PORT, HOST, () => {
    console.log(`ejecutandose en https://${HOST}:${PORT}`);
})