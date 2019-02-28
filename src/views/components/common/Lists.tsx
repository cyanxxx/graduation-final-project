import * as React from 'react'
import RestList from './RestaurantList'
interface Props {
    list_num: number,
    data: restaurant[]
}
interface restaurant {
    name: string,
    catcategory: string[],
    thumbnail: string,
    access: string,
    address: string
}
export default function Lists(props: Props) {
    const { list_num, data } = props
    return (
        <div className="lists">
            <div className="header">
               { list_num}
            </div>
            <ul className="list">
                {data.map((el)=>{
                    let catcategories = el.catcategory.length > 1 ? el.catcategory[0] : el.catcategory.join('/')
                    return <RestList title={el.name} subTitle={catcategories} img_url={el.thumbnail} address={el.address} transport={el.access}></RestList>
                })}
            </ul>
        </div>
        
    )
}