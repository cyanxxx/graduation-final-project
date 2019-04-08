import { parsePath, URLQuery } from '../utils/url'
import { APIGet, APIPost } from '../config/api'
import { loadStorage } from '../utils/storage';
import Alert from '../views/components/common/Alert';
export class DB {
    host: string;
    port: number;
    protocol: string;

    constructor() {
        this.protocol = 'http'
        this.host = '68.168.136.230';   // for build
        this.host = '127.0.0.1';   // for dev
        this.port = 8000;
    }
    getStaticURL() {
        return `${this.protocol}://${this.host}:${this.port}/media/` 
    }
    _parseURL(_path:string, obj?:URLQuery) {
        const path = obj?parsePath(_path, obj): _path
        console.log(path)
        return `${this.protocol}://${this.host}:${this.port}${path}`
    }
    async get<Path extends keyof APIGet>(_path: Path, query: APIGet[Path]['req']):Promise<APIGet[Path]['res']|null> {
        try{
            const url = this._parseURL(_path, query);
            console.log('get: ' + url);
            const response = await fetch(url, this.genRequestInit());
            const data = (await response.json()) as APIGet[Path]['res']
            console.log(data)
            if (response.status === 200) {
                return data;
            }else{
                console.log('Resopon Error')
                return null;
            }
        }catch(e) {
            console.log('get error')
            return null;
        }
    }
    async post<Path extends keyof APIPost>(_path: Path, data: APIPost[Path]['req']): Promise<APIPost[Path]['res'] | null> {
        try {
            const url = this._parseURL(_path) + '/';
            console.log('post: ', url);
            const response = await fetch(url, this.genRequestInit({
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data || {}),
            }));
            const result = (await response.json()) as APIPost[Path]['res'];
            if (response.status === 201 || response.status === 200) {
                return result;
            } else{
                console.log('Response Error:', result);
                const msg = Object.keys(result)[0];
                Alert({ message: msg + result[msg][0]});
                return null;
            }
        } catch (e) {
            console.error('Post Error: ', e);
            return null;
        }
    }
    public genRequestInit(init: RequestInit = {}) {
        const reqInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        } as RequestInit;
        const token = loadStorage('token');
        if (token) {
            reqInit.headers!['Authorization'] = `JWT ${token}`;
        }

        for (const key in init) {
            if (key === 'headers') {
                Object.assign(reqInit.headers, init[key]);
            } else {
                reqInit[key] = init[key];
            }
        }

        return reqInit;
    }
}