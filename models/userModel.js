const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : [true,'please enter your name']
        },
        email: {
            type : String,
            required : [true,'please enter your email']
        },
        password:{
            type: String,
            required: [true,'please enter your password']
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('user',userSchema)