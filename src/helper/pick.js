

const pick = (reqObj, keys) => {
    console.log("reqObj, keys++++", keys);
    
    return keys.reduce((obj, k) => {
        if(reqObj && k in reqObj){
            obj[k] = reqObj[k]
        }
        return obj
    }, {})
}


module.exports = pick