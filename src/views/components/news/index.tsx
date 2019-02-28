import React, { Component } from 'react'
import { APIGet } from '../../../config/api';
enum STATUS {NEWS, ACTIVITY}
interface Props {
    status: STATUS,
    newsData: APIGet['/news']['res']['data'],
    activityData: APIGet['/activity']['res']['data']
}
interface State {
    
}
export default class News extends Component<Props,State> {
    constructor(props:Props) {
        super(props)
        
    }
    renderNews() {
        return (
            this.props.newsData.map((el)=>{
                return(
                    <a className="panel-block" href={el.url} style={{ display: 'flex' }}>
                        <span style={{ flex: '3 1 0' }} className='is-size-7'>{el.date}</span>
                        <span style={{ flex: '7 1 0' }} className='is-size-7'>{el.title}</span>
                    </a>
                )
            })
        )
    }
    renderActivity() {
        return (
            this.props.activityData.map((el) => {
                return (
                    <a className="panel-block" href={el.id} style={{ display: 'flex' }}>
                        <span style={{ flex: '3 1 0' }} className='is-size-7'>{`${el.start_date}${el.end_date? '-' + el.end_date: ''}`}</span>
                        <span style={{ flex: '5 1 0' }} className='is-size-7'>{el.title}</span>
                        <span style={{ flex: '2 1 0' }} className='is-size-7'>{el.location}</span>
                    </a>
                )
            })
        )
    }
    
    render() {
        const { status } = this.props
        const content = status === STATUS.NEWS ? this.renderNews() : this.renderActivity()
        return (
            <div>
                {content}
            </div>
        )
  }
}