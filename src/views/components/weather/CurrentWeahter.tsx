import * as React from 'react';
import ChoiceWearher from './ChoiceWeather'
import Modal from '../common/Modal';
import { Core } from '../../../core/index';
import { APIGet } from '../../../config/api';
import { Card } from '../common/card';
interface Props {
    core: Core,
    simple: boolean
}

interface State {
    data: APIGet['/weather']['res'],
    open: boolean
}

export default class CurrentWeather extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            data: {
                temp: 0,
                icon: '',
                city: 'Guangzhou',
                description: ''
            },
            open: false
        }
    }
    async componentDidMount() {
        const json = await this.getWeather(this.state.data.city) as APIGet['/weather']['res']
        json && this.setState({ data: json })
    }
    async getWeather(city: string) {
        const city_name = decodeURIComponent(city)
        return this.props.core.db.get('/weather',{city: city_name})
    }
    switchCity = () => {
        const cur = !this.state.open
        this.setState({open: cur})
    }
    cityHandle = async(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const target = e.target as HTMLElement
        this.setState({ open: false })
        const json = await this.getWeather(target.getAttribute('data-name') as string) as APIGet['/weather']['res']
        json.city = target.textContent as string
        this.setState({ data: json})
    }
    renderDetail() {
        const { temp, icon, city, description, temp_min, temp_max, sunrise, sunset, humidity, wind_speed} = this.state.data
        const { open } = this.state
        const icon_src = this.props.core.db.getStaticURL() + 'weather/' + icon + '.png'
        return <figure style={{width: '100%'}}>
            <Card>
                <img style={{ display: 'block' }} src={icon ? icon_src : undefined} alt={description} />
                <div className="info">
                    <p style={{ cursor: 'pointer', textDecoration:'underline '}} onClick={this.switchCity} data-name={city}>{city === 'Guangzhou' ? '广州' : city}</p>
                    <p>当前温度：{temp}°C</p>
                    <p>最低温度：{temp_min}°C</p>
                    <p>最高温度：{temp_max}°C</p>
                    <p>日出：{sunrise? new Date(sunrise! * 1000).getHours() + ':' +  new Date(sunrise! * 1000).getMinutes() : 0}</p>
                    <p>日落：{sunset? new Date(sunset! * 1000).getHours() + ':' + new Date(sunset! * 1000).getMinutes() : 0}</p>
                    <p>湿度：{humidity? humidity: 0}%</p>
                    <p>风级：{wind_speed? wind_speed: 0}千米/秒</p>
                </div>
            </Card>
            
            {open ? <Card><ChoiceWearher style={{ height: '50vh', 'background': '#fff' }} onChoice={this.cityHandle}></ChoiceWearher></Card> : ''}
        </figure>
    }
    renderSimple() {
        const { temp, icon, city, description } = this.state.data
        const { open } = this.state
        const icon_src = this.props.core.db.getStaticURL() + 'weather/' + icon + '.png'
        return  < figure >
                <img style={{ verticalAlign: 'middle' }} src={icon ? icon_src : undefined} alt={description} />
                <div style={{ display: 'inline-block', verticalAlign: "middle", position: 'relative' }} className="info">
                    <p onClick={this.switchCity} data-name={city}>{city === 'Guangzhou' ? '广州' : city}</p>
                    {/* <p>{dec}</p> */}
                    <p>{temp}°C</p>
                </div>
                <Modal render={open} title={'天气'} pannelHandle={() => this.setState(prev => ({ open: !prev.open }))}>
                    <ChoiceWearher style={{ height: '50vh', 'background': '#fff' }} onChoice={this.cityHandle}></ChoiceWearher>
                </Modal>    
            </figure >
    }
    render() {
        const { temp, icon, city, description } = this.state.data
        
        
        return this.props.simple ? this.renderSimple() : this.renderDetail() 
           
    
    }
}