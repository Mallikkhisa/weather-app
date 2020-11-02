//const { response } = require("express");

console.log('client side javaScript is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) =>{
        console.log(data);
    })
})

fetch('/weather?address=New%20york').then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error);
        }else{
       console.log(data);
        }
    })
})

const weatherForm=document.querySelector('button');
const search=document.querySelector('input');
weatherForm.addEventListener('click',(event) =>{
    event.preventDefault();
    const address=search.value;
   fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error);
        }else{
       console.log(data);
        }
    })
   });
    console.log(address);
})
