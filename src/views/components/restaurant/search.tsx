import * as React from 'react'
import Select from '../common/select'
interface Props{

}
interface State{
    location: string,
    localList: [],
    locateWaiting:boolean,
    sort: string,
    sortWaiting: boolean,
    sortList: []
}
export default class  Search extends React.Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state = {
            location: '',
            localList: [],
            sort:'',
            locateWaiting: false,
            sortWaiting: false,
            sortList: []
        }
    }
    async componentWillMount() {
        //await fecth()
    }
    sendAjax = (e)=>{
        const val = e.target.value as string
        this.setState({ locateWaiting: true })
        this.setState({ location: val })
    }
    render() {
        const { location, sort, locateWaiting, sortWaiting } = this.state
        return(
            <div>
                <div className='searchBox'>
                    <Select lists={['1', '2']} val={location} handleSelect={this.sendAjax} icon={'fas fa-map-marker-alt'} waiting={locateWaiting}></Select>
                    <Select lists={['1', '2']} val={sort} handleSelect={this.sendAjax} icon={'fas fa-utensils'} waiting={sortWaiting}></Select>
                </div>
                <div className="searchBody">
                    
                </div>
            </div>
        )
    }
}