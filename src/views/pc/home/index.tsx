import React, { Component } from 'react'
import Carousel from '../../components/common/Carousel'

import { Card } from '../../components/common/card'
import Notify from './notify'

import ResRecomand from '../../components/restaurant/recomand';
import SceRecomand from '../../components/scenery/recomand';
import { componentProps } from '../../../config/route';


interface State {

}
export default class PCRoute extends Component<componentProps, State> {
    constructor(props: componentProps) {
        super(props)
    }
    render() {
        const data = [
            <img src="http://www.welcome2japan.cn/assets/img/top/cover-08.jpg" alt="" />,
            <img src="http://www.welcome2japan.cn/assets/img/top/cover-09.jpg" alt="" />

        ]
        const core = this.props.core
        return (
            <div>
                <Carousel data={data} width={940} speed={300} interval={5000} windowResizeEvent={core.windowResizeEvent} windowVisibleEvent={core.windowVisibleEvent}></Carousel>
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
        )
    }
}
