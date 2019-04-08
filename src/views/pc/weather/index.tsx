import React, { Component } from 'react'
import { componentProps } from '../../../config/route';
import CurrentWeather from '../../components/weather/CurrentWeahter';

interface State {

}
export default class Weather extends Component<componentProps, State> {
    constructor(props: componentProps) {
        super(props)
    }
    render() {
        const core = this.props.core
        return (
            <CurrentWeather core={core} simple={false}></CurrentWeather> 
        )
    }
}

