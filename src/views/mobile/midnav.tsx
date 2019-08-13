import * as React from 'react';
import { ROUTE } from '../../config/route';

import { UdNav } from '../components/common/NavBar'
interface Props {

}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
    spec: LinkSpec[];
}

export class Midnav extends React.Component<Props, State> {
    public state = {
        spec: [
            { to: ROUTE.scenery, label: '景点', icon: 'jingdian', color: '#118fe4'},
            { to: ROUTE.travels, label: '路线', icon: 'zhusu2', color: '#ffaa31' },
            { to: ROUTE.restaurant, label: '饮食', icon: 'canting2', color: '#f35d5c'},
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