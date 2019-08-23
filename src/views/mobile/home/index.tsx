import React, { Component } from 'react';
import Topbar from './topbar';
import Carousel from '../../components/common/Carousel';
import { Midnav } from '../midnav';
import { Ad } from './ad';
import { Card } from '../../components/common/Card';

import ResRecomand from '../../components/restaurant/recomand';
import SceRecomand from '../../components/scenery/recomand';

import { componentProps } from '../../../config/route';

interface State {}
export default class index extends Component<componentProps, State> {
  constructor(props: componentProps) {
    super(props);
  }
  public render() {
    const data = [
      <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-01.png" alt="" />,
      <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-02.png" alt="" />,
      <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-08.jpg" alt="" />,
      <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-09.jpg" alt="" />,
    ];
    const { core } = this.props;
    return (
      <div>
        <Topbar core={this.props.core}></Topbar>
        <Carousel
          data={data}
          speed={500}
          interval={5000}
          step={0}
          windowResizeEvent={core.windowResizeEvent}
          windowVisibleEvent={core.windowVisibleEvent}
        ></Carousel>
        <div style={{ margin: 10 }}>
          <Midnav></Midnav>
        </div>

        <Card>
          <ResRecomand core={this.props.core}></ResRecomand>
        </Card>
        <Card>
          <SceRecomand core={this.props.core}></SceRecomand>
        </Card>
        <Card>
          <Ad></Ad>
        </Card>
      </div>
    );
  }
}
