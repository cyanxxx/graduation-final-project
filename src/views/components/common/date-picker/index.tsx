import React, { Component } from 'react'
import DatePannel from './DatePannel';
interface Props{
  getDate:any
}
interface State{
    open: boolean,
    startDay: string,
    endDay: string
}
export default class Index extends Component<Props,State> {
  constructor(props:Props){
    super(props)
    this.state = {
      open: false,
      startDay: '',
      endDay: ''
    }
  }
  getDate = (startDay,endDay) => {
    this.setState(((prev)=>({
      startDay: startDay || prev.startDay,
      endDay: endDay
    })),()=>{
      this.props.getDate(this.state.startDay,this.state.endDay)
    })
  
  }
  render() {
    return (
      <div>
        <label htmlFor="start_time">
          起始时间
          <input className="input" type="text" value={this.state.startDay}  name='start_time' onSelect={()=>this.setState({open: true})} />
        </label>
        <label htmlFor="end_time">
          结束时间
          <input className="input" type="text" value={this.state.endDay}  name='end_time' onSelect={() => this.setState({ open: true })} />
        </label>
        <DatePannel render={this.state.open} start_day={this.state.startDay} end_day={this.state.endDay} dateHandle={this.getDate}></DatePannel>
      </div>
    )
  }
}
