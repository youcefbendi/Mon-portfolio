/* ------- navigation menu -------- */
(()=>{

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click",showNavMenu);
    closeNavBtn.addEventListener("click",hideNavMenu);
    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");

        },300)
    }

    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !==""){
                event.preventDefault();
                const hash = event.target.hash;
                console.log(hash)
                //desactiver la section activer
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                //activer la nouvelle section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                //si le boutton est relative au nav menu
                
                    //desactiver le menu item 
                    navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                    navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                if(navMenu.classList.contains("open")){
                    //activer le nv menu item
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    hideNavMenu();
                }else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hash === item.hash){
                            //activer le nv menu item
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                //ajouter hash a l'url
                window.location.hash = hash;                
            }
        }
    })
})();



/*   ------    about section tabs     -------   */


(()=>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click" , (event)=>{
        if(event.target.classList.contains("tab-item")
        && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
            event.target.classList.add("active", "outer-shadow");
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}
/*   ---------  portfolio filter and popup   --------*/

(()=>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex , slideIndex , screenshots;
    filterContainer.addEventListener("click",(event)=>{
        if(event.target.classList.contains("filter-item")
        && !event.target.classList.contains("active")){
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            event.target.classList.add("active","outer-shadow")
            const target = event.target.getAttribute("data-target");
            
            portfolioItems.forEach((item)=>{
                
                if(item.getAttribute("data-category").split(",").includes(target) || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");

                }
                
            })
        }
        
    })


    portfolioItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
                
            //get index of portfolioitem
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            
            if(screenshots.length ===1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex= 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click",()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })
    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideShow(){
        
        
        var cleanedString = screenshots[slideIndex].trim();

        // Remove extra spaces within the string
        cleanedString = cleanedString.replace(/\s+/g, ' ');
        console.log(cleanedString)

        const popupVid = popup.querySelector(".pp-video");
        const popupImg = popup.querySelector(".pp-img");
        if (cleanedString.endsWith(".mp4")) {
            // Your code to do something when the extension is ".mp4"
            console.log("The file has an MP4 extension.");
            const vidSrc = cleanedString;
            
            popup.querySelector(".pp-loader").classList.add("active");
            popupVid.src=vidSrc;
            popupVid.style.display="block";
            popupImg.style.display="none";
           
            popupVid.addEventListener("canplaythrough", function() {
                // This code will run when the video has finished loading (charged)
                console.log("Video has finished loading");
                popup.querySelector(".pp-loader").classList.remove("active");
    
                // You can add your own actions here, such as displaying a message or modifying the DOM
            });
          } else {
            // Your code to handle other cases
            console.log("The file does not have an MP4 extension.");
            const imgSrc = cleanedString;
            
            popup.querySelector(".pp-loader").classList.add("active");
            popupImg.src=imgSrc;
            popupVid.style.display="none";
            popupImg.style.display="block";
            popupImg.onload = ()=>{
                popup.querySelector(".pp-loader").classList.remove("active");
            }
          }
       
        popup.querySelector(".pp-counter").innerHTML= (slideIndex+1) +' of '+ screenshots.length;


    }
    nextBtn.addEventListener("click",()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex=0;
        }else{
            slideIndex++;
        }
        popupSlideShow();
    })
    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex=screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideShow();
    })

    function popupDetails(){
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return;
        }
        projectDetailsBtn.style.display="block";
        const details= portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML=details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML=title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML=category.split("-").join(" ");


    }
    projectDetailsBtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })
    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight= 0 + "px";
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight= projectDetailsContainer.scrollHeight + "px";

        }
    }
})();


/* ---- testimonial slider ---------- */

(()=>{
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth= sliderContainer.offsetWidth,
    prevBtn =document.querySelector(".testi-slider-nav .prev"),
    nextBtn =document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex= Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    slides.forEach((slide)=>{
        slide.style.width = slideWidth + "px";
    })
    sliderContainer.style.width= slideWidth * slides.length + "px";


    nextBtn.addEventListener("click",()=>{
        if(slideIndex === slides.length -1){
            slideIndex=0;
        }else{
            slideIndex++;
        }
        slider();        
    })

    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex=slides.length -1;
        }else{
            slideIndex--;
        }
        slider();
    })
    function slider(direction){
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft= - (slideWidth * slideIndex) + "px";

    }
    slider();

})();

/* ------- hide all section except active -------- */

(()=>{
    
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }

    })
})();


window.addEventListener("load",()=>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display="none";

    },600)
})