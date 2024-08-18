import {createServer} from 'node:http'
import {text,json} from 'node:stream/consumers'
import { index, create , remove, update } from './jstools/main_functions.js';
import { Notfounderror } from './jstools/errors.js';


const srv = createServer(async (req,res) => {
    const url = new URL(req.url,`http://${req.headers.host}`)

   res.setHeader('Content-Type', 'application/json');

const endpoint = `${req.method}:${url.pathname}`  
let result ='';
try {
   switch (endpoint) {
    case 'GET:/todos' :
        result = await index()
    break;
    case 'POST:/todos' :
        result = await create(req)
    break;
    case 'DELETE:/todos':
        await remove(req,url)
        res.writeHead(204)
        break;
        case 'PUT:/todos':
        await update(req,url)
        res.writeHead(204)
        break;
    default:
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    res.write(JSON.stringify(result));
} catch (e) {
    if(e instanceof Notfounderror) {
   res.writeHead(404);
    } else {
        throw e;
    }
}


res.end();
}).listen('8888')
//ajizejhfiuzhçfnid1111111111111111111111111111111111111111111111