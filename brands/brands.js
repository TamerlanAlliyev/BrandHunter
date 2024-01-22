'use strict'


const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const brandsContainerBoxs = document.querySelectorAll('.brands-container .box');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const basketCount = document.querySelector('.basket sup');


// *******************************************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let brandSerach = [];
let catalogserach = [];

const basketData = JSON.parse(localStorage.getItem('basket')) || [];

// *******************************************************************************************************

catalog.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleCatalogList();
});

document.addEventListener('click', (event) => {
    const isClickedInsideCatalog = catalog.contains(event.target);
    const isClickedInsideCatalogList = catalogList.contains(event.target);

    if (!isClickedInsideCatalog && !isClickedInsideCatalogList && catalogOpen) {
        catalogList.style.display = "none";
        catalogOpen = false;
    }
});

basket.addEventListener('click',()=>{
    window.location.href="../basket/basket.html"
})

burgerMenu.addEventListener('click', () => {
    if(burgerMenuOpen){
        headerList.style.display = "none";
        burgerMenuIcon.src = "../assets/icons/burger-menu.svg";
        burgerMenuOpen = false;
    }else{
        headerList.style.display = "flex";
        burgerMenuIcon.src = "../assets/icons/x-button.svg";
        burgerMenuOpen = true;
    }
  
});

logo.addEventListener('click', () => {
    window.location.href = "../index.html";
});


brandsContainerBoxs.forEach((category, index) => {
    category.addEventListener('click', () => {
        brandSerach = Object.values(category.dataset);
        console.log(brandSerach);
        localStorage.setItem('brandSerachs', JSON.stringify(brandSerach));
        window.location.href = "../store/store.html";
    });
});

subLategoriesLiEl.forEach((category, index) => {
    category.addEventListener('click', () => {
        catalogserach = Object.values(category.dataset);
        console.log(catalogserach);
        localStorage.setItem('catalogLists', JSON.stringify(catalogserach));
        window.location.href = "../store/store.html";
    });
});


const toggleCatalogList = () => {
    if (catalogOpen) {
        catalogList.style.display = "none";
        catalogOpen = false;
    } else {
        catalogList.style.display = "block";
        catalogOpen = true;
    }
}

const basketCountDisplay = () => {
    basketCount.textContent = basketData.length;
};


basketCountDisplay();