const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.urlencoded())
app.use(express.static('public'))
app.get('/',function(req,res){
    res.sendFile('/htmlFiles/home.html' , {root:'public'})
})
app.get('/home',function(req,res){
    res.sendFile('/htmlFiles/home.html' , {root:'public'})
})

app.get('/buttonDownShirts',function(req,res){
    res.sendFile('/htmlFiles/buttonDownShirts.html',{root:'public'})
})
app.get('/pants',function(req,res){
    res.sendFile('/htmlFiles/pant.html',{root:'public'})
})
app.get('/coOrdSets',function(req,res){
    res.sendFile('/htmlFiles/co-ordSets.html',{root:'public'})
})
app.get('/womensTops',function(req,res){
    res.sendFile('/htmlFiles/womensTops.html',{root:'public'})
})
app.get('/allProducts',function(req,res){
    res.sendFile('/htmlFiles/allProducts.html',{root:'public'})
})
app.get('/cart',function(req,res){
    res.sendFile('/htmlFiles/cart.html',{root:'public'})
})
app.get('/checkout',function(req,res){
    res.sendFile('/htmlFiles/checkout.html',{root:'public'})
})
app.post('/register',function(req,res){
    let data = req.body
    let name = data.name
    let email = data.registerEmail
    let password = data.registerPassword
    try{
        let registerString = fs.readFileSync(`../users/${email}.json`,'utf-8')
        let registerObject = JSON.parse(registerString)
        if(registerObject.email === email){
            res.send('Already registered...')
        }
    }
    catch{
        let personData = `{
            "name" : "${name}",
            "email" :"${email}",
            "password" : "${password}"
        }`
        fs.writeFileSync(`../users/${email}.json`,personData)
        res.send('register successfully...')
    }
})
app.post('/login',function(req,res){
    let data = req.body
    let logEmail = data.loginEmail
    let logPassword = data.loginPassword
    try{
        let registerString = fs.readFileSync(`../users/${logEmail}.json`,'utf-8')
        let registerObject = JSON.parse(registerString)
        if(registerObject.email === logEmail && registerObject.password === logPassword){
            res.send('Login successfully...')
        }
        else if(registerObject.email === logEmail){
            res.send('Invalid Password')
        }
        else if(registerObject.password === logPassword){
            res.send('Invalid Email')
        }
        else{
            res.send('Invalid Email and Password')
        }
    }
    catch{
        res.send('register before login')
    }

})
app.listen(80,'127.0.0.1',()=>{
    console.log("runnin on 80...........")
})



