import * as React from 'react'
import './carousel.scss'
interface Props{
    data: JSX.Element[],
    speed: number,
    step?: number,
    width?: number,
    interval: number
}
interface State{
    step: number
}

export default class Carousel extends React.Component<Props, State>{
    cloneData: JSX.Element[] = [];
    width: number = 0;
    maskWidth: number = 0;
    interval!: number;
    container: HTMLElement | null = null;
    startX: number = 0;
    endX: number = 0;
    offset: number = 0;
    drag: boolean = false;
    atLeastDis: number = 30;
    ani: boolean = false;
    lastOffset: number = 0;
    constructor(props:Props){
        super(props)
        this.cloneData = props.data.slice(0)
        const step = this.props.step || 0
        this.state = {
            step: step + 2,
        }
    }
    componentWillMount() {
        const {data} = this.props
        this.cloneData.push(data[0])
        this.cloneData.push(data[1])
        this.cloneData.unshift(data[data.length-1])
        this.cloneData.unshift(data[data.length-2])
        this.width = document.body.clientWidth
        if(this.props.width && this.width - this.props.width>0){
            this.maskWidth = (this.width - this.props.width) / 2
        }
    }
    componentDidMount() {
        this.container!.style.transform = this.maskWidth > 0 ? `translate3d(${this.maskWidth + this.props.width! * -this.state.step}px, 0, 0)` : `translate3d(${ this.width * -this.state.step }px, 0, 0)`
        this.lastOffset  = this.getSlideOffset()
        this.autoplay()
    }
    componentWillUnmount() {
        clearInterval(this.interval)
        this.container = null
    }
    next = () => {
        const { step } = this.state
        if(step >= this.cloneData.length - 2){
            this.toggleTransition(false);
            this.setState({
                step: 2
            },()=>{
                this.lastOffset = this.getSlideOffset() + this.endX - this.startX;
                this.translateTo(this.lastOffset);
            })
            
            const timer = window.setTimeout(()=>{
                clearTimeout(timer)
                this.setState({
                    step: 3
                },()=>{
                    this.slideTo(this.getSlideOffset());
                })
            },16)
        }
        else{
            this.setState({
                step: step + 1
            })
            const nextSlideOffset = this.getSlideOffset(step+1);
            this.slideTo(nextSlideOffset);
        }
       
    }
    prev = () => {
        const { step } = this.state
        const trueEndIndex = this.cloneData.length - 3
        if (step <= 1) {
            this.toggleTransition(false);
            this.setState({
                step: trueEndIndex
            }, () => {
                this.lastOffset = this.getSlideOffset() + this.endX - this.startX;
                this.translateTo(this.lastOffset);
            })

            const timer =window.setTimeout(() => {
                clearTimeout(timer)
                this.setState({
                    step: trueEndIndex - 1
                }, () => {
                    this.slideTo(this.getSlideOffset());
                })
            }, 16)
        }else{
            this.setState({
                step: step - 1
            },()=>{
                const beforeSlideOffset = this.getSlideOffset();
                this.slideTo(beforeSlideOffset);
            })
        }
       
    }
    public slideTo(to: number) {
        const from = this.lastOffset;
        const dir = Math.sign(to - from);
        const speed = 20;

        this.toggleTransition(true);

        const step = (dt) => {
            const move = dir * speed;
            this.lastOffset += move;
            this.translateTo(this.lastOffset);
            if (move * (this.lastOffset - to) > 0) {
                this.lastOffset = to;
                this.translateTo(this.lastOffset);
                this.forceUpdate();
            } else {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
    autoplay = ()=>{
        this.interval = window.setInterval(() => {
            this.next()
        },this.props.interval)
    }
    handleDragStart = (start:number) => {
        this.startX= this.endX = start
        this.offset = this.props.width && this.maskWidth ? this.maskWidth + this.state.step * -this.props.width : this.state.step * -this.width
        this.drag = true
        this.toggleTransition(false);
    }
    handleDrag = (end:number) => {
        this.endX = end
        const dt = end -  this.startX
        this.translateTo(dt+this.offset)
    }
    handleDragEnd = () => {
        this.toggleTransition(true);
        const dir = this.endX - this.startX
        this.lastOffset += dir;
        if (Math.abs(dir) > this.atLeastDis) {
            if (dir > 0) {
                this.prev()
            } else {
                this.next()
            }
        } else {
            const currentSlideOffset = this.getSlideOffset();
            this.slideTo(currentSlideOffset);
        }
       
    }
    public getSlideOffset(index?: number) {
        const i = index === undefined ? this.state.step : index;
        const width = this.props.width || this.width;
        return this.maskWidth? -i * width + this.maskWidth:-i * width;
    }
    translateTo = (dis: number) => {
        this.container!.style.transform = `translate3d(${dis}px, 0, 0)`;
    }
    toggleTransition(enable: boolean) {
        if (enable) {
            this.container!.style.transition = `all ${this.props.speed}ms linear`;
        } else {
            this.container!.style.transition = `all 0ms`;
        }
    }
    render() {
        const { width,data } = this.props
        const { step } = this.state

        const maskStyle = {
            width: this.maskWidth
        }
        return (
            <div className="carousel" >
                <div className="wrapper">
                    <div className="slider_container" 
                        onTouchStart={(ev) => { this.ani && this.interval;clearInterval(this.interval!);this.ani = false;this.handleDragStart(ev.touches[0].pageX) }}
                        onTouchMove={(ev) => { this.drag && this.handleDrag(ev.touches[0].pageX) }}
                        onTouchEnd={()=>{
                            this.drag = false
                            this.handleDragEnd();
                            window.setTimeout(() => {
                                this.autoplay()
                            }, 2000);
                        }}
                        onMouseEnter={(ev) => {
                            this.interval && clearInterval(this.interval!)
                        }}
                        onMouseDown={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            this.interval && clearInterval(this.interval!)
                            this.handleDragStart(ev.pageX)
                        }}
                        onMouseUp={(ev) => {
                            ev.stopPropagation();
                            this.drag = false
                            this.container!.style.cursor = '-webkit-grab';
                            this.handleDragEnd();
                        }}
                        onMouseMove={(ev) => { ev.preventDefault();this.drag && this.handleDrag(ev.pageX) }}
                        onAnimationEnd={(ev) => {this.ani = true} }
                        onMouseLeave={() => { this.autoplay() }}
                        style={{width: '100%'}}
                        ref={(c)=>this.container = c}
                    >
                        {
                            this.cloneData.map((el, i) => {
                                return <div className="slider" style={{width: `${width? width: this.width}px`,flexShrink: 0}} key={i}>
                                    {el}
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="l_mask" style={ this.maskWidth>0? maskStyle : {}}></div>
                <div className="r_mask" style={ this.maskWidth>0? maskStyle : {}}></div>   
                <div className="next" onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.next();
                }}>&gt;</div>
                <div className="prev" onClick={(ev) => { 
                    ev.preventDefault();
                    ev.stopPropagation(); 
                    this.prev();
                }}>&lt;</div>
                <div className="controls">
                    {
                        data.map((el, i) => {
                            let tmpIndex = step - 2
                            step === 0 || step === this.cloneData.length- 2? tmpIndex = data.length-2: null
                            step === 1 || step === this.cloneData.length - 1 ? tmpIndex = data.length - 1: null
                            return <div className={`dot ${tmpIndex===i? 'active' :''}`} key={i}></div>
                        })
                    }
                </div>
            </div>
        )
    }
}