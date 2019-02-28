export class EventBus<EventT> {
    actions: ((e: EventT) => void)[] = []
    notify (e: EventT) {
        this.actions.forEach((event)=>{
            event(e)
        })
    }
    sub (action:(e:EventT) => void) {
        this.actions.push(action)
    }
    unsub(action: (e: EventT) => void) {
        this.actions.splice(this.actions.indexOf(action),1)
    }
}