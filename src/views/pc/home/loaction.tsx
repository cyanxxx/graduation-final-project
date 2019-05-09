import React from 'react'
enum STATUS { NEWS, ACTIVITY }
interface Props {
  currentStatus: STATUS,
  titles: string[],
  changeStatus:(i:number)=>void
}
interface State {
  
  
}
export default class Loaction extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  
  }
  render() {
    const { titles, currentStatus, changeStatus } = this.props
    return (
        <p className="panel-tabs">
          {titles.map((title, i) => <a key={title} 
          onClick={(ev) => {changeStatus(i)}} 
          className={currentStatus === i ? 'is-active' : ''}>{title}</a>)}
        </p>
    )
  } 
}
