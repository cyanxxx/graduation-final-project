import * as React from 'react';
import { ROUTE } from '../../../config/route';

import { LrNav } from '../../components/common/navBar'
interface Props {

}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
    spec: LinkSpec[];
}

export class Ad extends React.Component<Props, State> {
    public state = {
        spec: [
            { to: ROUTE.home, label: '翻译', icon: 'fanyi', color: '#118fe4'},
            { to: ROUTE.home, label: '公交', icon: 'gongjiao', color: '#118fe4' },
        ],
    };

    public handleChange = (ev, value) => {
    }

    public render = () => {
        return <nav style={{
            display: 'flex',
            textAlign: 'center'
        }}
            >
            {this.state.spec.map((link, i) => {
                return (<LrNav spec={link} key={i}></LrNav>)
            })}
        </nav>;
    }
}