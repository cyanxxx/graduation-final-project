import React, { Component } from 'react';
import { APIGet } from '../../../config/api';
import { Core } from '../../../core/index';
import List from './list';
import { preload } from '../../../utils/preloading';
interface Props {
  core: Core;
}
interface State {
  data: APIGet['/scenery/list']['res'];
}
export default class Item extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  public async componentDidMount() {
    await this.getData();
    preload();
  }
  public async getData() {
    const data = (await this.props.core.db.get(
      '/scenery/list',
      undefined,
    )) as APIGet['/scenery/list']['res'];
    this.setState({
      data: data,
    });
  }
  public render() {
    return (
      <div>
        {this.state.data &&
          this.state.data.map((el, i) => {
            return (
              <div key={i} style={{ paddingBottom: 10, borderBottom: '1px solid #eee' }}>
                <h3>{el.cn_title}</h3>
                {el.lists.map(lst => {
                  return <List {...lst} key={lst.title}></List>;
                })}
              </div>
            );
          })}
      </div>
    );
  }
}
