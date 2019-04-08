import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './theme.scss';

import App from './views/index';
import { Core } from './core/index';
// const core = new Core()
// ReactDOM.render(
//     <App core={core}/>, document.getElementById("root")
// )
(async function () {
    const core = new Core();

    const root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);

    ReactDOM.render(
        <App core={core} />,
        root,
    );
})();