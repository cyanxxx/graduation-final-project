import React, { Component } from 'react'
import Slider from '../common/Slider';
import { Resdata, APIGet } from '../../../config/api'
import { Core } from '../../../core/index';
import { preload } from '../../../utils/preloading'
interface Props{
    core: Core,
    shrink?: boolean
}
interface State{
    data: Resdata.menu[],
}
export default class Recomand extends Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            data: []
        }
    }
  renderInfo(data:Resdata.menu,key:number) {
      return(
          <div className="info" key={key}>
              <div className="img_container preload" data-src={data.thumbnail}></div>
              <p style={{ fontWeight: 'bold' }}>
                  {data.name}
              </p>
              <p>{data.name_ja}</p>
          </div>
      )
  }
    async getNewData() {
        const data = await this.props.core.db.get('/restaurant/list', {hot: 1}) as APIGet['/restaurant/list']['res']
        if(data){
            this.setState({
                data: data.results
            })
        }
        
    }
    async componentDidMount() {
        await this.getNewData()
        preload()
    }
  render() {
    const { data } = this.state
    return (
        <Slider title={'美食推荐'} linkMore={'/restaurant'} shrink={this.props.shrink}>
            {data.map((item,i) => {
                return this.renderInfo(item, i)
            })}
        </Slider>
     
    )
  }
}
