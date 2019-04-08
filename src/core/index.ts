import { DB } from './db'
import { EventFactory } from '../utils/event'
import { debounce } from '../utils/debounce'
import { Swipe } from './swipe'
import { createBrowserHistory } from 'history';
import { History } from 'history';
import { User } from './user'
export class Core{
    public db: DB;
    public user: User;
    public windowScrollEvent: any;
    public windowResizeEvent: any;
    public windowVisibleEvent: any;
    public windowSlideDownEvent: any;
    history: History;
    
    
    constructor(){
        //Swipe()
       
        this.history = createBrowserHistory();
        this.db = new DB()
        this.user = new User(this.db, this.history)
        this.windowResizeEvent = EventFactory<void>();
        this.windowVisibleEvent = EventFactory<void>(true);
        this.windowScrollEvent = EventFactory<void>();
        this.windowSlideDownEvent = EventFactory<void>();
        window.addEventListener('resize', debounce(() => {
            this.windowResizeEvent.notify(undefined);
        }));
        window.addEventListener('visibilitychange', () => {
            console.log(document.visibilityState)
            if(document.visibilityState == 'hidden') {
                this.windowVisibleEvent.notify('hidden')
            }else{
                this.windowVisibleEvent.notify('open')
            }
        });
        window.addEventListener('scroll', debounce(() => {
            this.windowScrollEvent.notify(undefined);
        }));
        document.addEventListener('slideDown', debounce(() => {
            this.windowSlideDownEvent.notify(undefined);
        }));
    }
}