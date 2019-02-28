import { parsePath, URLQuery } from '../utils/url'
import { APIGet } from '../config/api'
export class DB {
    host: string;
    port: number;
    protocol: string;

    constructor() {
        this.protocol = 'http'
        this.host = 'localhost';
        this.port = 8000;
    }

    _parseURL(_path:string, obj?:URLQuery) {
        const path = obj?parsePath(_path, obj): _path
        return `${this.protocol}://${this.host}:${this.port}${path}`
    }
    async get<Path extends keyof APIGet>(_path: Path, query: APIGet[Path]['req']):Promise<APIGet[Path]['res']|null> {
        try{
            const url = this._parseURL(_path, query);
            console.log('get: ' + url);
            const response = await fetch(url);
            const result = (await response.json()) as APIGet[Path]['res'];
            console.log(result)
            if(result.code === 200) {
                return result;
            }else{
                console.log('Resopon Error')
                return null;
            }
        }catch(e) {
            console.log('get error')
            return null;
        }
    }
}