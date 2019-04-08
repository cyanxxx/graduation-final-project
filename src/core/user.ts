import { DB } from "./db";
import { History } from 'history'
import { loadStorage, saveStorage } from "../utils/storage";
export class User{
    private db: DB;
    private history: History;
    private isLogin = false;
    private name = '';

    constructor (db:DB, history:History) {
        this.db = db;
        this.history = history;

        const token = loadStorage('token');
        const username = loadStorage('username');
        if (token) {
            this.isLogin = true;
            this.name = username;
        }
    }

    public async login(username: string, pwd: string, backPlace?: string) {
        const res = await this.db.post(`/login`, {username, password: pwd});
        if (!res) { return false; }
        this.isLogin = true;
        saveStorage('token', res.token);
        backPlace ? this.history.push(backPlace) : this.history.push('/');
        return true;
    }

    public async register (spec:{ username:string, password:string}) {
        const res = await this.db.post(`/register`, spec);
        if (!res) { return false; }
        this.isLogin = true;
        this.history.push('/');
        return true;
    }

    public isAdmin () : boolean {
        // fixme:
        return true;
    }

    public isLoggedIn () : boolean {
        return this.isLogin;
    }
    public getName () :string {
        return this.name
    }
    public setName (name: string)  {
        saveStorage('username', name);
    }
    public logout () {
        saveStorage('token', '');
        saveStorage('username', '');
        this.isLogin = false;
        console.log(this.history)
        this.history.push('/');
    }
}