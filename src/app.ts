import {Server} from './server';

let server = new Server().app;

let port =9000;

server.listen(port,()=>{
        console.log(`Server Listen port :`,port)
})  