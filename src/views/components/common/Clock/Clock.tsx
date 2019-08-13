import * as React from 'react'
import ClockDisplay from './ClockDisplay'
interface Props {
    translateArea: string
}
interface State {
    time: Date,
    reverse: boolean
}
interface zone {
    [propertyName: string]: number
}
export default class Clock extends React.Component<Props, State>{
    constructor(props:Props) {
        super(props)
        this.state = { time: new Date(), reverse: false }
    }
    timerID:any = null
    public componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    public tick() {
        this.setState({time: new Date()})
    }
    public timeZone: zone = {
        'JP': 9,
        'CN': 8,
        'UK': 0,
        'RU': 3,
        'US': -5
    }
    public handleReverse = () => {
        this.setState({ reverse: !this.state.reverse})
    }
    public getLocalTime(translateTime: string) {
        const curTime = this.state.time;
        const localTime = this.timeZone[translateTime];
        const utc = curTime.getTime() + (curTime.getTimezoneOffset() * 60 * 1000)
        return utc + localTime * 60 * 60 * 1000;
    }
    public componentWillUnmount() {
        clearInterval(this.timerID);
    }

    public render() {
        const { reverse, time } = this.state
        const { translateArea } = this.props
        const otherTime = new Date(this.getLocalTime(translateArea))
        const smallTime = reverse? time : otherTime
        const bigTime = reverse ? otherTime : time
        const area = reverse? translateArea : 'CN'
        const rarea = reverse? 'CN' : translateArea
        return (
            <div style={{ display: 'flex' ,alignItems: 'center'}}>
                
                <div className="icon" onClick={this.handleReverse}><i style={{ transform: 'rotate(90deg)' }} className="fas fa-exchange-alt has-text-primary"></i></div>
                <div className="clock_group">
                    <ClockDisplay area={rarea} time={smallTime} domStyle='small_time' />
                    <ClockDisplay area={area} time={bigTime} domStyle='big_time' />
                </div>
            </div>
        )
    }
}