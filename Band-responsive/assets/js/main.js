const buyBtns = document.querySelectorAll('.js-buy-ticket');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.js-modal-container');
const modalClose = document.querySelector('.js-modal-close');



function showBuyTickets(){
    modal.classList.add("open");
}

for(let buyBtn of buyBtns){
    buyBtn.addEventListener('click', showBuyTickets);
}
function hideBuyTickets(){
    modal.classList.remove('open');
}

modalClose.addEventListener('click', hideBuyTickets);

modal.addEventListener('click', hideBuyTickets);

modalContainer.addEventListener('click', function(even){
    even.stopPropagation();
})