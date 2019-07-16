
import {IncomingHttpHeaders, IncomingMessage} from "http";
import {CoreRequest} from "@node-mvc-decorator/core";
import * as url from "url";

class HttpRequest extends CoreRequest<IncomingMessage> {
    get headers(): IncomingHttpHeaders {
        return this.request.headers;
    }

    get body(): any {
        var body = [];
        this.request.on("data", chunk => body.push(chunk))
            .on("end", () => console.log(Buffer.concat(body).toString()));
        // return this.request.;
        return (async () => {
            return await new Promise((resovle, reject) => {
                var body = [];
                this.request.on("data", chunk => body.push(chunk))
                    .on("end", () => resovle(Buffer.concat(body).toString()))
                    .on("error", () => reject('rrrrrrrrrrrr'));
            });
        })();
    }

    get params(): any {
        return {};
    }

    get query(): any {
        return url.parse(this.request.url, true).query;
    }

}

export {HttpRequest};
