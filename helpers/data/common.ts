

export const removeDuplicateObjects = ( arr: any[] ) => {
    const tmp = new Map()
    const rs = arr.reduce((acc, e) => {
    if(tmp.has(e.id)) {
        if (!tmp.get(e.id).includes(e.jobid)) {
        acc.push(e)
        tmp.set(e.id, [...tmp.get(e.id), e.jobid])
        }
    } else {
        acc.push(e)
        tmp.set(e.id, [e.jobid])
    }
    return acc
    }, [])
    return rs;
}