


import {ExpressResponse} from "./express-response";
import {ExpressRequest} from "./express-request";
import {Constructor} from "@node-mvc-decorator/core/lib/beans/constructor";
import {resolveRouter} from "@node-mvc-decorator/core/lib/core";
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import * as url from 'url';

export function bootstrap(...constructors: Array<Constructor>): Server {
    const server = createServer()
        .on('request', (request: IncomingMessage, response: ServerResponse) => {
            var pathname = url.parse(request.url).pathname;
            resolveRouter(constructors, (path, method, hanlder) => {
                if (pathname === path && method === request.method) {
                    hanlder(new ExpressRequest(request), new ExpressResponse(response));
                }
                // app[method](path, (req, res) => hanlder(new ExpressRequest(req), new ExpressResponse(res)))
            });
        });


    return server;
}
