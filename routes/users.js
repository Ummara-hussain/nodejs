const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const verifyToken = require('../middleware/verifyToken')


router.get('/', verifyToken, async (req, res) => {
    const users = await Users.find()

    res.send({
        message: 'All users',
        data: users
    })
})

//fetch('https://localhost:4000/users/register')
router.post('/register', async (req, res) => {
    try {
        const credentials = req.body
        const user = new Users(credentials)
        await user.save()

        res.send({
            message: 'User Registered Successfully!'
        })
    } catch (e) {
        res.send({
            message: e
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    //Step 1: User exists karta hai ya nahi.
    const user = await Users.findOne({ email })

    if (!user) {
        res.send({
            message: "User doesn't exist!"
        })
        return
    }

    //   console.log('userExists', userExists)
    //   console.log('password', password)

    //Step 2: Check Password
    const isPasswordCorrect = user.comparePassword(password)
    console.log('isPasswordCorrect', isPasswordCorrect)

    if(!isPasswordCorrect){
        res.send({
            message: "Invalid Password"
        })
        return
    }

    //Step 3: Generate Token
    const token = user.generateToken()
    user.token = token
    await user.save()

    res.send({
        message: 'logged in succesfully',
        token
    })

})

/*
fetch('http://localhost:4000/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'fahim@gmail.com',
        password: 'exp123',
        fullname: 'Fahim'
    })
})
.then(res => res.json())
.then(res => console.log(res))
*/

module.exports = router