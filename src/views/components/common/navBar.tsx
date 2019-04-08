import * as React from 'react';
import { Link } from 'react-router-dom';

type LinkSpec = { to: string, label: string, icon?: string, color?: string, background?: string};
interface Props {
    spec: LinkSpec
}
export function LrNav(props:Props) {
    const { spec } = props
    return (
        <Link style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            background: spec.background,
            color: spec.background? '#fff':'',
            cursor:'pointer'	
        }}
            to={spec.to}
            className="withLine"
            >
           
            <svg style={{ color: spec.color }} className="icon-svg" aria-hidden="true">
                <use xlinkHref={`#icon-${spec.icon}`}></use>
            </svg>
           
            {spec.label}
        </Link>
    )
}


export function UdNav(props: Props) {
    const { spec } = props
    return (
        <Link style={{
            flex: 1,
            padding: '10px',
            cursor: 'pointer',
            color: spec.background ? '#fff' : ''
        }}
            to={spec.to}
        >

            <svg style={{ color: spec.color, width: '2.5rem', height: '2.5rem' }} className="icon-svg" aria-hidden="true">
                <use xlinkHref={`#icon-${spec.icon}`}></use>
            </svg>

            <p className='has-text-grey is-size-7-mobile'>{spec.label}</p>
        </Link>
    )
}