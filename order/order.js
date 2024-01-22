'use strict'


const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const productBox = document.querySelector('.product-list');
const myCheckbox = document.getElementById('myCheckbox');
const deliveryValue = document.querySelector('.del-value');
const optionality = document.querySelector('.optionality');
const totalValue = document.querySelector('.tot-value');
const generalValue = document.querySelector('.general .del-value');
const revealButton = document.querySelector('.reveal-button');
const inputCode = document.querySelector('.input-code');
const nameValue = document.querySelector('.name-value')
const subnameValue = document.querySelector('.subname-value')
const emailValue = document.querySelector('.email-value')
const numberValue = document.querySelector('.number-value')
const adressValue = document.querySelector('.adress-value')
const basketCount = document.querySelector('.basket sup');
const confirmOrderBtn = document.querySelector('.confirm-order');



// *******************************************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let disStatus = false;
let catalogserach = [];

const orderLists = JSON.parse(localStorage.getItem('orderLists')) || [];
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

myCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        deliveryValue.textContent = `₼ ${5}.00`
        optionality.textContent = "(Seçimlik)"
        optionality.style.color = "black"
    } else {
        deliveryValue.textContent = `₼ ${0}.00`
        optionality.textContent = "*"
        optionality.style.color = "red"
    }
    orderDisplay();

});

revealButton.addEventListener('click', () => {
    if (disStatus) {
        inputCode.style.display = "none";
        disStatus = false;
    } else {
        inputCode.style.display = "block";
        disStatus = true;
    }
});

confirmOrderBtn.addEventListener('click', () => {
    if (nameValue.value.length === 0 ||
        subnameValue.value.length === 0 ||
        emailValue.value.length === 0 ||
        numberValue.value.length === 0 ||
        adressValue.value.length === 0) {
        alert("Zəhmət olmasa bütün sahələri doldurun.")
        return;
    }

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleString('US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).replace(/\//g, '.').replace(/,/g, " ");

    let customerName = nameValue.value
    let customerSubName = subnameValue.value
    let customerEmail = emailValue.value
    let customerNumber = Number(numberValue.value)
    let customerAdress = adressValue.value
    let orderTotal = Number(totalValue.textContent.replace(/[₼ ]/g, ''));
    let orderGeneral = Number(generalValue.textContent.replace(/[₼ ]/g, ''));

    const customerData = {};

    customerData.customerName = customerName;
    customerData.customerSubName = customerSubName;
    customerData.customerEmail = customerEmail;
    customerData.customerNumber = customerNumber;
    customerData.customerAdress = customerAdress;
    customerData.orderTotal = orderTotal;
    customerData.orderGeneral = orderGeneral;
    customerData.formattedDate = formattedDate;


    localStorage.setItem('customer', JSON.stringify(customerData));

    window.location.href = `../confirmation/confirmation.html`

    orderDisplay();

})

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

const orderDisplay = () => {
    productBox.innerHTML = "";

    let totalPrice = 0;

    orderLists.forEach((order) => {
        order.forEach((product) => {
            const { brand, title, size, image, count, countMax, price } = product;

            const formattedTitle = title.replace(/-/g, ' ');

            productBox.innerHTML += `
                <div class="product-box">
                    <div class="product-display">
                        <img src="../${image[0]}" alt="">
                        <div class="product-name">${formattedTitle}</div>
                    </div>
                    <div class="pr-info">
                        <div class="product-price">₼ ${price.toFixed(2)} x ${count}</div>
                        <div class="product-size">${size}</div>
                    </div>
                </div>
            `;

            totalPrice += price * count;

        });
    });

    updateTotalPrice(totalPrice);
};

const updateTotalPrice = (total) => {
    totalValue.textContent = `₼ ${total.toFixed(2)}`;

    let isChecked = myCheckbox.checked;
    if (isChecked) {
        generalValue.textContent = `₼ ${(total + 5).toFixed(2)}`;
    } else {
        generalValue.textContent = `₼ ${total.toFixed(2)}`;
    }

};

const basketCountDisplay = () => {
    basketCount.textContent = basketData.length;
};


orderDisplay();
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