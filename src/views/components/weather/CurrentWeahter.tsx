import * as React from 'react';
import ChoiceWearher from './ChoiceWeather'
interface Props {
    
}
interface weather {
    temp: number,
    icon: string,
    city: string,
    dec: string
}
interface State {
    data: weather,
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
                dec: ''
            },
            open: false
        }
    }
    async componentDidMount() {
        const json = await this.getWeather(this.state.data.city)
        this.setState({ data: json })
    }
    async getWeather(city: string): Promise<weather> {
        const city_name = decodeURIComponent(city)
        return fetch('http://127.0.0.1:8000/weather/' + '?city=' + city_name).then(req => req.json()).then(json => json)
         
    }
    switchCity = () => {
        const cur = !this.state.open
        this.setState({open: cur})
    }
    cityHandle = async(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const target = e.target as HTMLElement
        const json =  await this.getWeather(target.getAttribute('data-name') as string)
        json.city = target.textContent as string
        this.setState({ data: json })
    }
    render() {
        const { temp, icon, city, dec } = this.state.data
        const { open } = this.state
        const icon_src = 'http://127.0.0.1:8000/media/weather/' + icon + '.png'
        return (
            <figure>
                <img style={{verticalAlign: 'middle'}} src={icon?icon_src:undefined} alt={dec} />
                <div style={{display: 'inline-block', verticalAlign: "middle"}}className="info">
                    <p onClick={this.switchCity} data-name={city}>{city === 'Guangzhou' ? '广州' : city}</p>
                    {/* <p>{dec}</p> */}
                    <p>{temp}°C</p>
                </div>
               
                <ChoiceWearher style={{'display': open? 'block': 'none'}} onChoice={this.cityHandle}></ChoiceWearher>
            </figure>
        )
    }
}