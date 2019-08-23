import React, { Component } from 'react';
import { Card } from '../common/Card';
import { componentProps, ROUTE } from '../../../config/route';
import { APIPost } from '../../../config/api';
import Alert from '../common/Alert';

interface State {
  startTime: number;
  endTime: number;
  loaction: string;
  info: string;
  transport: string;
}

export default class TripForm extends Component<componentProps, State> {
  public transport: string[];
  constructor(prop: componentProps) {
    super(prop);
    this.state = {
      startTime: 0,
      endTime: 0,
      loaction: '',
      info: '',
      transport: '',
    };
    this.transport = ['', '飞机', '新干线', '地铁', '公交', '出租车', '步行'];
  }
  public renderSelect(start: number, end: number): JSX.Element[] {
    const arr: number[] = [];
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
    return arr.map(el => {
      return (
        <option value={el} key={el}>
          {el}
        </option>
      );
    });
  }
  public handleChange = (event, status) => {
    if (status === 'start') {
      this.setState({ startTime: parseInt(event.target.value) });
    } else {
      this.setState({ endTime: parseInt(event.target.value) });
    }
  };
  public create = async () => {
    if (!this.state.loaction) {
      Alert({ message: '请填入地点' });
      return;
    }
    const data = {};
    for (const key in this.state) {
      if (this.state[key]) {
        data[key] = this.state[key];
      }
    }

    data['ftrip_id'] = this.props.location.state.id;
    console.log(data['ftrip_id']);
    const result = (await this.props.core.db.post(
      '/item',
      data as APIPost['/item']['req'],
    )) as APIPost['/item']['res'];
    if (!result) {
      Alert({ message: '请填入地点' });
    }

    this.props.core.history.push(ROUTE.tripList, {
      id: this.props.location.state.id,
    });
  };
  public render() {
    const { loaction, endTime, startTime, transport, info } = this.state;
    return (
      <Card>
        <div className="field">
          <label className="label">地点</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="输入目的地"
              value={loaction}
              onChange={ev => this.setState({ loaction: ev.target.value })}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">预计游玩时间</label>
          <div className="control" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="select">
              <select
                value={startTime}
                onChange={event => {
                  this.handleChange(event, 'start');
                }}
              >
                {this.renderSelect(0, 24)}
              </select>
            </div>
            <span style={{ fontSize: '16px', margin: '0 10px' }}>点 -</span>
            <div className="select">
              <select
                value={endTime}
                onChange={event => {
                  this.handleChange(event, 'end');
                }}
              >
                {this.renderSelect(startTime, 24)}
              </select>
            </div>
            <span style={{ fontSize: '16px', margin: '0 10px' }}>点</span>
          </div>
        </div>
        <div className="field">
          <label className="label">交通</label>
          <div className="control">
            <div className="select">
              <select
                value={transport}
                onChange={event => {
                  this.setState({ transport: event.target.value });
                }}
              >
                {this.transport.map((el, i) => {
                  return (
                    <option value={el} key={i}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">备注</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="备注"
              value={info}
              onChange={ev => this.setState({ info: ev.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button" onClick={this.create}>
              创建
            </button>
          </p>
        </div>
      </Card>
    );
  }
}
