


import {HttpResponse} from "./http-response";
import {HttpRequest} from "./http-request";
import {Constructor} from "@node-mvc-decorator/core/lib/beans/constructor";
import {resolveRouter} from "@node-mvc-decorator/core/lib/core";
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import * as url from 'url';
import {RequestMethod} from "@node-mvc-decorator/core";

export function bootstrap(...constructors: Array<Constructor>): Server {
    const routerMap = new Map<string, Map<RequestMethod, (req: HttpRequest, res: HttpResponse) => void>>();
    resolveRouter(constructors, (path, method, hanlder) => {
        let methodMap;
        if (routerMap.has(path)) {
            methodMap = routerMap.get(path);
        } else {
            methodMap = new Map<RequestMethod, (req: HttpRequest, res: HttpResponse) => void>();
            routerMap.set(path, methodMap);
        }
        methodMap.set(method, hanlder);
    });
    console.log(routerMap);
    return createServer()
        .on('request', (request: IncomingMessage, response: ServerResponse) => {
            const httpResponse = new HttpResponse(response);
            const pathname = url.parse(request.url).pathname;
            const methodMap = routerMap.get(pathname);
            if (methodMap) {
                const handler = methodMap.get(<any> request.method.toLowerCase());
                if (handler) {
                    handler(new HttpRequest(request), httpResponse);
                } else {
                    httpResponse.status(405).end();
                }
            } else {
                httpResponse.status(404).end();
            }
        });
}
