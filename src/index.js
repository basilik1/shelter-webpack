import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import createModal from './Modal';
import petsJson from './assets/pets.json';


import './index.scss';

const wrapp = document.getElementById('wrap');
wrapp.append(Header);
wrapp.append(Main);
wrapp.append(Footer);
wrapp.append(createModal);





// burger
let menuBtn = document.querySelector('.menu_btn'),
    menuList = document.querySelector('.menu__list'),
    burger = document.querySelector('.burger'),
    html = document.querySelector('html'),
    headerOver = document.querySelector('.header'),
    menuItem = document.querySelectorAll('.menu__item');



menuBtn.addEventListener("click", openMenu);
headerOver.addEventListener("click", closeMenu);
menuItem.forEach((el) => el.addEventListener("click", closeMenu)) 
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
    event.target.classList.contains('expand-menu') ) {
            menuBtn.classList.remove('expand-menu');
            menuList.classList.remove('open-list-menu');
            burger.classList.remove('open');
            html.classList.remove('over-hidden');
            headerOver.classList.remove('overlay');
        }
}




// modal
let modal = document.querySelector('.background-modal'),
    cardPets = document.querySelectorAll('.our-friends__column'),
    body = document.querySelector('body'),
    sliderList = document.querySelector('.slider');

cardPets.forEach((el) => el.addEventListener("click", modalOpen)); 
sliderList.addEventListener("click", modalOpen);
modal.addEventListener("click", modalClose);



function modalOpen(event) {
    body.classList.add('over-hidden');
    modal.classList.add('modal-open');

    const uniqPetsName = event.target.closest('.our-friends__column').children[1].innerHTML;
    console.log(uniqPetsName);

    // let request = new XMLHttpRequest();
    // request.open('GET', 'pets.json');
    // request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    // request.send();

    // request.addEventListener('readystatechange', function() {
    //         if (request.readyState === 4 && request.status == 200) {
    //             let data = request.response;
    //             data = JSON.parse(data);

                const uniqPetIndexCard = petsJson.findIndex(el => el.name == uniqPetsName);
                createCard(petsJson[uniqPetIndexCard]);
                // console.log(request.status);
    //         } else {
    //             console.log(request.status);
    //         }
    // });
};

