import Modal from '../common/Modal';
import { Resdata } from 'DATA';
import React, { Component } from 'react';
const imgs = require('./location_images.json');
interface Props {
  sort?: Resdata.sort[];
  location: Resdata.location[];
  selectHandler: any;
  filterSort: filter;
  changeFilter: any;
  pannelHandle: any;
  show: boolean;
}
enum filter {
  default,
  location,
  sort,
}
interface State {}
export default class NavBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  renderMenu() {
    const { show, pannelHandle, sort, selectHandler } = this.props;
    return (
      <Modal render={show} pannelHandle={pannelHandle} title={'美食'}>
        <ul>
          {sort!.map(el => {
            return (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #dcdcdc',
                }}
              >
                <div style={{ flex: '4 4 0', marginRight: 10 }}>
                  <div className="image is-2by1 center">
                    <img src={el.thumbnail} alt="" />
                    <div className="middle">{el.name}</div>
                  </div>
                </div>

                <div className="tags" style={{ flex: '6 6 0' }}>
                  {el.subSort.map(lst => {
                    return (
                      <span
                        className="tag"
                        key={lst.id}
                        data-id={lst.id}
                        onClick={() => {
                          this.props.pannelHandle(false);
                          selectHandler(lst.id, lst.name);
                        }}
                      >
                        {lst.name}
                      </span>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </Modal>
    );
  }
  renderLocation() {
    const { show, pannelHandle, location, selectHandler } = this.props;
    return (
      <Modal render={show} pannelHandle={pannelHandle} title={'地区'}>
        <ul>
          {location!.map(el => {
            return (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #dcdcdc',
                }}
              >
                <div className="main center" style={{ flex: '3 4 0', marginRight: 10 }}>
                  <div className="image is-4by3 center">
                    <img src={`http://68.168.136.230:8000${imgs[el.name]}`} alt="" />
                    <div className="middle">{el.cn_name}</div>
                  </div>
                </div>
                <div className="sub tags" style={{ flex: '7 6 0' }}>
                  {el.children.map(item => {
                    return (
                      <div
                        className="tag"
                        key={item.id}
                        data-id={item.id}
                        onClick={() => {
                          this.props.pannelHandle(false);
                          selectHandler(item.id, item.name);
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </Modal>
    );
  }
  render() {
    const { filterSort } = this.props;
    console.log(imgs);
    return <div>{filterSort === filter.sort ? this.renderMenu() : this.renderLocation()}</div>;
  }
}
