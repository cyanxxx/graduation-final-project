import * as React from 'react';

export function Card(props: {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    className?: string;
    ref?: (el: HTMLDivElement | null) => void;
}) {
    return <div className={`card ${props.className || ''}`}
        ref={(el) => props.ref && props.ref(el)}
        style={Object.assign({
            margin: '10px',
            padding: '10px',
            position: 'relative',
        }, props.style || {})}>

        {props.children}

    </div>;
}