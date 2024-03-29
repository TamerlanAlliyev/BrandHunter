'use strict';







const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')

let catalogOpen = false;

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

const toggleCatalogList = () => {
    if (catalogOpen) {
        catalogList.style.display = "none";
        catalogOpen = false;
    } else {
        catalogList.style.display = "block";
        catalogOpen = true;
    }
}















const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    window.location.href = "../index.html";
});

const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
let catalogserach = [];

subLategoriesLiEl.forEach((category, index) => {
    category.addEventListener('click', () => {
        catalogserach = Object.values(category.dataset);
        console.log(catalogserach);
        localStorage.setItem('catalogLists', JSON.stringify(catalogserach));
        window.location.href = "../store/store.html";
    });
});


























































const retrievedData = JSON.parse(localStorage.getItem('clickedProduct'));
console.log(retrievedData);

const {
  brand,
  productCategory,
  productName,
  title,
  size,
  color,
  price,
  image,
  description,
} = retrievedData;

const prodName = document.querySelector('.product-name p');
const brandTitle = document.querySelector('.product-name h3');
const brandName = document.querySelector('.brand-name h5');
const sku = document.querySelector('.sku h5');
const prodPrice = document.querySelector('.price');
const prodDescription = document.querySelector('.des-info');

const productInfo = () => {
  prodName.textContent = productName;
  brandTitle.textContent = `${brand} ${productName} ${title}`;
  brandName.textContent = brand;
  prodPrice.textContent = `₼ ${price}`;
  sku.textContent = title;
  prodDescription.textContent = description;
};

productInfo();










// ************************************************

let selectedSize;
let selectedSizeCount;
let sizeStatus = false;

const sizeDisplay = () => {
  const prodSizes = document.querySelectorAll('.sizes'); 

  prodSizes.forEach((sizeElement) => {
    const sizesToShow = retrievedData.size || {};
    const availableSizes = Object.entries(sizesToShow)
      .filter(([size, count]) => count !== 0)
      .map(([size]) => size);

    sizeElement.innerHTML = availableSizes
      .map(
        (sizeValue) => `
            <div class="size-frame" data-count="${sizesToShow[sizeValue]}" data-size="${sizeValue}">${sizeValue}</div>
        `
      )
      .join('');

    const sizeSelected = sizeElement.querySelectorAll('.size-frame');
    sizeSelected.forEach((size) => {
      size.addEventListener('click', () => {
        sizeSelected.forEach((sizes) => {
          sizes.style.backgroundColor = 'rgb(255 220 220)';
          sizes.style.color = '#000';
        });

        size.style.backgroundColor = '#000';
        size.style.color = 'white';

        const dataSize = size.getAttribute('data-size');
        const dataSizeCount = size.getAttribute('data-count');

        selectedSize = dataSize;
        selectedSizeCount = dataSizeCount

        retrievedData.size = dataSize;
        sizeStatus = true;
        console.log(selectedSize);
        console.log(dataSizeCount);
        // console.log(retrievedData.size);
      });
    });
  });
};

sizeDisplay();


// ************************************************

const basketData = JSON.parse(localStorage.getItem('basket')) || [];
const basketCount = document.querySelector('.basket sup');
const basketCountDisplay = () => {
    basketCount.textContent = basketData.length;
};

basketCountDisplay()


let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];

const basketAdd = document.querySelector('.add-btn');
basketAdd.addEventListener('click', () => {

  if (!sizeStatus) {
    alert('Səbətə əlavə etməzdən əvvəl ölçü seçin.');
    return;
  }

  const productToAdd = { ...retrievedData, size: selectedSize };
  
  const existingProductIndex = basketProducts.findIndex(
    (product) => product.title === productToAdd.title && product.size === selectedSize
  );
  
  if (existingProductIndex !== -1) {
    basketProducts[existingProductIndex].count = (basketProducts[existingProductIndex].count || 1) + 1;
    basketProducts[existingProductIndex].countMax = selectedSizeCount;
  } else {
    productToAdd.count = 1;
    productToAdd.countMax = selectedSizeCount;
    basketProducts.push(productToAdd);
  }

  const count = basketProducts[existingProductIndex]?.count || 0;

  if (count > selectedSizeCount) {
    alert('Üzr istəyirik, bu məhsul stokda Tükəndi.');
    return;
  }

  localStorage.setItem('basket', JSON.stringify(basketProducts));
  console.log(basketProducts);
  basketCountDisplay();

});






const basket = document.querySelector('.basket')

basket.addEventListener('click', () => {
  window.location.href = "../basket/basket.html"
})





const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');

let burgerMenuOpen = false;

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














const imgDisplay = () => {
  const productImages = document.querySelectorAll('.product-imgs');

  productImages.forEach((img) => {
    img.innerHTML = retrievedData.image.map((imageValue) => `
        <img src="../${imageValue}" alt="">`).join('');
  })
}

imgDisplay();



const exhaustedInfo = document.querySelector('.exhausted-info');

const exhaustedDisplay = () => {
  if (retrievedData.size.length === 0) {
    exhaustedInfo.textContent = `Stokda yoxdur. Sifariş etmək üçün Whatsapp və ya Instagram adresimizlə əlaqə saxlayın.`
  }
}



const imageSlidersDisplay = () => {
  const profileImages = document.getElementById('featured');
  let profileImg = retrievedData.image[0];
  profileImages.src = `../${profileImg}`;

  const sliderImages = document.getElementById('slider');

  sliderImages.innerHTML = retrievedData.image.map((imageValue) => `
    <img class="thumbnail" src="../${imageValue}" alt="">
`).join('');

  const productImages = document.querySelectorAll('.thumbnail');

  productImages.forEach((img, imgIndex) => {
    img.addEventListener('click', () => {
      profileImages.src = `../${retrievedData.image[imgIndex]}`;
    });
  });

}

imageSlidersDisplay();


const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const wrapper = document.getElementById('wrapper');
const slider = document.getElementById('slider');
const sliderImages = document.querySelectorAll('.thumbnail');
const clsContainer = document.querySelector('.cls');

const imageWidth = sliderImages[0].offsetWidth + 10;
const visibleImages = Math.floor(clsContainer.offsetWidth / imageWidth);

window.addEventListener('resize', () => {
  imageWidth = sliderImages[0].offsetWidth + 10;
  visibleImages = Math.floor(clsContainer.offsetWidth / imageWidth);
});


let index = 0;

arrowRight.addEventListener('click', () => {
  if (index < sliderImages.length - visibleImages) {
    index++;
  } else {
    index = 0;
  }
  updateSlider();
});

arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = sliderImages.length - visibleImages;
  }
  updateSlider();
});

function updateSlider() {
  const translateValue = -index * imageWidth;
  slider.style.transform = `translateX(${translateValue}px)`;
}













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
