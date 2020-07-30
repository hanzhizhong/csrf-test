const express=require('express')
const app=express()
//const cookieParser=require('cookie-parser')
const session=require('express-session')
const bodyParser=require('body-parser')
const csrf=require('csurf')

/* const csrfProtection=csrf({cookie:{
    key:'aaa',
    path:'/',
    maxAge:10000
}}) */

const csrfProtection=csrf()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//app.use(cookieParser())
app.use(session({
    name:'ssss',
    secret:'helo',
    cookie:{
        maxAge:10000
    },
    saveUninitialized:true,
    resave:false
}))

app.get('/form',csrfProtection,(req,res)=>{
    //res.json({csrfToken:req.csrfToken()}) cookie:true时的获取token的方法
    res.json({csrfToken:req.session.csrfSecret})
})

app.post('/process',csrfProtection,(req,res)=>{
    res.send('data is being processed')
})

//抛出csrf的错误处理
app.use((err,req,res,next)=>{
    if(err.code!=='EBADCSRFTOKEN') return next(err)
    res.status(403)
    res.send('csrf验证失败')
})

app.listen(8082,()=>{
    console.log('server is running at port 8082')
})