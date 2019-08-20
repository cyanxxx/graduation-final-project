import React, { Component } from 'react';
import { Card } from '../common/Card';
import { APIGet, Resdata } from '../../../config/api';
import { componentProps } from '../../../config/route';

interface State {
  data: APIGet['/trip']['res'];
}
export default class trips extends Component<componentProps, State> {
  constructor(props: componentProps) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    const own = this.props.location.state && this.props.location.state.own ? true : false;
    const data = (await this.props.core.db.get('/trip', {
      own: own,
    })) as APIGet['/trip']['res'];
    this.setState({
      data: data,
    });
  }
  renderList(el: Resdata.trip) {
    return (
      <Card key={el.id}>
        <header className="card-header">
          <p className="card-header-title" style={{ cursor: 'pointer' }}>
            {el.name}
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <p>游玩时间: {el.start_date ? el.start_date + '~' + el.end_date : '暂未确定'}</p>
            <p>作者: {el.author}</p>
          </div>
        </div>
      </Card>
    );
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        {this.state.data &&
          this.state.data.map(el => {
            return this.renderList(el);
          })}
      </div>
    );
  }
}
