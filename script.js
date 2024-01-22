'use strict'


const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const basketCount = document.querySelector('.basket sup');


// ******************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let catalogserach = [];
const basketData = JSON.parse(localStorage.getItem('basket')) || [];

// ******************************************************************************

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

basket.addEventListener('click', () => {
    window.location.href = "./basket/basket.html"
})

burgerMenu.addEventListener('click', () => {
    if (burgerMenuOpen) {
        headerList.style.display = "none";
        burgerMenuIcon.src = "./assets/icons/burger-menu.svg";
        burgerMenuOpen = false;
    } else {
        headerList.style.display = "flex";
        burgerMenuIcon.src = "./assets/icons/x-button.svg";
        burgerMenuOpen = true;
    }

});

logo.addEventListener('click', () => {
    window.location.href = "./index.html";
});

subLategoriesLiEl.forEach((category) => {
    category.addEventListener('click', () => {
        catalogserach = Object.values(category.dataset);
        console.log(catalogserach);
        localStorage.setItem('catalogLists', JSON.stringify(catalogserach));
        window.location.href = "./store/store.html";
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
















const searchAnswer = document.querySelector('.search-answer');
const searchInput = document.querySelector('.search-input input');

let data = [];

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const createList = (products) => {
  searchAnswer.innerHTML = "";

  products.forEach((product) => {
    const liElement = document.createElement("li");
    liElement.setAttribute("data-id", product.id);

    liElement.innerHTML = `
      <div class="answer-img">
        <img src="./${product.image[0]}" alt="">
      </div>
      <div class="answer-info">
        <h3>${product.title}</h3>
        <p>${product.brand}</p>
      </div>
    `;

    document.body.addEventListener('click', (event) => {
        if (!searchAnswer.contains(event.target)) {
          searchAnswer.innerHTML = "";
        }
      });

    liElement.addEventListener('click', () => {
      const clickedProductId = liElement.getAttribute('data-id');
      const clickedProduct = data.find((product) => product.id == parseInt(clickedProductId));

      console.log(clickedProduct);
      localStorage.setItem('clickedProduct', JSON.stringify(clickedProduct));
      console.log(`ID ${clickedProductId} clicked!`);
      window.location.href = "../product/product.html";
    });

    searchAnswer.appendChild(liElement);
  });
};

searchInput.addEventListener('input', () => {
  const givenValue = searchInput.value.trim().toLowerCase();

  if (!givenValue) {
    searchAnswer.innerHTML = "";
    return;
  }

  const results = data.filter((product) => product.title.toLowerCase().includes(givenValue));
  console.log(results);
  createList(results);
});

getProducts();
