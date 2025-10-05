const Hashpassward = require('bcrypt')

const Hashotp = async({value})=>{
    const res = await Hashpassward.hash(value , 10)
    return res 
}

module.exports = Hashotp