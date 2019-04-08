import React from 'react'
interface Props{
    totalPage: number,
    curPage: number,
    pageHandle: any,
}
export default function Page(props:Props) {
    const { totalPage, curPage } = props
    let arr:number[] = []
    for (let i = curPage - 2; i <= curPage + 2 && i < totalPage; i++){
        if(i<2)continue;
        arr.push(i)
    }
    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <a className={`pagination-previous ${curPage - 1 > 0 ? '' : 'hidden'}`} onClick={() => { props.pageHandle(props.curPage - 1) }}>上一页</a>
            <a className={`pagination-next ${curPage + 1 < totalPage ? '' : 'hidden'}`} onClick={() => { props.pageHandle(props.curPage + 1)}}>下一页</a>
            <ul className="pagination-list" onClick={(e)=>{
                const target = e.target as HTMLElement
                if (target.className.indexOf('pagination-ellipsis') !== -1) return;
                const page = parseInt(target.textContent!)
                console.log(page)
                props.pageHandle(page)
            }}>
                <li><a className={`pagination-link ${curPage === 1 ? ' is-current':''}`} aria-label="Goto page 1">1</a></li>
                {curPage - 2 <= 1 ? null : <li><span className="pagination-ellipsis">&hellip;</span></li>}
                {arr.map((i)=>{
                    console.log(curPage,i)
                    return <li><a className={`pagination-link ${curPage === i ? 'is-current':''}`}>{i}</a></li>
                })}
                {curPage + 2 >= totalPage ? null : <li><span className="pagination-ellipsis">&hellip;</span></li>}
                {totalPage > 1 ? <li><a className={`pagination-link ${curPage === totalPage ? ' is-current' : ''}`}aria-label={`Goto page ${totalPage}`}>{totalPage}</a></li>: null}
            </ul>
        </nav>
    )
}
