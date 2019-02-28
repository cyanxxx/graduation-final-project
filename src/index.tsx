import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './theme.scss';
import App from './views/index';
import { Core } from './core/index';
const core = new Core()
ReactDOM.render(
    <App core={core}/>, document.getElementById("root")
)
