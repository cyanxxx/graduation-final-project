import * as React from 'react'
import List from './List'
interface Props {
    address: string,
    title: string,
    subTitle: string,
    img_url: string,
    transport: string
}

export default function RestList(props: Props) {
    const { address, title, subTitle, img_url, transport  } = props
    return (
        <List title={title} subTitle={subTitle} img_url={img_url}>
            <p>地址:{address}</p>
            <p>交通:{transport}</p>
        </List>
    )
}