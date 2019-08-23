import * as React from 'react';
import './carousel.scss';
import { EventBus, EventComplexBus } from '../../../../utils/event';
interface Props {
  data: JSX.Element[];
  speed: number;
  step?: number;
  width?: number;
  interval: number;
  windowResizeEvent: EventBus<void>;
  windowVisibleEvent: EventComplexBus<void>;
}
interface State {
  step: number;
}

export default class Carousel extends React.Component<Props, State> {
  public cloneData: JSX.Element[] = [];
  public width: number = 0;
  public maskWidth: number = 0;
  public interval!: number;
  public container: HTMLElement | null = null;
  public startX: number = 0;
  public endX: number = 0;
  public offset: number = 0;
  public drag: boolean = false;
  public atLeastDis: number = 30;
  public ani: boolean = false;
  public lastOffset: number = 0;
  public maskAble: boolean = false;
  public firstIndex: number = 0;
  public endIndex: number = 0;
  public resizeHandle: any;
  public visibleHandle: any;
  public hiddleHandle: any;
  public speed: number = 0;
  constructor(props: Props) {
    super(props);
    this.cloneData = props.data.slice(0);
    const step = this.props.step || 0;
    this.state = {
      step: step,
    };
  }
  public componentWillMount() {
    this.width = document.body.clientWidth;
    if (this.props.width && this.width - this.props.width > 0) {
      this.maskWidth = (this.width - this.props.width) / 2;
      this.maskAble = true;
    }
    this.speed = 100;
    this.createData();
  }
  public createData() {
    const { data } = this.props;
    const { step } = this.state;
    if (this.maskAble) {
      this.cloneData.push(data[0]);
      this.cloneData.push(data[1]);
      this.cloneData.unshift(data[data.length - 1]);
      this.cloneData.unshift(data[data.length - 2]);
      this.firstIndex = 2;
      this.endIndex = this.cloneData.length - 3;
      this.setState({
        step: step + 2,
      });
    } else {
      this.cloneData.push(data[0]);
      this.cloneData.unshift(data[data.length - 1]);
      this.firstIndex = 1;
      this.endIndex = this.cloneData.length - 2;
      this.setState({
        step: step + 1,
      });
    }
  }
  public adjustLwayer() {
    this.width = document.body.clientWidth;
    if (this.props.width && this.width - this.props.width > 0) {
      this.maskWidth = (this.width - this.props.width) / 2;
    } else {
      this.maskWidth = 0;
    }
    this.translateTo(this.getSlideOffset());
    this.forceUpdate();
  }
  public componentDidMount() {
    this.container!.style.transform =
      this.maskWidth > 0
        ? `translate3d(${this.maskWidth + this.props.width! * -this.state.step}px, 0, 0)`
        : `translate3d(${this.width * -this.state.step}px, 0, 0)`;
    this.lastOffset = this.getSlideOffset();
    this.autoplay();

    function eventHandle(cb) {
      return cb;
    }

    this.resizeHandle = eventHandle(this.adjustLwayer.bind(this));
    this.props.windowResizeEvent.sub(this.resizeHandle);

    this.hiddleHandle = eventHandle(this.clearAutoplay.bind(this));
    this.props.windowVisibleEvent.sub('hidden', this.hiddleHandle);

    this.visibleHandle = eventHandle(this.autoplay.bind(this));
    this.props.windowVisibleEvent.sub('open', this.visibleHandle);
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
    this.container = null;
    this.props.windowResizeEvent.unsub(this.resizeHandle);
    this.props.windowVisibleEvent.unsub('hidden', this.hiddleHandle);
    this.props.windowVisibleEvent.unsub('open', this.visibleHandle);
  }
  public next = () => {
    const { step } = this.state;
    if (step > this.endIndex) {
      this.toggleTransition(false);
      this.setState(
        {
          step: this.firstIndex,
        },
        () => {
          this.lastOffset = this.getSlideOffset() + this.endX - this.startX;
          this.translateTo(this.lastOffset);
        },
      );

      const timer = window.setTimeout(() => {
        clearTimeout(timer);
        this.setState(
          {
            step: this.firstIndex + 1,
          },
          () => {
            this.slideTo(this.getSlideOffset());
          },
        );
      }, 1000 / 60);
    } else {
      this.setState({
        step: step + 1,
      });
      const nextSlideOffset = this.getSlideOffset(step + 1);
      this.slideTo(nextSlideOffset);
    }
  };
  public prev = () => {
    const { step } = this.state;
    if (step < this.firstIndex) {
      this.toggleTransition(false);
      this.setState(
        {
          step: this.endIndex,
        },
        () => {
          this.lastOffset = this.getSlideOffset() + this.endX - this.startX;
          this.translateTo(this.lastOffset);
        },
      );

      const timer = window.setTimeout(() => {
        clearTimeout(timer);
        this.setState(
          {
            step: this.endIndex - 1,
          },
          () => {
            this.slideTo(this.getSlideOffset());
          },
        );
      }, 16);
    } else {
      this.setState(
        {
          step: step - 1,
        },
        () => {
          const beforeSlideOffset = this.getSlideOffset();
          this.slideTo(beforeSlideOffset);
        },
      );
    }
  };
  public slideTo(to: number) {
    const from = this.lastOffset;
    const dir = Math.sign(to - from);
    const speed = this.speed;

    this.toggleTransition(true);

    const step = dt => {
      const move = dir * speed; // 正负值
      this.lastOffset += move;
      this.translateTo(this.lastOffset);
      if (move * (this.lastOffset - to) > 0) {
        // 相距-940
        this.lastOffset = to;
        this.translateTo(this.lastOffset);
        // this.forceUpdate();
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
  public autoplay = () => {
    this.clearAutoplay();
    this.interval = window.setInterval(() => {
      this.next();
    }, this.props.interval);
  };
  public clearAutoplay() {
    this.interval && clearInterval(this.interval);
    this.interval = 0;
  }
  public handleDragStart = (start: number) => {
    this.startX = this.endX = start;
    this.offset =
      this.props.width && this.maskWidth
        ? this.maskWidth + this.state.step * -this.props.width
        : this.state.step * -this.width;
    this.drag = true;
    this.toggleTransition(false);
  };
  public handleDrag = (end: number) => {
    this.endX = end;
    const dt = end - this.startX;
    this.translateTo(dt + this.offset);
  };
  public handleDragEnd = () => {
    this.toggleTransition(true);
    const dir = this.endX - this.startX;
    this.lastOffset += dir;
    if (Math.abs(dir) > this.atLeastDis) {
      if (dir > 0) {
        this.prev();
      } else {
        this.next();
      }
    } else {
      const currentSlideOffset = this.getSlideOffset();
      this.slideTo(currentSlideOffset);
    }
  };
  public getSlideOffset(index?: number) {
    const i = index === undefined ? this.state.step : index;
    const width = this.props.width || this.width;
    return this.maskWidth ? -i * width + this.maskWidth : -i * width;
  }
  public translateTo = (dis: number) => {
    this.container!.style.transform = `translate3d(${dis}px, 0, 0)`;
  };
  public toggleTransition(enable: boolean) {
    if (enable) {
      this.container!.style.transition = `all ${this.props.speed}ms linear`;
    } else {
      this.container!.style.transition = `all 0ms`;
    }
  }
  public render() {
    const { width, data } = this.props;
    const { step } = this.state;

    const maskStyle = {
      width: this.maskWidth,
    };
    return (
      <div
        className="carousel"
        onMouseEnter={() => {
          this.clearAutoplay();
        }}
        onMouseLeave={() => {
          this.autoplay();
        }}
        onTouchStart={() => {
          this.clearAutoplay();
        }}
        onTouchEnd={() => {
          window.setTimeout(() => {
            this.autoplay();
          }, 2000);
        }}
      >
        <div className="wrapper">
          <div
            className="slider_container"
            onTouchStart={ev => {
              this.ani && this.clearAutoplay();
              this.ani = false;
              this.handleDragStart(ev.touches[0].pageX);
            }}
            onTouchMove={ev => {
              this.drag && this.handleDrag(ev.touches[0].pageX);
            }}
            onTouchEnd={() => {
              this.drag = false;
              this.handleDragEnd();
            }}
            onMouseDown={ev => {
              ev.preventDefault();
              ev.stopPropagation();
              this.interval && clearInterval(this.interval!);
              this.drag = true;
              this.handleDragStart(ev.pageX);
            }}
            onMouseUp={ev => {
              ev.stopPropagation();
              this.drag = false;
              this.container!.style.cursor = '-webkit-grab';
              this.handleDragEnd();
            }}
            onMouseMove={ev => {
              ev.preventDefault();
              this.drag && this.handleDrag(ev.pageX);
            }}
            onAnimationEnd={ev => {
              this.ani = true;
            }}
            style={{ width: '100%' }}
            ref={c => (this.container = c)}
          >
            {this.cloneData.map((el, i) => {
              return (
                <div
                  className="slider"
                  style={{
                    width: `${width ? width : this.width}px`,
                    flexShrink: 0,
                  }}
                  key={i}
                >
                  {el}
                </div>
              );
            })}
          </div>
        </div>
        <div className="l_mask" style={this.maskWidth > 0 ? maskStyle : {}}></div>
        <div className="r_mask" style={this.maskWidth > 0 ? maskStyle : {}}></div>
        <div
          className="next"
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.next();
          }}
        >
          &gt;
        </div>
        <div
          className="prev"
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.prev();
          }}
        >
          &lt;
        </div>
        <div className="controls">
          {data.map((el, i) => {
            let tmpIndex = this.maskAble ? step - 2 : step - 1;
            step === this.firstIndex - 1 ? (tmpIndex = data.length - 1) : null;
            step === this.endIndex + 1 ? (tmpIndex = 0) : null;
            return <div className={`dot ${tmpIndex === i ? 'active' : ''}`} key={i}></div>;
          })}
        </div>
      </div>
    );
  }
}
