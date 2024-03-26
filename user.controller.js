const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./user.model')


async function createOne(req, res) {
    console.log("UserController@createOne");
    let data = _.pick(req.body, ['name', 'email', 'password', 'dept'])
    data.password = await bcryptjs.hash(data.password, 10)

    let user = await User.findOne({ email: data.email })
    if (!user) {
        let user = await User.create(data)
        if (!user) {
            res.send({ statusCode: 400, msg: 'Unable to create', data: false })
        }
        res.send({ statusCode: 200, msg: 'Successfully created', data: user })
    } else {
        res.send({ statusCode: 201, msg: 'email already exists' })
    }
}

async function login(req, res) {
    console.log("UserController@login");
    let data = _.pick(req.body, ['email', 'password'])

    let user = await User.findOne({ email: data.email })

    if (user) {
        let comparePassword = await bcryptjs.compare(data.password, user.password)

        if (comparePassword) {

            let token = await jwt.sign({ userId: user._id, name: user.name, role: user.role }, 'thisismysecretkey')

            user = await User.findByIdAndUpdate(user._id, { 'token': token }, { new: true })

            res.send({ statusCode: 200, msg: 'Login Successfully', data: user })
        } else {
            res.send({ statusCode: 400, msg: 'Invalid Credentials' })
        }
    } else {
        res.send({ statusCode: 400, msg: 'User does not exists' })
    }

}

async function updateOne(req, res) {
    console.log("UserController@updateOne");
    req.body.id = req.params.id
    let data = _.pick(req.body, ['id', 'name', 'dept'])
    let token = req.headers['authorization']

    if (token) {
        jwt.verify(token, 'thisismysecretkey', function (err, decoded) {
            req.user = decoded
            if (err) {
                throw new err
            }
        });
    } else {
        res.send({ status: 400, msg: 'token is required' })
    }



    if (req.user.role !== 'admin') {
        res.send({ status: 400, msg: 'Only admin can update profile' })
    }

    let dataToUpdate = {
        name: data.name,
        dept: data.dept
    }

    let updateObj = await User.findByIdAndUpdate(data.id, dataToUpdate, { new: true })

    if (!updateObj) {
        res.send({ status: 400, msg: 'Unable to update details' })
    }

    res.send({ status: 200, msg: 'Successfully updated' })

}

module.exports = {
    createOne,
    updateOne,
    login
}
