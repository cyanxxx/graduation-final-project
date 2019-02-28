import React, { Component } from 'react'
enum STATUS { NEWS, ACTIVITY }
import { Core } from '../../../core';
import { APIGet } from '../../../config/api';
import Pheader  from './loaction'
import Pcontent  from '../../components/news'
interface Props {
    core: Core
}
interface State {
    titles: string[],
    currentStatus: STATUS,
    newsData: APIGet['/news']['res']['data'],
    activityData: APIGet['/activity']['res']['data']
}

export default class Notify extends Component<Props, State> {
    height: number
    constructor(props: Props) {
        super(props)
        this.state = {
            titles: ['最新新闻', '最新活动'],
            currentStatus: STATUS.NEWS,
            newsData: [],
            activityData: []
        }
        this.height = 0
    }
    componentWillMount() {
        console.log(window.innerHeight)
        this.height = window.innerHeight * 0.3
    }
    async componentDidMount() {
        const info = await this.props.core.db.get('/news', undefined)
        info && info.data ? this.setState({ newsData: info.data }) : null
        const activity = await this.props.core.db.get('/activity', undefined)
        activity && activity.data ? this.setState({ activityData: activity.data }) : null
        
    }
    handleStatus = (i:number)=>{
        this.setState({
            currentStatus: i
        })
    }
  render() {
    const {titles, currentStatus, newsData, activityData} = this.state
    return (
    <nav className="panel" style={{overflowY:"auto", height: this.height }}>
        <Pheader titles={titles} currentStatus={currentStatus} changeStatus={this.handleStatus}></Pheader>
        <Pcontent newsData={newsData} activityData={activityData} status={currentStatus}></Pcontent>
    </nav>
    )
  }
}
