/*---------- toggle style switcher ----------- */
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click",()=>{
    console.log("hi")
    document.querySelector(".style-switcher").classList.toggle("open");
})

//hide style switcher on scroll

window.addEventListener("scroll",()=>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open")
    }
})

//THEME COLORS

const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color){
    localStorage.setItem("color",color);
    changeColor();
    
}
function changeColor(){
    alternateStyle.forEach((style)=>{
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled")
        }else{
            style.setAttribute("disabled","true")
        }
    })

}
if(localStorage.getItem("color")!== null){
    changeColor();
}
//light and dark mode

const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click",()=>{
    dayNight.querySelector("i").classList.toggle("far");
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fas");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light")
    }

})
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}else{
    if(document.body.classList.contains("dark")) document.body.classList.remove("dark");
    
}
window.addEventListener("load",()=>{
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
    }else{
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})