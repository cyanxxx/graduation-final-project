import * as React from 'react'
interface Props {
    label?: string,
    lists: string[],
    handleSelect: any,
    icon?: string,
    val: string,
    waiting: boolean
}
interface State {

}
export default class Reastaurant extends React.Component<Props, State> {
    render(){
        const { lists, label, handleSelect, icon, val, waiting } = this.props
        return(
            <div className="field">
                {label? <label className='label'>{label}</label> : null}
                <div className={`control ${icon ? 'has-icons-left' : ''}`}>
                    <div className={`select ${waiting? 'is-loading' : ''}`} >
                        <select value={val} onChange={handleSelect}>
                            {lists.map((el)=>{
                                return <option value={el}>{el}</option>
                            })}
                        </select>
                    </div>
                    {icon ? (<div className="icon is-left"><i className={icon}></i></div>) : null}
                </div>
              
            </div>
        )
    }
}