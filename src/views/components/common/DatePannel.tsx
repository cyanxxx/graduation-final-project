import * as React from 'react'
import WeekPannel from './WeekPannel'
import MonthPannel from './MonthPannel'
import YearPannel from './YearPannel'
import './data.scss'
interface Props {

}
interface State {
    date: Date,
    activeDay: number,
    cur_month: number,
    cur_year: number,
    selectDay: [],
    mode: number
}
enum displayMode{
    year,month,date
}
export default class DatePannel extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        const date = new Date()
        this.state = {
            date: date,
            activeDay: date.getDate(),
            cur_month: date.getMonth(),
            cur_year: date.getFullYear(),
            selectDay: [],
            mode: displayMode.date
        }
    }
    selectDate = (ev:Event) => {
        const target = ev.target as HTMLElement
        target.classList.add('is-primary')
    }
    changeMonth = (month:number, year:number)=>{
        if(month < 0) {
            this.setState({ cur_year: year - 1, cur_month: 12})
            return;
        }
        if(month > 12) {
            this.setState({ cur_year: year + 1, cur_month: 1 })
            return;
        }
        this.setState({cur_month: month,mode: displayMode.date})
    }
    changeYear = (year:number) =>{
        this.setState({ cur_year: year, mode: displayMode.date})
    }
    render() {
        const { date, cur_month, cur_year, mode } = this.state
        var pannl:JSX.Element
        switch (mode) {
            case displayMode.year:
                pannl = <YearPannel cur_year={cur_year} choiceYear={this.changeYear}></YearPannel>
                 break
            case displayMode.month:
                pannl = <MonthPannel cur_month={cur_month} choiceMonth={this.changeMonth}></MonthPannel>
                break
            default:
                pannl = <WeekPannel cur_month={cur_month} cur_year={cur_year} today={date} choiceDay={this.selectDate}></WeekPannel>
                break
        }
        return (
            <div>
                <div className="header">
                    <div onClick={() => this.changeYear(cur_year - 1)}>&lt;&lt;</div>
                    <div onClick={() => this.changeMonth(cur_month-1, cur_year)}>&lt;</div>
                    <div>
                        <span onClick={()=>this.setState({mode: displayMode.year})}>{cur_year}年</span>
                        <span onClick={()=>this.setState({mode: displayMode.month})}>{cur_month + 1}月</span>
                    </div>
                    <div onClick={() => this.changeMonth(cur_month + 1, cur_year)}>&gt;</div>
                    <div onClick={() => this.changeYear(cur_year + 1)}>&gt;&gt;</div>
                </div>
                <div className="body">    
                    {pannl}
                </div>
            </div>
        )
    }
}