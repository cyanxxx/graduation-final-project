type Points = {
  x: number;
  y: number;
};
enum ACTION {
  START,
  MOVE,
  END,
}

export function Swipe() {
  const slideDownEvent = new CustomEvent('slideDown');
  var start: Points = {
    x: 0,
    y: 0,
  };
  var end: Points = { ...start };
  const distance: number = 5;
  function onAction(e, action) {
    const point = e.touches[0];
    switch (action) {
      case ACTION.START:
        start = {
          x: point.pageX,
          y: point.pageY,
        };
        end = { ...start };
        break;
      case ACTION.MOVE:
        end = {
          x: point.pageX,
          y: point.pageY,
        };
        break;
      case ACTION.END:
        console.log('end');
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dx) > distance || Math.abs(dy) > distance) {
          if (dy < 0) {
            document.dispatchEvent(slideDownEvent);
          }
        }
        break;
    }
  }
  window.addEventListener('touchstart', e => {
    onAction(e, ACTION.START);
  });
  window.addEventListener('touchmove', e => {
    onAction(e, ACTION.MOVE);
  });
  window.addEventListener('touchend', e => {
    onAction(e, ACTION.END);
  });
}
