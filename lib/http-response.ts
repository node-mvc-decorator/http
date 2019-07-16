import {CoreResponse} from "@node-mvc-decorator/core";
import {OutgoingHttpHeaders, ServerResponse} from "http";

class HttpResponse extends CoreResponse<ServerResponse> {

    send(body: any): this {
        if (body instanceof Object) {
            this.response.write(JSON.stringify(body));
        } else {
            this.response.write(body);
        }
        return this;
    }

    status(code: number): this {
        this.response.writeHead(code);
        return this;
    }

    type(type: string): this {
        return this.setHeader('Content-Type', type);
    }

    end() {
        this.response.end();
        return this;
    }

    setHeader(name: string, value: number | string | string[]): this {
        this.response.setHeader(name, value);
        return this;
    };
    removeHeader(name: string): this {
        this.response.removeHeader(name);
        return this;
    };
    getHeader(name: string): number | string | string[] | undefined {
        return this.response.getHeader(name);
    };
    getHeaders(): OutgoingHttpHeaders {
        return this.response.getHeaders();
    };

}

export {HttpResponse};
