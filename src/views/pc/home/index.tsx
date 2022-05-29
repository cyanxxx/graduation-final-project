import React, { Component } from 'react';
import Carousel from '../../components/common/Carousel';

import { Card } from '../../components/common/Card';
import Notify from './notify';

import ResRecomand from '../../components/restaurant/recomand';
import SceRecomand from '../../components/scenery/recomand';
import { componentProps } from '../../../config/route';

interface State {}
export default class PCRoute extends Component<componentProps, State> {
  constructor(props: componentProps) {
    super(props);
  }
  public render() {
    const data = [
      <img
        src="https://www.japan-travel.cn/assets_c/2021/10/b5fee5f73fafd3070a8b15506ef3440aa85a55be-thumb-1640x1050-21140.jpg"
        alt=""
      />,
      <img
        src="https://www.japan-travel.cn/assets_c/2020/03/food-thumb-1640x1050-19207.jpg"
        alt=""
      />,
      <img
        src="https://www.japan-travel.cn/assets_c/2021/06/img_covid_top_agalhe_kv-thumb-1640x1050-20982.jpg"
        alt=""
      />,
      <img
        src="https://www.japan-travel.cn/assets_c/2020/03/kyoiku-thumb-1640x1050-19754.jpg"
        alt=""
      />,
    ];
    const core = this.props.core;
    return (
      <div>
        <Carousel
          data={data}
          width={940}
          speed={300}
          interval={5000}
          windowResizeEvent={core.windowResizeEvent}
          windowVisibleEvent={core.windowVisibleEvent}
        ></Carousel>
        <div className="container">
          <Card>
            <Notify core={core}></Notify>
          </Card>
          <Card>
            <ResRecomand core={this.props.core} shrink={true}></ResRecomand>
          </Card>
          <Card>
            <SceRecomand core={this.props.core} shrink={true}></SceRecomand>
          </Card>
        </div>
      </div>
    );
  }
}
