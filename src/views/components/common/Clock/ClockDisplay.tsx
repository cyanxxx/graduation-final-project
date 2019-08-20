import * as React from 'react';

// import './Clock.scss'
import './clock.scss';
interface Props {
  time: Date;
  domStyle: string;
  area: string;
}
export default function ClockDisplay({ time, domStyle, area }: Props) {
  const hours = time.getHours();
  return (
    <div>
      <span className={domStyle}>
        {area}:{hours}:{time.getMinutes()}
        {hours >= 12 ? ' p.m' : ' a.m'}
      </span>
    </div>
  );
}
