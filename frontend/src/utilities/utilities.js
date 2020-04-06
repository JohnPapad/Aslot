

export const convertListToObjectById = (list, id) => {
    let object = {}
    list.map(elem => {
        object[elem[id]] = elem;
    });

    return object;  
}
