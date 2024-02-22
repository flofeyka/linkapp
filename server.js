const http = require("http");

const server = http.createServer((request, response) => {
    response.write("First program")
    response.end();
});


server.listen(3001)