import * as React from 'react';
import { ROUTE } from '../../config/route';

import {UdNav} from '../components/common/navBar'
interface Props {

}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
    spec: LinkSpec[];
}

export class Midnav extends React.Component<Props, State> {
    public state = {
        spec: [
            { to: ROUTE.home, label: '机票', icon: 'jipiao1', color: '#118fe4'},
            { to: ROUTE.collections, label: '住宿', icon: 'zhusu2', color: '#ffaa31' },
            { to: ROUTE.users, label: '饮食', icon: 'canting2', color: '#f35d5c'},
        ],
    };

    public handleChange = (ev, value) => {
    }

    public render = () => {
        return <nav style={{
            display: 'flex',
            textAlign: 'center'
        }}
            className="navbar">
            {this.state.spec.map((link,i)=>{
                return (<UdNav spec={link} key={i}></UdNav>)
            })}
        </nav>;
    }
}