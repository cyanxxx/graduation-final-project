export function debounce(cb: Function) {
  let timer: number;
  return function(this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    timer = window.setTimeout(cb.apply.bind(cb, this, args), 500);
  };
}
