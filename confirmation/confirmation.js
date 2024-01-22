'use strict';


const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const orderDatas = JSON.parse(localStorage.getItem('orderLists'));
const productContainer = document.querySelector('.product-info');
const customerData = JSON.parse(localStorage.getItem('customer'))
const basketCount = document.querySelector('.basket sup');


// *******************************************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let catalogserach = [];

const {
    customerName,
    customerSubName,
    customerEmail,
    customerNumber,
    customerAdress,
    orderTotal,
    orderGeneral
} = customerData

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

const displayBasket = () => {
    productContainer.innerHTML = "<h5>Sifariş detallari</h5>";

    orderDatas.forEach((order) => {
        order.forEach((product) => {
            const { brand, title, size, image, count, countMax, price } = product;

            productContainer.innerHTML += `
                <div class="products">
                    <div class="product-img">
                        <img src="../${image[0]}" alt="">
                    </div>
                    <div class="product-data">
                        <p class="product-name">${title}</p>
                        <p class="product-price">₼ ${price} x ${count}</p>
                        <p class="product-size">${size}</p>
                    </div>
                </div>
            `;

        });

    });

    orderDatas.length=0
    localStorage.setItem('orderLists', JSON.stringify(orderDatas));
};

const dataInfo = () => {
    const custName = document.querySelector('.customer-name')
    const custNum = document.querySelector('.customer-num')
    const custAdress = document.querySelector('.customer-adress')
    const totalPrice = document.querySelector('.total-price')
    const general = document.querySelector('.general')

    const customerData = JSON.parse(localStorage.getItem('customer'))
    const {
        customerName,
        customerSubName,
        customerEmail,
        customerNumber,
        customerAdress,
        orderTotal,
        orderGeneral,
        formattedDate
    } = customerData

    custName.textContent = `${customerName} ${customerSubName}`
    custNum.textContent = `${customerEmail} / ${customerNumber}`
    custAdress.textContent = customerAdress
    totalPrice.textContent = `₼ ${orderTotal.toFixed(2)}`
    general.textContent = `₼ ${orderGeneral.toFixed(2)}`

    const orderCode = document.querySelector(".order-code")
    const date = document.querySelector(".date")
    const update = document.querySelector(".update")

    const randomid = generateid();
    console.log(randomid);

    const orderDatas = document.querySelector('.order-data');
    orderDatas.innerHTML = `
    <h3>Order <span class="order-code">${randomid}</span></h3>

    <div class="date">

        <div class="date-or">
            <p>Sifariş tarixi: </p>
            <p class="date">${formattedDate}</p>
        </div>
        <div class="last-update">
            <p>Son yeniləmə: </p>
            <p class="update">${formattedDate}</p>
        </div>

    </div>
    `;



}

function generateid() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            id += '-';
        } else if (i === 14) {
            id += '';
        } else if (i === 19) {
            id += chars.charAt(Math.random() * chars.length);
        } else {
            id += chars.charAt(Math.random() * chars.length);
        }
    }

    return id;
}

const basketCountDisplay = () => {
    basketData.length = 0
    basketCount.textContent = basketData.length;
};


Object.entries(customerData).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});




displayBasket();
dataInfo()
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