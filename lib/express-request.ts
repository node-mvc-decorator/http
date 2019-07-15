
import * as express from 'express';
import {IncomingHttpHeaders} from "http";
import {HttpRequest} from "@node-mvc-decorator/core";

class ExpressRequest extends HttpRequest<express.Request> {
    get headers(): IncomingHttpHeaders {
        return this.request.headers;
    }
    get body(): any {
        return this.request.body;
    }

    get params(): any {
        return this.request.params;
    }

    get query(): any {
        return this.request.query;
    }

}

export {ExpressRequest};
