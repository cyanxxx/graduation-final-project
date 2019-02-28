import React, { Component } from 'react'
import Topbar from './topbar'
import Carousel from '../../components/common/Carousel'
import { Midnav } from '../midnav'
import { Ad } from './ad'
import Location from './loaction'
import { Card } from '../../components/common/card'
import { Core } from '../../../core';
import Notify from './notify'
interface Props {
  core: Core;
}

interface State {
}
export default class index extends Component<Props,State> {
  constructor(props:Props){
    super(props)
  }
  render() {
    const data = [
        <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-01.png" alt=""/>,
        <img src="http://www.welcome2japan.cn/mobile/assets/img/top/cover-02.png" alt="" />
       
    ]
    const {core} = this.props
    return (
      <div>
        <Topbar core={this.props.core}></Topbar>
        <Carousel data={data} speed={500} interval={5000} step={0}></Carousel>
        <div style={{margin:10}}>
          <Midnav></Midnav>
        </div>
          
        <Card>
          <Notify core={core}></Notify>
        </Card>
        <Card>
          <Ad></Ad>
        </Card>  
       
      </div>
    )
  }
}
