// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
import createModal from './Modal';
import petsJson from '../assets/pets.json';
import './index.scss';

const contacts = document.getElementById('contacts');
// wrapp.append(Header);
// wrapp.append(Main);
// wrapp.append(Footer);
contacts.append(createModal);





// burger
let menuBtn = document.querySelector('.menu_btn'),
    menuList = document.querySelector('.menu__list'),
    burger = document.querySelector('.burger'),
    html = document.querySelector('html'),
    headerOver = document.querySelector('.header'),
    menuItem = document.querySelectorAll('.menu__item');

    menuBtn.addEventListener("click", openMenu);
    headerOver.addEventListener("click", closeMenu);
    menuItem.forEach((el) => el.addEventListener("click", closeMenu));
    menuBtn.addEventListener("click", closeMenu);

function openMenu() {
    menuBtn.classList.add('expand-menu');
    menuList.classList.add('open-list-menu');
    burger.classList.add('open');
    html.classList.add('over-hidden');
    headerOver.classList.add('overlay');
}

function closeMenu(event) {
    if( event.target.classList.contains('menu__link') || 
    event.target.classList.contains('overlay') ||
    // event.target.classList.contains('menu__body') || 
    event.target.classList.contains('expand-menu')) {
            menuBtn.classList.remove('expand-menu');
            menuList.classList.remove('open-list-menu');
            burger.classList.remove('open');
            html.classList.remove('over-hidden');
            headerOver.classList.remove('overlay');
        }
}

// modal
let modal = document.querySelector('.background-modal'),
    cardPets = document.querySelectorAll('.body-our__column'),
    body = document.querySelector('body');
    

cardPets.forEach((el) => el.addEventListener("click", modalOpen)); 
modal.addEventListener("click", modalClose);

function modalClose() {
    body.classList.remove('over-hidden');
    modal.classList.remove('modal-open');
}

function modalOpen(event) {
    body.classList.add('over-hidden');
    modal.classList.add('modal-open');

    const uniqPetsName = event.target.closest('.body-our__column').children[1].innerHTML;
    console.log(uniqPetsName);

    // let request = new XMLHttpRequest();
    //     request.open('GET', './assets/pets.json');
    //     request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    //     request.send( );

    // request.addEventListener('readystatechange', function() {
    //         if (request.readyState === 4 && request.status == 200) {
    //             let data =  request.response;
    //                 data = JSON.parse(data);
    const uniqPetCard = petsJson.findIndex(el => el.name == uniqPetsName);
    createCard(petsJson[uniqPetCard]);
//             } else {
//                 console.log(request.status);
//             }
//     });
}


function createCard({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    const modalPetsCard = 
    `<div class="modal">
        <button class="modal-btn">
            <svg class="pag_icons" width="12" height="12">
                <use href="../assets/symbol-defs.svg#vector"></use>
            </svg>
        </button>
        <img class="modal_img" src=.${img} alt=${name}>
        <div class="modal_content">
            <h3 class="modal_title">${name}<span class="modal_title-span">${type} - ${breed}</span></h3>
            <p class="modal_text">${description}</p>
            <ul class="modal_list">
            <li class="modal_item"><b>Age: </b>${age}</li>
            <li class="modal_item"><b>Inoculations: </b>${inoculations}</li>
            <li class="modal_item"><b>Diseases: </b>${diseases}</li>
            <li class="modal_item"><b>Parasites: </b>${parasites}</li>
            </ul>
        </div>
    </div>`;
    modal.innerHTML = modalPetsCard;
}
