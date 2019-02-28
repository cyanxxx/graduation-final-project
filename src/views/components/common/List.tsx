import * as React from 'react'
interface Props{
    title: string,
    subTitle: string,
    img_url: string,
    children: React.ReactNode
}

export default function List(props:Props){
    const { title, subTitle, img_url } = props
    return(
        <li>
            <a href="">
                <img src={img_url} alt=""/>
                <hgroup>
                    <h3>{title}</h3>
                    <h4>{subTitle}</h4>
                </hgroup>
                {props.children}
            </a>
        </li>
    )
}