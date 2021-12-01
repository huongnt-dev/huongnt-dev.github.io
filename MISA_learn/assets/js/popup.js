document.querySelector(".js-popup__close").addEventListener('click', function(){
    document.getElementById('js-popup').style.display = 'none';
    document.getElementById('js-overlay').style.display='none';
});

document.getElementById('js-overlay').addEventListener('click', function(){
    document.getElementById('js-popup').style.display = 'none';
    document.getElementById('js-overlay').style.display='none';
});

document.querySelector('.js-btn-popup').addEventListener('click', function(){
    document.getElementById('js-popup').style.display = 'block';
    document.getElementById('js-overlay').style.display='flex';
});

document.getElementById('js-popup').addEventListener('click', function(e){
    e.stopPropagation();
});