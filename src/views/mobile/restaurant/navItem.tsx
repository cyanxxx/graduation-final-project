import React, { Component } from 'react';
import { Resdata } from 'DATA';
interface Props {
  sort?: Resdata.sort[];
  location: Resdata.location[];
  selectHandler: any;
  filterSort: filter;
  changeFilter: any;
  pannelHandle: any;
}
enum filter {
  default,
  location,
  sort,
}
interface States {
  subSort: Resdata.detailSort[];
  subLocation: Resdata.detailLocation[];
  currentSort: string;
  currentLocation: string;
}
export default class NavItem extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      subSort: [],
      subLocation: [],
      currentSort: '',
      currentLocation: '',
    };
  }
  public renderMenu() {
    const { sort, selectHandler } = this.props;
    const { subSort, currentSort } = this.state;
    return (
      <div className="menuBox" style={{ display: 'flex' }}>
        <div className="lm">
          {sort!.map(el => {
            return (
              <div
                className={`sort ${currentSort === el.id ? 'active' : ''}`}
                key={el.id}
                onClick={() => {
                  this.setState({
                    subSort: el.subSort,
                    currentSort: el.id,
                  });
                }}
              >
                {el.name}
              </div>
            );
          })}
        </div>
        <div className="rd" style={{ background: '#eee' }}>
          {subSort.map(item => {
            return (
              <div
                className="detailSort"
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
      </div>
    );
  }
  public renderLocation() {
    const { selectHandler, location } = this.props;
    const { currentLocation, subLocation } = this.state;
    return (
      <div className="menuBox" style={{ display: 'flex' }}>
        <div className="lm">
          {location!.map(el => {
            return (
              <div
                className={`sort ${currentLocation === el.name ? 'active' : ''}`}
                key={el.name}
                onClick={() => {
                  this.setState({
                    subLocation: el.children,
                    currentLocation: el.name,
                  });
                }}
              >
                {el.cn_name}
              </div>
            );
          })}
        </div>
        <div className="rd" style={{ background: '#eee' }}>
          {subLocation.map(item => {
            return (
              <div
                className="detailSort"
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
      </div>
    );
  }
  public render() {
    const { filterSort } = this.props;
    return <div>{filterSort === filter.sort ? this.renderMenu() : this.renderLocation()}</div>;
  }
}