function modalClose() {
    body.classList.remove('over-hidden');
    modal.classList.remove('modal-open');
}
// Render modal card
function createCard({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    const modalPetsCard = 
    `<div class="modal">
        <button class="modal-btn">
        <svg class="pag_icons" width="12" height="12">
            <use href="../assets/symbol-defs.svg#vector"></use>
        </svg>
    </button>
    <img class="modal_img" src=${img} alt=${name}>
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
};












// slider 

let valueCardWidth;
let direction = 'right';

let arrPast = [],
    arrCurr = [],
    arrNext = [];

let buttonLeft = document.querySelector('.icon-left'),
    buttonRight = document.querySelector('.icon-right'),
    slider = document.querySelector('.slider');





function setCardValue() {
    if (window.matchMedia('(min-width: 1200px)').matches ) {
        valueCardWidth = 3;
    } else if (window.matchMedia('(min-width: 768px)').matches) {
    valueCardWidth = 2;
    } else if (window.matchMedia('(min-width: 0px)').matches ) {
    valueCardWidth = 1;
    }
    return valueCardWidth;
}

function initSliderGallery(sumCards) {
    const past = pastArrGenerate(sumCards);
    const current = currentArrGenerate(sumCards);
    const next = nextArrGenerate(sumCards);
    cardListInitialRender([...past, ...current, ...next]);
};

initSliderGallery(setCardValue());

function scrollRight() {
    let btnDirection = 'right';
    console.log('scrollRight', valueCardWidth);

    slider.classList.add('right-animation');
    
    if (direction === btnDirection) {
        forward(valueCardWidth);
        rightClickRerender(valueCardWidth);
    } else {
        changeDirection(valueCardWidth);
        rightClickRerender(valueCardWidth);
    }
    slider.removeEventListener("click", scrollLeft);
    slider.removeEventListener("click", scrollRight);
}
function scrollLeft() {
    let btnDirection = 'left';
    console.log('scrollLeft', valueCardWidth);
    
    
    slider.classList.add('left-animation');
    if (direction === btnDirection) {
        forward(valueCardWidth);
        leftClickRErender(valueCardWidth);
    } else {
    changeDirection(valueCardWidth);
    leftClickRErender(valueCardWidth);
    } 
    slider.removeEventListener("click", scrollLeft);
    slider.removeEventListener("click", scrollRight);  
    
}
function forward(valueCardWidth) {
    arrPast = [...arrCurr];
    arrCurr = [...arrNext];
    arrNext = [];
    arrNext = nextArrGenerate(valueCardWidth);
};

function changeDirection(valueCardWidth) {
    console.log('changeDirection');
    let temp = [...arrCurr];
    arrCurr = [...arrPast];
    arrPast = [...temp];
    arrNext = [];
    arrNext = nextArrGenerate(valueCardWidth);
};

function pastArrGenerate(sumCards) {
    arrPast = [];
    while (arrPast.length < sumCards) {
      let randomNumber = Math.floor(Math.random() * 8)
        if (!arrPast.includes(randomNumber)) {
            arrPast.push(randomNumber);
        } 
    }
    return arrPast;
}

function currentArrGenerate(sumCards) {
    arrCurr = [];
    while (arrCurr.length < sumCards) {
      let randomNumber = Math.floor(Math.random() * 8)
        if (!arrPast.includes(randomNumber) && !arrCurr.includes(randomNumber)) {
            arrCurr.push(randomNumber);
        }
    }
    return arrCurr;
}

function nextArrGenerate(sumCards) {
    arrNext = [];
    while (arrNext.length < sumCards) {
      let randomNumber = Math.floor(Math.random() * 8)
        if (!arrNext.includes(randomNumber) && !arrCurr.includes(randomNumber)) {
            arrNext.push(randomNumber);
        }
    }
    return arrNext;
}


// Render  sslider cards
function createMarkupCard({ img, name }) {
    const markupCard = `
    <li class="our-friends__column">
        <div class="our-friends__image">
            <img src=${img} alt=${name}>
        </div>
    <p class="our-friends__name">${name}</p>
    <button  class="our-friends__buttons">Learn more</button>
    </li>`;
    return markupCard;
};

function cardListInitialRender(array) {

    // let requestOne = new XMLHttpRequest();
    // requestOne.open('GET', './pets-slider.json');
    // requestOne.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    // requestOne.send( );

    // requestOne.addEventListener('readystatechange', function() {
    //     if (requestOne.readyState === 4 && requestOne.status == 200) {
    //         let data = requestOne.response;
    //         data = JSON.parse(data);

            const markup = array.map(el => {
                return `${createMarkupCard(petsJson[el])}`;
            }).join("");
            
            slider.innerHTML = markup;
            
//         } else {
//             console.log(requestOne.status);
//         }
// });
}

function rightClickRerender(valueCardWidth) {
    // let requestTwo = new XMLHttpRequest();

    // requestTwo.open('GET', './pets-slider.json');
    // requestTwo.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    // requestTwo.send( );

    // requestTwo.addEventListener('readystatechange', function() {
        // if (requestTwo.readyState === 4 && requestTwo.status == 200) {
        //     let data = requestTwo.response;
        //     data = JSON.parse(data)
            let arrNext = nextArrGenerate(valueCardWidth);

            const newMarkup = [...arrNext].map(el => {
            return `${createMarkupCard(petsJson[el])}`;
            }).join("");
            slider.insertAdjacentHTML("beforeend", newMarkup);
            console.log('arrNext', arrNext);

            for (let i = 0; i < valueCardWidth; i += 1) {
                slider.removeChild(slider.children[0]);
            }
                // } 
        //         else {
        //             console.log(requestTwo.status)
        // }
    // }
    // );
}

function leftClickRErender(valueCardWidth) {
    // let requestThree = new XMLHttpRequest();

    // requestThree.open('GET', './pets-slider.json');
    // requestThree.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    // requestThree.send( );

    // requestThree.addEventListener('readystatechange', function() {
        // if (requestThree.readyState === 4 && requestThree.status == 200) {
        //     let data = requestThree.response;
        //     data = JSON.parse(data);

            let arrNext = nextArrGenerate(valueCardWidth);

            const newMarkup = [...arrNext].map(el => {
                return `${createMarkupCard(petsJson[el])}`;
            }).join("");

            slider.insertAdjacentHTML("afterbegin", newMarkup);
            
            console.log('arrNext', arrNext);

            for (let i = 0; i < valueCardWidth; i += 1) {
                slider.removeChild(slider.lastElementChild);
            }
                // } 
            //     else {
            //         console.log(requestThree.status);
            // }
    // }
    // );
}



buttonLeft.addEventListener("click", scrollLeft);
buttonRight.addEventListener("click", scrollRight );

slider.addEventListener("animationend", (evt) => {
if (evt.animationName === "move-left") {
    slider.classList.remove("left-animation");

} else {
    slider.classList.remove("right-animation");

}

buttonLeft.addEventListener("click", scrollLeft);
buttonRight.addEventListener("click", scrollRight );
    }
);
