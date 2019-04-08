import React from 'react'
export function NotificationError(props: {
    children: React.ReactNode,
}) {
    return <div className="notification is-danger">
        <button className="delete"></button>
        {props.children}
    </div>;
}