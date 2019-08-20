export function throttle(cb: Function, dalay: number) {
  let last: number;
  let timer: number;
  return function(this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    const remain = last ? dalay - (Date.now() - last) : null;
    if (remain && remain > 0) {
      timer = window.setTimeout(cb.apply.bind(cb, this, args), remain);
      last = +new Date();
      return null;
    }
    const rval = cb.apply(this, args);
    last = Date.now();
    return rval;
  };
}
