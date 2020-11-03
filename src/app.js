const path=require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));
//console.log(__filename)
const app=express();
const port = process.env.PORT ||3000 ;
//Define paths for Express config
const publicDir=path.join(__dirname,'../public');

const viewsPath=path.join(__dirname,'../templetes/views')
const partialPath=path.join(__dirname,'../templetes/partials')

app.set('views',viewsPath);

hbs.registerPartials(partialPath);
//setup handlers and views location
app.set('view engine','hbs');
//setup static directory to serve
app.use(express.static(publicDir));


app.get('',(req,res) =>{
    res.render('index',{
        title:'weather app',
        name:'Andrew'
    });
})

/*-------------------------- */
/*-------------------------- */
app.get('/products',(req,res) => {
    if(!req.query.id){
       return res.send({
            error:'You must provide a serch term'
        })
    }

    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        res.send({error:'Address not provided'})
    }else{
        geocode(req.query.address,(error,data)=>{
            if(error){
                return res.send({error:error});
            }
            forecast(data.latitide,data.longitude,(e,forecastData)=>{
                if(e){return res.send({error:e})}
                res.send({
                    temperature:forecastData.temperature,
                    feelslike:forecastData.feelslike,
                    desc:forecastData.desc,
                    //forecastInfo:`It's ${desc}.Temperature in ${req.query.address} is ${temperature} degree and feelslike ${feelslike}`
                })
            })
        })
    }
})

/*-------------------------- */
/*-------------------------- */
/*-------------------------- */
//const address=process.argv[2];
// place='Delhi';







app.get('/about',(req,res) => {
    res.render('about',{
        title:'I am a developer',
        name:'Andrew Mead'
    })
});


app.get('*',(req,res) =>{
    res.render('notfound',''); 
});

// const helpdir=path.join(__dirname,'../public/help.html');
// app.use(express.static(helpdir));
// const aboutdir=path.join(__dirname,'../public/about.html');
// app.use(express.static(aboutdir));

// app.get('/about',(req,res)=>{
//     res.send('<h1>Buddhist Republic of JummoLand</h1>');
// });




app.listen(port,()=>{
    console.log('Server is up at port '+port);
});

