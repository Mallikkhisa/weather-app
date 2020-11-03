const request=require('request');
  //'+address+'
const geocode = (address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWFsbGlra2hpc2EiLCJhIjoiY2tndDBjemtyMHN2cjJxbWZzejNwNng1ZCJ9.UCyoe6X65Z-YsuxgO1JatQ&limit=1';
    request({url:url},(error,response)=>{
        if(error){
          callback('Unable to connect',undefined);
        }
        else if(JSON.parse(response.body).features.length===0){
          callback('Location not found',undefined);
        }
        else{
            const data=JSON.parse(response.body);
           const lat=data.features[0].center[1];
           const lon=data.features[0].center[0];
           const placeName=data.features[0].place_name;
          callback(undefined,{
              latitude:lat,
              longitude:lon,
              placeName:placeName
          });
       }
    
    });
  }
  module.exports=geocode;
    // geocode('Delhi',(e,d)=>{
    //   console.log(e);
    //   console.log(d);
    // });
