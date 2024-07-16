import http from "http";
import SocketService from "./services/socket";

async function init(){
    const socketService= new SocketService();
    const requestHandler = (req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Server running');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    };
    const httpServer = http.createServer(requestHandler);
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    
    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log(`HTTP Server started at PORT: ${PORT}`));
    
    socketService.initListeners();
}

init();