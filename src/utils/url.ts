
export type URLQuery = {[key:string]:string|number|boolean|any[]|undefined};

export function parsePath(path:string, query:URLQuery){
    if(!query) return path;
    let queryArr:string[] = []
    const key = Object.keys(query)
    key.forEach((el)=>{
        if(Array.isArray(query[el])){
            for(let item of query[el] as []){
                item && queryArr.push(encodeURIComponent(`${el}[]`) + '=' + encodeURIComponent(item))
            }
        } else if (typeof query[el] === 'string'){
            queryArr.push(encodeURIComponent(el) + '=' + encodeURIComponent(query[el] as string))
        }else{
            query[el] && queryArr.push(encodeURIComponent(el) + '=' + query[el])
        }
        
    })
    if(queryArr.length > 0){
        return path + '/?' + queryArr.join('&')
    }else{
        return path
    }
    
}