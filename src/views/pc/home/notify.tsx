import React, { Component } from 'react';
enum STATUS {
  NEWS,
  ACTIVITY,
}
import { Core } from '../../../core/index';
import { APIGet } from '../../../config/api';
import Pheader from './loaction';
import Pcontent from '../../components/news/index';
interface Props {
  core: Core;
}
interface State {
  titles: string[];
  currentStatus: STATUS;
  newsData: APIGet['/news']['res'];
  activityData: APIGet['/activity']['res'];
}

export default class Notify extends Component<Props, State> {
  public height: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      titles: ['最新信息', '最新活动'],
      currentStatus: STATUS.NEWS,
      newsData: [],
      activityData: [],
    };
    this.height = 0;
  }
  public componentWillMount() {
    console.log(window.innerHeight);
    this.height = window.innerHeight * 0.3;
  }
  public async componentDidMount() {
    const info = await this.props.core.db.get('/news', undefined);
    info ? this.setState({ newsData: info }) : null;
    const activity = await this.props.core.db.get('/activity', undefined);
    activity ? this.setState({ activityData: activity }) : null;
  }
  public handleStatus = (i: number) => {
    this.setState({
      currentStatus: i,
    });
  };
  public render() {
    const { titles, currentStatus, newsData, activityData } = this.state;
    return (
      <nav className="panel">
        <Pheader
          titles={titles}
          currentStatus={currentStatus}
          changeStatus={this.handleStatus}
        ></Pheader>
        <Pcontent newsData={newsData} activityData={activityData} status={currentStatus}></Pcontent>
      </nav>
    );
  }
}
