import React, { Component } from 'react'
import Slider from '../common/Slider';
import { Resdata, APIGet } from '../../../config/api'
import { Core } from '../../../core/index';
interface Props {
    core: Core,
    shrink?: boolean
}
interface State {
    data: Resdata.scenerySpot[],
}
export default class Recomand extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            data: []
        }
    }
    renderInfo(data: Resdata.scenerySpot, key?: number) {
        return (
            <div className="info" key={key}>
                <div className="img_container" style={{ backgroundImage: `url(${data.img}) ` }}></div>
                <p style={{ fontWeight: 'bold' }}>
                    {data.title}
                </p>
            </div>
        )
    }
    async getNewData() {
        const data = await this.props.core.db.get('/scenery/recommand', undefined) as APIGet['/scenery/recommand']['res']
        if (data) {    
            this.setState({
                data: data
            })
        }

    }
    componentDidMount() {
        this.getNewData()
    }
    render() {
        const { data } = this.state
        return (
            <Slider title={'景点推荐'} linkMore={'/scenery'} shrink={this.props.shrink}>
                {data.map((item, i) => {
                    return this.renderInfo(item, i)
                })}
            </Slider>

        )
    }
}
