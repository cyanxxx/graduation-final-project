export class EventBus<EventT>{
    actions: ((e: EventT) => void)[] = []
    notify (e: EventT) {
        this.actions && this.actions.forEach((event)=>{
            event(e)
        })
    }
    sub (action:(e:EventT) => void) {
        this.actions.push(action)
    }
    unsub(action: (e: EventT) => void) {
        let pos = this.actions.indexOf(action)
        if (pos !== -1){
            this.actions.splice(pos, 1)
        }
    }
}
interface Actions<EventT> {
    [name: string]: ((e: EventT) => void)[],
}
export class EventComplexBus<EventT>{
    
    actions: Actions<EventT> = {}
    notify(name: string,e: EventT) {
        this.actions[name] && this.actions[name].forEach((action)=>{
            action(e)
        })
    }
    sub (name:string,action:(e:EventT) => void) {
        if (name in this.actions){
            this.actions[name].push(action)
        }else{
            this.actions[name] = []
            this.actions[name].push(action)
        }
        
    }
    unsub(name:string,action: (e: EventT) => void) {
        if (name in this.actions) {
            const pos = this.actions[name].indexOf(action)
            if (pos !== -1) {
                this.actions[name].splice(pos, 1)
            }
        }
    }
}

export function EventFactory<EventT>(mode?: boolean) {
   if(mode){
    return new EventComplexBus()
   }else{
       return new EventBus()
   }
        
}
