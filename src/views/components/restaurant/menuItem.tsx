import React from 'react'
import { Resdata } from '../../../config/api'
import ItemWithIcon from '../common/ItemWithIcon'
interface Props{
  data: Resdata.menu,
  isPhone: boolean,
}
export default function menuItem(props:Props) {
 
  const {data, isPhone} = props
  
  return (
    <div className='menu' style={{
        border: '1px solid #eee',
        padding: '10px 2px',
        display: 'flex',
        alignItems: 'stretch',
    }}>
      <div className="img_container" style={{width:'30vw',maxWidth:160, maxHeight:160,height: '30vw', backgroundImage: `url(${data.thumbnail}) `, backgroundSize: 'cover'}}>
        
    </div>
      
      <div className="info" style={{ width:'calc(100% - 30vw)', display: 'flex', flexDirection: 'column', marginLeft: 10}}>
        <p style={{fontWeight:'bold',fontSize:'1.5rem'}}>
          {data.name}
        </p>
          <ItemWithIcon color='#d4451d' className="icon-svg" iconName='card' title={data.name_ja} />
          <ItemWithIcon color='#d4451d' className="icon-svg" iconName='price' title={`${data.budget_lunch} - ${data.budget_default}`} />
        {isPhone ? null : <ItemWithIcon color='#d4451d' className="icon-svg" iconName='didian' title={data.access} />}
      </div>
    </div>
  )
}
