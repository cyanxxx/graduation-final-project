import * as React from 'react'
const city_json = require('STATIC/city_name.json')

interface Props{
    onChoice: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => Promise<void>,
    style: React.CSSProperties,
}

interface State{
    cur_area: string
}
interface json{
    [key:string]:{
        'cn_name':string,
        'city': {
            "en_name": string,
            "cn_name": string
        }[]  
    }
}

export default class ChoiceWeather extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            cur_area: 'cur_location'
        }
    }
    selectArea:any = (e:Event) => {
        const target = e.target as HTMLElement
        this.setState({cur_area: target.getAttribute('data-name') as string})
    }
    render() {
        const city:json = {...city_json,'cur_location':{'cn_name':'当前位置','city':[{'en_name':'Guangzhou','cn_name':'广州'}]}}
        const area = Object.keys(city)
        const { cur_area } = this.state
        return (
            <nav className="panel" style={this.props.style}>
                <p className='panel-tabs' onClick={this.selectArea}>
                    {area.map((el)=> {
                        return (
                            <a key={el} data-name={el}>{city[el]['cn_name']}</a>
                        )
                    }
                    )}
                </p>
                {city[cur_area]['city'].map(c => {
                    return <a className="panel-block" data-name={c['en_name']} onClick={this.props.onChoice} key={c['cn_name']}>{c['cn_name']}</a>
                })}
            </nav>
        )
    }
}