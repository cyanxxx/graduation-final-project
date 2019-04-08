export function getOffset(el:HTMLElement) {
    let top = 0,left = 0
    while (el) {
        left += el.offsetLeft;
        top += el.offsetTop;
        el = el.offsetParent as HTMLElement;
    }
    return {top,left}
}