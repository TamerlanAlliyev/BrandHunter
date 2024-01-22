'use strict'

const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const productContainer = document.querySelector('.product-container');
const makeOrder = document.querySelector('.order-btn');
const emptEl = document.querySelector('.empty');
const orderHidden = document.querySelector('.orders');
const clearBasketBtn = document.querySelector('.clear-basket');
const basketCount = document.querySelector('.basket sup');


// *******************************************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let catalogserach = [];

const basketData = JSON.parse(localStorage.getItem('basket')) || [];
let ordertoList = JSON.parse(localStorage.getItem('orderLists')) || [];
const basketDatas = JSON.parse(localStorage.getItem('basket')) || [];

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

makeOrder.addEventListener('click', () => {
    const order = [...basketData];

    ordertoList.push(order);

    localStorage.setItem('orderLists', JSON.stringify(ordertoList));

    localStorage.setItem('basket', JSON.stringify([]));

    displayBasket();

    window.location.href = "../order/order.html"

    console.log(basketData);
});

clearBasketBtn.addEventListener('click', () => {
    basketData.splice(0, basketData.length);
    localStorage.setItem('basket', JSON.stringify(basketData));

    displayBasket();
    emptyDisplayBasket();
});


subLategoriesLiEl.forEach((category) => {
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

const displayBasket = () => {
    productContainer.innerHTML = "";

    basketData.forEach((product) => {
        const { brand, title, size, image, count, countMax } = product;

        const productBox = document.createElement('div');
        productBox.classList.add('product-box');

        productBox.innerHTML += `
            <div class="box-img">
                <img src="../${image[0]}" alt="">
            </div>
            <div class="box-info">
                <p class="brand-name">${brand}</p>
                <p class="product-name">${title}</p>
                <p class="product-size">${size}</p>
            </div>
            <div class="product-count">
                <div class="count">
                    <div class="decreasing-btn">
                        <img src="../assets/icons/minus.svg" alt="">
                    </div>
                    <input class="count-value" type="number" value="${count}">
                    <div class="increasing-btn">
                        <img src="../assets/icons/plus.svg" alt="">
                    </div>
                </div>
                <div class="trash-box">
                    <img src="../assets/icons/trash-box-white.svg" alt="">
                </div>
            </div>
        `;

        const inputElement = productBox.querySelector('.count-value');
        const increasingBtn = productBox.querySelector('.increasing-btn');
        const decreasingBtn = productBox.querySelector('.decreasing-btn');

        increasingBtn.addEventListener('click', () => {
            if (countMax > inputElement.value) {
                inputElement.value++;
                product.count = inputElement.value;
            }
        });

        decreasingBtn.addEventListener('click', () => {
            if (1 < inputElement.value) {
                inputElement.value--;
                product.count = inputElement.value;
            }
        });

        const trashBox = productBox.querySelector('.trash-box');

        trashBox.addEventListener('click', () => {
            const productIndex = basketData.findIndex(
                (basketProduct) => basketProduct.title === title && basketProduct.size === size
            );

            if (productIndex !== -1) {
                basketData.splice(productIndex, 1);
                localStorage.setItem('basket', JSON.stringify(basketData));
                displayBasket();
                console.log(basketData);
            }
            emptyDisplayBasket();
        });

        productContainer.appendChild(productBox);
    });
};

const emptyDisplayBasket = () => {

    const basketData = JSON.parse(localStorage.getItem('basket')) || [];

    if (basketData.length === 0) {
        emptEl.style.display = "flex";
        orderHidden.style.display = "none";
    } else {
        emptEl.style.display = "none";
        orderHidden.style.display = "flex";
    }
};

const basketCountDisplay = () => {
    basketCount.textContent = basketDatas.length;
};



displayBasket();
emptyDisplayBasket();
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
        <img src="../${product.image[0]}" alt="">
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