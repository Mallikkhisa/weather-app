const path=require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));
//console.log(__filename)
const app=express();
const port = process.env.PORT ||3000 
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
       return res.send({
            error:'You must provide search term'
        })
    
    }
    
     geocode(req.query.address,(error,geodata) => {
          //console.log('Error',error);
          //console.log('Data',data);
          if(error){
              return error
          }
        forecast(geodata.latitude,geodata.longitude,(error,data)=>{
            if(error){
                return res.send({error});
            }
           console.log(`${data.desc}. Temparature in ${geodata.placeName} is ${data.temperature} degree and feels like ${data.feelslike} degree out`);
           res.send({
            description:data.desc,
            place:req.query.address,
            temperature:data.temperature,
            feelslike:data.feelslike
        })
        });
      
      });
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

