const navslide = () => {
 const burger = document.querySelector('.hamburger');
 const nav = document.querySelector('.nav-links'); //nav background
 const navLinks = document.querySelectorAll('.nav-links li'); //nav buttons
 const logoo = document.querySelector('.logo-container');
 var v = window.matchMedia("(max-width: 992px)")


 
  burger.addEventListener('click', () => {
      //toggle nav
     nav.classList.toggle("open");
     logoo.classList.toggle("invert");
   
     //animate buttons
      navLinks.forEach((link, index) => {
       if(link.style.animation){
        link.style.animation = ''
        }
        else {
         link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 0.4}s`; //1.7 initial animation delay
        }
      });
      //burger animation
      burger.classList.toggle('toggle');
      console.log("nav open");
     
   });
  if (v.matches) {
   nav.addEventListener('click', () => {
        //toggle nav
        nav.classList.toggle("open");
        logoo.classList.toggle("invert");
      
        //animate buttons
         navLinks.forEach((link, index) => {
          if(link.style.animation){
           link.style.animation = ''
           }
           else {
            link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 0.4}s`; //1.7 initial animation delay
           }
         });
         //burger animation
         burger.classList.toggle('toggle');

         console.log("nav close");
         
   });
  }
  else{
    console.log(v);
  }
} 



const app = ()=>{
    navslide();
}

app();