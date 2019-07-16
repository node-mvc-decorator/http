import {HttpResponse} from "@node-mvc-decorator/core";
import {ServerResponse} from "http";

class ExpressResponse extends HttpResponse<ServerResponse> {
    private code: number;

    send(body: any): this {
        this.response.write(body);
        this.response.end();
        return this;
    }

    status(code: number): this {
        this.code = code;
        this.response.writeHead(code);
        return this;
    }

    type(type: string): this {
        this.response.writeHead(this.code, {
            'Content-Type': type
        });
        return this;
    }

}

export {ExpressResponse};
