//const { response } = require("express");

console.log('client side javaScript is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data);
//     })
// })
const input_field=document.getElementById('location');
const btn=document.getElementById('btn');
const weather_box=document.querySelector('.forecast-details')
const address=input_field.value;

btn.addEventListener('click',(event) =>{
    event.preventDefault();

    weather_box.innerHTML= 'Loading.....';
     weather_box.style.display="block";

    const address=input_field.value;
   fetch('/weather?address='+address).then((response) => {
    response.json().then((data) =>{
        
        if(data.error){
            weather_box.innerHTML= data.error;
            weather_box.style.display="block";
        }else{
       //console.log(data);
       weather_box.innerHTML=`It's ${data.desc} in ${address}. The temperature is ${data.temperature} degree and feelslike ${data.feelslike} degree out`;
       weather_box.style.display="block";
        }
    })
   });
    //console.log(address);
});
// fetch('/weather?address='+address).then((response) =>{
//     response.json().then((data) =>{
//         if(data.error){
//             // console.log(data.error);
//             weather_box.innerHTML=data.error;
//             weather_box.style.display="block";
//         }else{
//        //console.log(data);
//        const forecastData=`It's ${data.description} in ${address}. The temperature is ${data.temperature} degree and feelslike ${data.feelslike} degree out`;
//        weather_box.innerHTML=forecastData;
//        weather_box.style.display="block";
//         }
//     })
// })





// const weatherForm=document.querySelector('button');
// const search=document.querySelector('input');
// weatherForm.addEventListener('click',(event) =>{
//     event.preventDefault();
//     const address=search.value;
//    fetch('http://localhost:3000/weather?address='+address).then((response) => {
//     response.json().then((data) =>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//        console.log(data);
//         }
//     })
//    });
//     console.log(address);
// })
