const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passowrdHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('name phone email');

    if(!user) {
        res.status(500).json({message: 'O Usuário com este ID não foi encontrada.'})
    } 
    res.status(200).send(user);
})

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('Não pode ser criada a categoria')

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    
    if(!user) {
        return res.status(400).send('O usuário não foi encontrado');
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
       const token = jwt.sign(
        {
            userId: user.id 
        },
        secret,
        {expiresIn : '1d'}
       )
        res.status(400).send({user: user.email, token: token})
    } else{
        res.status(400).send('Senha está Errada!');
    }

})

module.exports =router;