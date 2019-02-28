
export type URLQuery = {[key:string]:string|number|boolean|any[]|undefined};

export function parsePath(path:string, query:URLQuery){
    let queryArr:string[] = []
    const key = Object.keys(query)
    key.forEach((el)=>{
        if(Array.isArray(query[el])){
            for(let item of query[el] as []){
                item && queryArr.push(encodeURIComponent(`${el}[]`) + '=' + encodeURIComponent(item))
            }
        }
        typeof query[el] === 'string' && queryArr.push(encodeURIComponent(el) + '=' + encodeURIComponent(query[el] as string))
        query[el] && queryArr.push(encodeURIComponent(el) + '='+ query[el])
    })
    return path+'?'+ queryArr.join('&')
}