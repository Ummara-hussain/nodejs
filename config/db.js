const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://ummarahussain9:ummara123@cluster0.0jkc6qz.mongodb.net/project'

mongoose.connect(mongoURI)

module.exports = mongoose
