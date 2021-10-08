var header = document.querySelector('.header');
var mobileBtn = document.querySelector('.mobile-menu-btn');
var headerHeight = header.clientHeight;

mobileBtn.onclick = function(){
    var isClose = header.clientHeight === headerHeight;
    if(isClose){
        header.style.height='auto';
    }
    else{
        header.style.height=null;
    }
}

var menuItems = document.querySelectorAll('.nav li a[href*="#"]');

for(let i = 0; i<menuItems.length;i++){
    let menuItem =menuItems[i];

    menuItem.onclick = function(even){
        var isParentMenu = menuItem.nextElementSibling && menuItem.nextElementSibling.classList.contains('subnav');
        if(isParentMenu){
            even.preventDefault();
        }
        else{
            header.style.height=null;
        }
    }
}