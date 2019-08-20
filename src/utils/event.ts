export class EventBus<EventT> {
  public actions: ((e: EventT) => void)[] = [];
  public notify(e: EventT) {
    this.actions &&
      this.actions.forEach(event => {
        event(e);
      });
  }
  public sub(action: (e: EventT) => void) {
    this.actions.push(action);
  }
  public unsub(action: (e: EventT) => void) {
    const pos = this.actions.indexOf(action);
    if (pos !== -1) {
      this.actions.splice(pos, 1);
    }
  }
}
interface Actions<EventT> {
  [name: string]: ((e: EventT) => void)[];
}
export class EventComplexBus<EventT> {
  public actions: Actions<EventT> = {};
  public notify(name: string, e: EventT) {
    this.actions[name] &&
      this.actions[name].forEach(action => {
        action(e);
      });
  }
  public sub(name: string, action: (e: EventT) => void) {
    if (name in this.actions) {
      this.actions[name].push(action);
    } else {
      this.actions[name] = [];
      this.actions[name].push(action);
    }
  }
  public unsub(name: string, action: (e: EventT) => void) {
    if (name in this.actions) {
      const pos = this.actions[name].indexOf(action);
      if (pos !== -1) {
        this.actions[name].splice(pos, 1);
      }
    }
  }
}

export function EventFactory<EventT>(mode?: boolean) {
  if (mode) {
    return new EventComplexBus();
  } else {
    return new EventBus();
  }
}
