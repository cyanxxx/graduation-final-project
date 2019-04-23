import React from 'react'
import {Resdata} from 'DATA'
import ItemWithIcon from '../common/ItemWithIcon'


interface Props{
    sort?: Resdata.sort[],
    location: Resdata.location[],
    selectHandler: any,
    filterSort: filter,
    changeFilter: any,
    render: any
}
enum filter{default,location,sort}
interface States{
    openPannel: boolean
}
export default class Nav extends React.Component<Props,States>{
    constructor(props:Props){
        super(props)
        this.state = {
            openPannel: false
        }
    }

  pannelHandle = (action: boolean)=>{
      this.setState(() => ({
          openPannel: action
      }));
  }
  render() {
      const {  filterSort, changeFilter } = this.props
      const {  openPannel } = this.state
      return (
          <div>
              <div className="top">
                  <div onClick={()=>{
                      this.pannelHandle(true)
                      changeFilter(filter.location)
                  }
                      }>
                      <ItemWithIcon color='#d4451d' className="icon-svg" iconName='didian' title='地区' />
                  </div>
                  <div onClick={() => {
                      this.pannelHandle(true)
                      changeFilter(filter.sort)
                  }}>
                      <ItemWithIcon color='#d4451d' className="icon-svg" iconName='canting1' title='美食' />
                  </div>
              </div>
              {filterSort === filter.default || !openPannel ? '' : this.props.render({ ...this.props,pannelHandle: this.pannelHandle,show:openPannel})}
          </div>
      )
  } 
    
}
