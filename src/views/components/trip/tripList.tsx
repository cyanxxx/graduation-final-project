import React, { Component } from 'react'
import { Card } from '../common/card';
import { APIGet } from '../../../config/api';
import { componentProps, ROUTE } from '../../../config/route';


interface State{
  data: APIGet['/trip/list']['res']
}
export default class TripList extends Component<componentProps, State> {
  constructor(props: componentProps){
    super(props),
    this.state = {
      data: []
    }
  }
  async componentDidMount(){
    if (this.props.location.state.id) {
      const data = await this.props.core.db.get('/trip/list', { id: this.props.location.state.id }) as APIGet['/trip/list']['res']
      this.setState({
        data: data
      })
    }else{
      this.props.history.push('/')
    }
    
  }
  renderItem(){
    return this.state.data[0].lst.map((el)=>{
      return (<tr>
        <td>{el['startTime']? el['startTime'] + '点 -' + el['endTime'] +'点': '暂未设定时间'}</td>
        <td>{el['loaction']}</td>
        <td>{el['transport']}</td>
        <td>{el['info']}</td>
      </tr>)
    })
  }
  toNumberDay(str) {
    let arr = str.split('-')
    let year = parseInt(arr[0])
    let month = parseInt(arr[1])
    let day = parseInt(arr[2])
    return [year, month, day]
  }
  renderTabs() {
    if (this.state.data[0] && this.state.data[0].start_date){
      let startDate = this.toNumberDay(this.state.data[0].start_date)
      const start_month = startDate[1]
      const start_day = startDate[2]
      let endDate = this.toNumberDay(this.state.data[0].end_date)
      const end_month = endDate[1]
      const end_day = endDate[2]
      let arr: string[] = []
      if (start_month < end_month) {
        let date = new Date(this.state.data[0].start_date)
        date.setMonth(start_month)
        date.setDate(0)
        let totalDay = date.getDate()
        for (let i = start_day; i <= totalDay; i++) {
          arr.push(start_month + '-' + i)
        }
        for (let i = 1; i <= end_day; i++) {
          arr.push(end_month + '-' + i)
        }
      } else {
        for (let i = start_day; i <= end_day; i++) {
          arr.push(start_month + '-' + i)
        }
      }
      return <div className="tabs" style={{ marginBottom: 0 }}>
        <ul>
          {arr.map((el,i) => {
            return <li className="" key={i}><a>{el}</a></li>
          })}
        </ul>
      </div>
    }else{
      return <div className="tabs" style={{ marginBottom: 0 }}>
        <ul>
           <li className=""><a>没安排时间</a></li>
        </ul>
      </div>
    }
    
  }
  render() {
    return (
      <Card>
        {this.renderTabs()}
        <table className='table is-striped is-fullwidth' style={{background: '#fafafa'}}>
          <thead>
            <tr>
              <th><abbr title="startTime">游玩时间</abbr></th>
              <th><abbr title="name">地点</abbr></th>
              <th><abbr title="transport">交通</abbr></th>
              <th><abbr title="info">备注</abbr></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data[0] && this.renderItem()}
            <tr>
              <td onClick={() => { this.props.core.history.push(ROUTE.createTrip,{id: this.state.data[0].id})}}>
                <button className='button'>增加</button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
     
    )
  }
}
