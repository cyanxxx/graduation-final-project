import React from 'react'
import ItemWithIcon from '../common/ItemWithIcon';

import { Resdata } from '../../../config/api'

import './list.scss'
import { preload } from '../../../utils/preloading';

export default function list(props: Resdata.scenerySpot) {
const { title, date, en_title, area, rank, img } = props
  return (
    <div style={{display: 'flex'}}>
      <div className="img_container preload" style={{ width: '30vw', height: '30vw', maxWidth: '200px', maxHeight: '120px' }} data-src={img}>
            <div className="rank">
                  <span>No.{rank}</span>
            </div>
        </div>
          <div className="info" style={{ width: 'calc(100% - 30vw)', display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {en_title}
            </p>
              <ItemWithIcon color='#d4451d' className="icon-svg" iconName='card' title={title} />
              <ItemWithIcon color='#d4451d' className="icon-svg" iconName='riqi2' title={date} />
              <ItemWithIcon color='#d4451d' className="icon-svg" iconName='didian' title={area} />
        </div>
    </div>
  )
}
