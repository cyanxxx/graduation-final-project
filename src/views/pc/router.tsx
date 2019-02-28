import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { ROUTE } from '../../config/route';
import Carousel from '../components/common/Carousel'
export class PCRoute extends Component {
    render() {
        const data = [
            <img src="http://www.welcome2japan.cn/assets/img/top/cover-08.jpg" alt="" />,
            <img src="http://www.welcome2japan.cn/assets/img/top/cover-09.jpg" alt="" />

        ]
        const h = window.innerHeight;
        return (
            <div>
            <Carousel data={data} width={1080} speed={300} interval={5000} ></Carousel>
            </div>
        )
    }
}
