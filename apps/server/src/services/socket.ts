import {Server} from 'socket.io'
import Redis from 'ioredis'

const pub = new Redis({
    host: 'redis-2ba48bcf-scalable-chat-app9.i.aivencloud.com',
    port:27912,
    username:'default',
    password:'AVNS_acI8PKj2SIGV67Eplgf',
});
const sub = new Redis({
    host: 'redis-2ba48bcf-scalable-chat-app9.i.aivencloud.com',
    port:27912,
    username:'default',
    password:'AVNS_acI8PKj2SIGV67Eplgf',
});

class SocketService{
    private _io: Server;
    constructor(){
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners(){
        const io = this.io;
        
        console.log("Init Socket Listeners...");
        io.on("connect", (socket)  => {
            console.log('New Socket Connected', socket.id);

            socket.on("event:message", async({message}:{message:string}) => {
                console.log("New Message Received:", message);
                //Publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            });
        });

        sub.on("message", (channel, message) => {
            if(channel==="MESSAGES"){
                console.log("New message from Redis", message );
                io.emit("message", message);
            }
        })
        

    }
    get io(){
        return this._io;
    }
}
export default SocketService;