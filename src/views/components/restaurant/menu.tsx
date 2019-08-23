import React, { Component } from 'react';
import { Core } from '../../../core';
import { APIGet } from '../../../config/api';

import MenuItem from './menuItem';
import Search from '../common/Search';
import Nav from './nav';
import { preload } from '../../../utils/preloading';

interface PageConfig {
  curPage: number;
  hasNext: boolean;
  core: Core;
  getDataHandle: any;
  totalPage: number;
}
interface Props {
  category?: category;
  core: Core;
  render: (PageConfig) => React.ReactElement<HTMLDivElement>;
  Item: any;
}
interface States {
  category: category;
  data: APIGet['/restaurant/list']['res']['results'];
  page: number;
  sort: APIGet['/restaurant/sort']['res'];
  location: APIGet['/restaurant/location']['res'];
  filter: filter;
  canNext: boolean;
  totalPage: number;
}
enum filter {
  default,
  location,
  sort,
}
type category = {
  id: string;
  name: string;
};
export default class Menu extends Component<Props, States> {
  public loading: boolean;
  constructor(props: Props) {
    super(props);
    this.state = {
      category: this.props.category || {
        id: 'RSFST03001',
        name: '美食',
      },
      data: [],
      page: 1,
      sort: [],
      location: [],
      filter: filter.default,
      canNext: true,
      totalPage: 1,
    };
    //当前是否在加载中
    this.loading = false;
  }

  public async getNewData(p?: number, category?: category) {
    const { page, canNext } = this.state;
    if ((p && p === page) || (p === page + 1 && !canNext)) {
      return;
    }
    if (!this.loading) {
      this.loading = true;
      const query = (category && category.id) || this.state.category.id;
      const page = p || this.state.page;
      const data = (await this.props.core.db.get('/restaurant/list', {
        id: query,
        page: page,
      })) as APIGet['/restaurant/list']['res'];
      this.loading = false;
      this.setState({
        canNext: !!data.next,
        totalPage: Math.ceil(data.count / 10),
      });
      return data;
    } else {
      return;
    }
  }
  public async getSortData() {
    const data = (await this.props.core.db.get(
      '/restaurant/sort',
      undefined,
    )) as APIGet['/restaurant/sort']['res'];
    this.setState({
      sort: data,
    });
  }
  public async getLocationData() {
    const data = (await this.props.core.db.get(
      '/restaurant/location',
      undefined,
    )) as APIGet['/restaurant/location']['res'];
    this.setState({
      location: data,
    });
  }
  public async componentDidMount() {
    this.getSortData();
    this.getLocationData();
    const data = (await this.getNewData()) as APIGet['/restaurant/list']['res'];
    this.setState({
      data: data.results,
    });
    preload();
  }
  public dataConcat = async nextPage => {
    const newData = (await this.getNewData(nextPage)) as APIGet['/restaurant/list']['res'];
    this.setState(preState => ({
      data: preState.data.concat(newData.results),
      page: nextPage,
    }));
    preload();
  };
  public dataRefresh = async nextPage => {
    const newData = await this.getNewData(nextPage);
    if (newData) {
      this.setState({
        data: newData.results,
        page: nextPage,
      });
    }
    preload();
  };
  public filterHandle = choiceFilter => {
    this.setState({
      filter: choiceFilter,
    });
  };
  public changeCategory = async (id, name) => {
    const category = {
      id: id,
      name: name,
    };
    const data = (await this.getNewData(undefined, category)) as APIGet['/restaurant/list']['res'];
    this.setState({
      category: category,
      data: data.results,
    });
  };
  public searchHandle = async value => {
    const data = await this.props.core.db.get('/restaurant/list', {
      search: value,
    });
    if (data) {
      this.setState({
        data: data.results,
        canNext: !!data.next,
        totalPage: Math.ceil(data.count / 10),
      });
    }
  };
  public render() {
    const { Item } = this.props;
    const { data, sort, filter, location, page, totalPage } = this.state;
    return (
      <div>
        <Search handleChange={this.searchHandle}></Search>
        <Nav
          changeFilter={this.filterHandle}
          filterSort={filter}
          sort={sort}
          location={location}
          selectHandler={this.changeCategory}
          render={config => <Item {...config} />}
        />

        {data!.map((el, i) => {
          return <MenuItem data={el} key={i} isPhone={false}></MenuItem>;
        })}

        {this.props.render({
          curPage: page,
          hasNext: this.state.canNext,
          core: this.props.core,
          getDataHandle: this.dataConcat,
          totalPage: totalPage,
          pageHandle: this.dataRefresh,
        })}
      </div>
    );
  }
}
