const reveals=document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveals.forEach(el=>{

const top=el.getBoundingClientRect().top;

if(top<window.innerHeight-100){

el.classList.add("active");

}

});

});

window.dispatchEvent(new Event("scroll"));

const toggle=document.getElementById("themeToggle");

toggle.onclick=()=>{

document.body.classList.toggle("light");

toggle.textContent=document.body.classList.contains("light")?"🌙":"☀️";

};