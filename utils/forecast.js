const request=require('request');

const forecast=(latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=f7778a77bf423d7e261ab001f73d5693&query='+latitude+','+longitude+'&units=f';

    request({url:url,json:true},(error,response) => {

        if(error){
            callback('unable to connect',undefined);
        }else if(response.body.error){
            callback('Location not found',undefined);
        }
        else{
            callback(undefined,{
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike,
                desc:response.body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports=forecast;


// forecast(23.234,79.292,(error,data) =>{
//     console.log(error);
//     console.log(data);
// })