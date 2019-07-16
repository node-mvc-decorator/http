import {bootstrap} from "./lib/bootstrap";
import {Controller} from "@node-mvc-decorator/core/lib/decorators/controller";
import {GetMapping} from "@node-mvc-decorator/core/lib/decorators/get-mapping";
@Controller
export class Controller1 {

    @GetMapping
    testGet() {
        console.log(123231123);
        return 'wer';
    }
    @GetMapping('test2')
    testGet2() {
        console.log(123231123);
        return {a: 123};
    }

}

bootstrap()
    .on('listening', () => console.log('服务启动'))
    .listen(3000);
