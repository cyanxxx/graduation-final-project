import React, { Component } from 'react';
import { APIGet } from '../../../config/api';
enum STATUS {
  NEWS,
  ACTIVITY,
}
interface Props {
  status: STATUS;
  newsData: APIGet['/news']['res'];
  activityData: APIGet['/activity']['res'];
}
interface State {}
export default class News extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public renderNews() {
    return (
      <div>
        <div className="panel-block">
          <span style={{ flex: '3 1 0' }} className="is-size-7">
            活动日期
          </span>
          <span style={{ flex: '7 1 0' }} className="is-size-7">
            活动名称
          </span>
        </div>
        {this.props.newsData!.map((el, i) => {
          return (
            <a className="panel-block" href={el.url} style={{ display: 'flex' }} key={i}>
              <span style={{ flex: '3 1 0' }} className="is-size-7">
                {el.date}
              </span>
              <span style={{ flex: '7 1 0' }} className="is-size-7">
                {el.title}
              </span>
            </a>
          );
        })}
      </div>
    );
  }
  public renderActivity() {
    return (
      <div>
        <div className="panel-block">
          <span style={{ flex: '3 1 0' }} className="is-size-7">
            活动日期
          </span>
          <span style={{ flex: '5 1 0' }} className="is-size-7">
            活动名称
          </span>
          <span style={{ flex: '2 1 0' }} className="is-size-7">
            地点
          </span>
        </div>
        {this.props.activityData!.map((el, i) => {
          return (
            <a className="panel-block" href={el.id} style={{ display: 'flex' }} key={i}>
              <span style={{ flex: '3 1 0' }} className="is-size-7">{`${el.start_date}${
                el.end_date ? '~' + el.end_date : ''
              }`}</span>
              <span style={{ flex: '5 1 0' }} className="is-size-7">
                {el.title}
              </span>
              <span style={{ flex: '2 1 0' }} className="is-size-7">
                {el.location}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  public render() {
    const { status } = this.props;
    const content = status === STATUS.NEWS ? this.renderNews() : this.renderActivity();
    return <div style={{ overflowY: 'auto', maxHeight: '30vh' }}>{content}</div>;
  }
}
