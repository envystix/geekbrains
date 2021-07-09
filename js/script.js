document.querySelector(".header__right-menu").onclick = function() {
    document.querySelector(".header__menu-overlay").classList.add("menu-active");
   }
   
   document.querySelector(".header__menu-close-btn").onclick = function() {
    document.querySelector(".header__menu-overlay").classList.remove("menu-active");
   }