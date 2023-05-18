const http = require("http");
// import http from "http";

const server = http.createServer((request, response) => {
	if (request.url === "/") {
		response.write("<h1>Hello backend!</h1>");
		response.end();
	} else if (request.url === "/cats") {
		response.write("<h1>Cats are cute!</h1>");
		response.end();
	} else {
		response.write("<p>404</p>");
		response.end;
	}
});

server.listen(3000);
