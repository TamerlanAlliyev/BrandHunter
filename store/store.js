'use strict'

const catalog = document.querySelector('.catalog');
const catalogList = document.querySelector('.catalog-list')
const basket = document.querySelector('.basket')
const headerList = document.querySelector('.header-list');
const burgerMenuIcon = document.querySelector('.burger-menu img');
const burgerMenu = document.querySelector('.burger-menu');
const categoryFilter = document.querySelector(".category-filter")
const filterNameBtn = document.querySelector(".category-name");
const filterNameIcon = document.querySelector(".category-name img");
const filterCategoryBtn = document.querySelector(".category-list");
const subListBtn = document.querySelectorAll(".sub-list");
const firstListBtn = document.querySelectorAll(".first-list")
const firstListArrow = document.querySelectorAll(".first-list img")
const subListLiElment = document.querySelectorAll(".sub-list li")
const subListIcon = document.querySelectorAll(".sub-list li img")
const brandFilter = document.querySelector(".brand-filter")
const brandNameBtn = document.querySelector('.brand-name');
const brandNameIcon = document.querySelector('.brand-name img');
const brandsListEl = document.querySelector('.brands-list');
const brandsLiElement = document.querySelectorAll('.brands-list li')
const brandsListIcon = document.querySelectorAll('.brands-list li img');
const sizeFilter = document.querySelector(".size-filter")
const sizeNameBtn = document.querySelector('.size-name');
const sizeNameIcon = document.querySelector('.size-name img');
const sizesListEl = document.querySelector('.sizes-list');
const sizesLiElement = document.querySelectorAll('.sizes-list li')
const sizesListIcon = document.querySelectorAll('.sizes-list li img');
const colorNameBtn = document.querySelector('.color-name');
const colorNameIcon = document.querySelector('.color-name img');
const colorsListEl = document.querySelector('.colors-list');
const colorsLiElement = document.querySelectorAll('.colors-list li')
const colorsListIcon = document.querySelectorAll('.colors-list li img');
const searchFilter = document.querySelector(".search-filter")
const searchNameBtn = document.querySelector('.search-name');
const searchsListEl = document.querySelector('.searchs-list');
const searchLiElement = document.querySelectorAll('.search-list li')
const productBox = document.querySelectorAll('.product-box');
const categoryList = document.querySelectorAll('.category-list .sub-list li');
const brandList = document.querySelectorAll('.brand-filter li');
const sizesList = document.querySelectorAll('.size-filter li');
const colorList = document.querySelectorAll('.color-filter li');
const subLategoriesLiEl = document.querySelectorAll('.sub-categories li')
const clearFilters = document.querySelector('.clear-filters');
const liElements = document.querySelectorAll('.colors-list li');
const bgColorElements = document.querySelectorAll('.colors-list .bg-color');
const logo = document.querySelector('.logo');
const colorFilter = document.querySelector('.color-filter')


// *******************************************************************************************************************

let catalogOpen = false;
let burgerMenuOpen = false;
let filterName = false;
let brandName = false;
let sizeName = false;
let colorName = false;
let searchName = false;
let categoryArray = [];
let brandArray = [];
let sizeArray = [];
let colorArray = [];
let products;

// *******************************************************************************************************************

let catalogLists = JSON.parse(localStorage.getItem('catalogLists')) || [];
let brandSerachs = JSON.parse(localStorage.getItem('brandSerachs')) || [];

// *******************************************************************************************************************


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
    window.location.href = "../basket/basket.html"
})
burgerMenu.addEventListener('click', () => {
    if (burgerMenuOpen) {
        headerList.style.display = "none";
        burgerMenuIcon.src = "../assets/icons/burger-menu.svg";
        burgerMenuOpen = false;
    } else {
        headerList.style.display = "flex";
        burgerMenuIcon.src = "../assets/icons/x-button.svg";
        burgerMenuOpen = true;
    }

});
logo.addEventListener('click', () => {
    window.location.href = "../index.html";
});

filterNameBtn.addEventListener('click', () => {
    if (filterName) {
        filterCategoryBtn.style.display = "none";
        filterNameBtn.style.backgroundColor = "inherit";
        categoryFilter.style.borderRadius = "1.75rem"
        filterNameIcon.src = "../assets/icons/plus.svg"
        categoryFilter.style.backgroundColor = "#f5f5f5"
        filterName = false;
    } else {
        filterCategoryBtn.style.display = "block";
        filterNameBtn.style.backgroundColor = "rgb(255, 220, 220)";
        categoryFilter.style.borderRadius = "0.75rem"
        filterNameIcon.src = "../assets/icons/minus.svg"
        categoryFilter.style.backgroundColor = "white"
        filterName = true;
    }
});

brandNameBtn.addEventListener('click', () => {
    if (brandName) {
        brandNameBtn.style.backgroundColor = 'inherit'
        brandsListEl.style.display = 'none'
        brandFilter.style.borderRadius = "1.75rem"
        brandNameIcon.src = "../assets/icons/plus.svg"
        brandFilter.style.backgroundColor = "#f5f5f5"
        brandName = false;
    } else {
        brandNameBtn.style.backgroundColor = 'rgb(255, 220, 220)'
        brandsListEl.style.display = 'block'
        brandFilter.style.borderRadius = "0.75rem"
        brandNameIcon.src = "../assets/icons/minus.svg"
        brandFilter.style.backgroundColor = "white"
        brandName = true;
    }
});

sizeNameBtn.addEventListener('click', () => {
    if (sizeName) {
        sizeNameBtn.style.backgroundColor = 'inherit'
        sizesListEl.style.display = 'none'
        sizeFilter.style.borderRadius = "1.75rem"
        sizeNameIcon.src = "../assets/icons/plus.svg"
        sizeFilter.style.backgroundColor = "#f5f5f5"
        sizeName = false;
    } else {
        sizeNameBtn.style.backgroundColor = 'rgb(255, 220, 220)'
        sizesListEl.style.display = 'block'
        sizeFilter.style.borderRadius = "0.75rem"
        sizeNameIcon.src = "../assets/icons/minus.svg"
        sizeFilter.style.backgroundColor = "white"
        sizeName = true;
    }
});

colorNameBtn.addEventListener('click', () => {
    if (colorName) {
        colorNameBtn.style.backgroundColor = 'inherit'
        colorsListEl.style.display = 'none'
        colorFilter.style.backgroundColor = "#f5f5f5"
        colorFilter.style.borderRadius = "1.75rem"
        colorNameIcon.src = "../assets/icons/plus.svg"
        colorName = false;
    } else {
        colorNameBtn.style.backgroundColor = 'rgb(255, 220, 220)'
        colorsListEl.style.display = 'block'
        colorFilter.style.backgroundColor = "white"
        colorFilter.style.borderRadius = "0.75rem"
        colorNameIcon.src = "../assets/icons/minus.svg"
        colorName = true;
    }
});

searchNameBtn.addEventListener('click', () => {
    if (searchName) {
        searchNameBtn.style.backgroundColor = 'inherit'
        searchsListEl.style.display = 'none'
        searchFilter.style.borderRadius = "1.75rem"
        searchFilter.style.backgroundColor = "#f5f5f5"
        searchName = false;
    } else {
        searchNameBtn.style.backgroundColor = 'rgb(255, 220, 220)'
        searchsListEl.style.display = 'block'
        searchFilter.style.borderRadius = "0.75rem"
        searchFilter.style.backgroundColor = "white"
        searchName = true;
    }
});

clearFilters.addEventListener('click', () => {
    categoryArray = [];
    brandArray = [];
    sizeArray = [];
    colorArray = [];
    catalogLists = [];
    brandSerachs = [];
    localStorage.setItem('catalogLists', JSON.stringify(catalogLists));
    localStorage.setItem('brandSerachs', JSON.stringify(brandSerachs));

    subListLiElment.forEach((list, index) => {
        subListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    brandsLiElement.forEach((list, index) => {
        brandsListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    sizesLiElement.forEach((list, index) => {
        sizesListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    colorsLiElement.forEach((list, index) => {
        colorsListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    });

    sizesLiDisplay();
    subLiDisplay();
    brandsLiDisplay();
    colorsLiDisplay();

    getProduct();

});


const clearFilers = () => {
    categoryArray = [];
    brandArray = [];
    sizeArray = [];
    colorArray = [];
    catalogLists = [];
    brandSerachs = [];
    localStorage.setItem('catalogLists', JSON.stringify(catalogLists));
    localStorage.setItem('brandSerachs', JSON.stringify(brandSerachs));

    subListLiElment.forEach((list, index) => {
        subListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    brandsLiElement.forEach((list, index) => {
        brandsListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    sizesLiElement.forEach((list, index) => {
        sizesListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    })

    colorsLiElement.forEach((list, index) => {
        colorsListIcon[index].src = ""
        list.style.backgroundColor = "inherit"
    });

    sizesLiDisplay();
    subLiDisplay();
    brandsLiDisplay();
    colorsLiDisplay();
    getProduct();
}



// *******************************************************************************************************************


firstListBtn.forEach((firstListBtn, index) => {
    let firstList = false;

    firstListBtn.addEventListener('click', () => {
        if (firstList) {
            firstListBtn.style.backgroundColor = "inherit"
            subListBtn[index].style.display = "none"
            firstListArrow[index].style.transform = "rotate(0deg)"
            firstList = false;
        } else {
            firstListBtn.style.backgroundColor = "#f5f5f5"
            subListBtn[index].style.display = "block"
            firstListArrow[index].style.transform = "rotate(180deg)"
            firstList = true;
        }
    })

})

searchLiElement.forEach((list) => {
    let clicked = false
    list.addEventListener('click', () => {
        if (clicked) {
            list.style.backgroundColor = "inherit"
            clicked = false
        } else {
            list.style.backgroundColor = "#f5f5f5"
            clicked = true
        }
    })
})

productBox.forEach((box) => {
    box.addEventListener('click', () => {
        window.location.href = "../product/product.html"
    })
})

// C A T E G O R Y
categoryList.forEach((category) => {
    category.addEventListener('click', () => {
        const dataset = Object.values(category.dataset);

        const existingIndex = categoryArray.findIndex(item => JSON.stringify(item) === JSON.stringify(dataset));
        if (existingIndex !== -1) {
            categoryArray.splice(existingIndex, 1);
        } else {
            categoryArray.push(dataset);
        }

        catalogLists = [];
        localStorage.setItem('catalogLists', JSON.stringify(catalogLists));

        filterAndDisplayProducts();
    });
});

// B R A N D S
brandList.forEach((brand) => {
    brand.addEventListener('click', () => {
        const dataset = Object.values(brand.dataset);

        const existingIndex = brandArray.findIndex(item => JSON.stringify(item) === JSON.stringify(dataset));
        if (existingIndex !== -1) {
            brandArray.splice(existingIndex, 1);
        } else {
            brandArray.push(dataset);
        }




        filterAndDisplayProducts();
    });
});

// S I Z E
sizesList.forEach((size) => {
    size.addEventListener('click', () => {
        const dataset = Object.values(size.dataset);

        const existingIndex = sizeArray.findIndex(item => JSON.stringify(item) === JSON.stringify(dataset));
        if (existingIndex !== -1) {
            sizeArray.splice(existingIndex, 1);
        } else {
            sizeArray.push(dataset);
        }

        filterAndDisplayProducts();
    });
});

// C O L O R
colorList.forEach((color) => {
    color.addEventListener('click', () => {
        const dataset = Object.values(color.dataset);

        const existingIndex = colorArray.findIndex(item => JSON.stringify(item) === JSON.stringify(dataset));
        if (existingIndex !== -1) {
            colorArray.splice(existingIndex, 1);
        } else {
            colorArray.push(dataset);
        }

        filterAndDisplayProducts();
    });
});

subLategoriesLiEl.forEach((category) => {
    category.addEventListener('click', () => {
        catalogLists = [];
        catalogLists = Object.values(category.dataset);
        console.log(catalogLists);
        localStorage.setItem('catalogLists', JSON.stringify(catalogLists));
        getProduct();
    });
});

liElements.forEach((liElement, index) => {
    const colorValue = liElement.dataset.color;
    bgColorElements[index].style.backgroundColor = colorValue;
    console.log(colorValue);
});


// *******************************************************************************************************************


const toggleCatalogList = () => {
    if (catalogOpen) {
        catalogList.style.display = "none";
        catalogOpen = false;
    } else {
        catalogList.style.display = "block";
        catalogOpen = true;
    }
}

const subLiDisplay = () => {
    subListLiElment.forEach((list, index) => {
        let iconImg = false
        list.addEventListener('click', () => {
            if (iconImg) {
                list.style.backgroundColor = "inherit"
                subListIcon[index].src = ""
                iconImg = false
            } else {
                list.style.backgroundColor = "#f5f5f5"
                subListIcon[index].src = "../assets/icons/ok.svg"
                iconImg = true
            }
        })
    })
}

const brandsLiDisplay = () => {
    brandsLiElement.forEach((list, index) => {
        let clicked = false
        list.addEventListener('click', () => {
            if (clicked) {
                brandsListIcon[index].src = ""
                list.style.backgroundColor = "inherit"
                clicked = false
            } else {
                brandsListIcon[index].src = "../assets/icons/ok.svg"
                list.style.backgroundColor = "#f5f5f5"
                clicked = true
            }
        })
    })
}

const sizesLiDisplay = () => {
    sizesLiElement.forEach((list, index) => {
        let clicked = false
        list.addEventListener('click', () => {
            if (clicked) {
                sizesListIcon[index].src = ""
                list.style.backgroundColor = "inherit"
                clicked = false
            } else {
                sizesListIcon[index].src = "../assets/icons/ok.svg"
                list.style.backgroundColor = "#f5f5f5"
                clicked = true
            }
        })
    })
}

const colorsLiDisplay = () => {
    colorsLiElement.forEach((list, index) => {
        let clicked = false
        list.addEventListener('click', () => {
            if (clicked) {
                colorsListIcon[index].src = ""
                list.style.backgroundColor = "inherit"
                clicked = false
            } else {
                colorsListIcon[index].src = "../assets/icons/ok.svg"
                list.style.backgroundColor = "#f5f5f5"
                clicked = true
            }
        })
    })
}

const brandSeachDisplay = () => {
    let brandSerachs = JSON.parse(localStorage.getItem('brandSerachs')) || [];
    brandArray = brandSerachs
    brandSerachs = [];
}

const getProduct = async () => {
    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();

        const filteredProducts = filterProducts(data);

        displayProduct(filteredProducts);

        return filteredProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

const filterProducts = (data) => {
    return data.filter((product) => {
        const categoryCondition =
            categoryArray.length === 0 ||
            categoryArray.some(category => product.productName.includes(category));

        const brandCondition =
            brandArray.length === 0 ||
            brandArray.some(category => product.brandTitle.includes(category));

        const searchBrandCondition =
            brandArray.length === 0 ||
            brandArray.some(category => product.brandTitle.includes(category));

        const colorCondition =
            colorArray.length === 0 ||
            colorArray.some(category => product.color.includes(category));

        console.log(colorArray.some(category => product.color.includes(category)));

        const catalogCondition =
            catalogLists.length === 0 ||
            catalogLists.some(category => product.productName.includes(category));

        const flattenedSizeArray = sizeArray.flat();

        const sizeCondition =
            flattenedSizeArray.length === 0 ||
            (product.size && Object.keys(product.size).some((sizeFilter) => flattenedSizeArray.includes(sizeFilter) && product.size[sizeFilter] > 0));

        return categoryCondition && colorCondition && sizeCondition && brandCondition && catalogCondition && searchBrandCondition;

    });
}

const displayProduct = (products) => {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = "";

    if (!products) {
        console.error("Products array is undefined.");
        return;
    }

    products.forEach((product) => {
        const { id, title, price, image, discountOffer, discount } = product;
        let currentprice = discountOffer ? price - discount : price;

        const discountHtml = discountOffer ? `<p class="dis-price"> ₼ ${price.toFixed(2)}</p>` : '';

        const productDiv = document.createElement('div');
        productDiv.classList.add('product-box');
        productDiv.setAttribute('data-id', id);

        productDiv.innerHTML += `
            <div class="box-img">
                <img src="../${image[0]}" alt="">
            </div>
            <div class="box-info">
                <a href="./store.html" class="product-name">${title}</a>
                <div class="product-price">${discountHtml} ₼ ${currentprice.toFixed(2)}</div>
            </div>
        `;

        productContainer.appendChild(productDiv);


        function initPagination() {
            const products = document.querySelectorAll(".product-box");
            const itemsPerPage = 12;
            let currentPage = 1;

            function displayProducts(page) {
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                products.forEach((product, index) => {
                    if (index >= startIndex && index < endIndex) {
                        product.style.display = "block";
                    } else {
                        product.style.display = "none";
                    }
                });
            }

            function setupPagination() {
                const pageCount = Math.ceil(products.length / itemsPerPage);
                const paginationContainer = document.getElementById("pagination");

                paginationContainer.innerHTML = "";

                const pagPrevious = document.createElement("div");
                pagPrevious.classList.add("pag-previous");
                pagPrevious.textContent = "Əvvəlki";
                pagPrevious.addEventListener("click", function () {
                    if (currentPage > 1) {
                        currentPage--;
                        displayProducts(currentPage);
                        updateActiveButton();
                    }
                });
                paginationContainer.appendChild(pagPrevious);

                const pagNumContainer = document.createElement("div");
                pagNumContainer.classList.add("pag-num");

                for (let i = 1; i <= pageCount; i++) {
                    const pageButton = document.createElement("div");
                    pageButton.classList.add("num");
                    pageButton.textContent = i;

                    if (i === currentPage) {
                        pageButton.classList.add("active");
                    }

                    pageButton.addEventListener("click", function () {
                        currentPage = i;
                        displayProducts(currentPage);
                        updateActiveButton();
                    });
                    pagNumContainer.appendChild(pageButton);
                }

                paginationContainer.appendChild(pagNumContainer);

                const pagNext = document.createElement("div");
                pagNext.classList.add("pag-next");
                pagNext.textContent = "Növbəti";
                pagNext.addEventListener("click", function () {
                    if (currentPage < pageCount) {
                        currentPage++;
                        displayProducts(currentPage);
                        updateActiveButton();
                    }
                });
                paginationContainer.appendChild(pagNext);

                updateActiveButton();
            }

            function updateActiveButton() {
                const buttons = document.querySelectorAll("#pagination .pag-num .num");
                buttons.forEach((button, index) => {
                    if (index + 1 === currentPage) {
                        button.classList.add("active");
                    } else {
                        button.classList.remove("active");
                    }
                });
            }

            displayProducts(currentPage);
            setupPagination();
        }


        initPagination();



        const currentProductPrice = productDiv.querySelector('.product-price');
        const currentDisPrice = productDiv.querySelector('.dis-price');

        if (discountOffer) {
            currentProductPrice.style.color = 'black';
            currentDisPrice.style.color = 'red';
            currentDisPrice.style.fontSize = '14px';
            currentDisPrice.style.textDecoration = 'line-through';
        }

        productDiv.addEventListener('click', () => {
            const clickedProductId = productDiv.getAttribute('data-id');
            const clickedProduct = products.find((product) => product.id == parseInt(clickedProductId));

            console.log(clickedProduct);
            localStorage.setItem('clickedProduct', JSON.stringify(clickedProduct));
            console.log(` ID ${clickedProductId} clicked!`);
            window.location.href = "../product/product.html";
        });
    });
}

const filterAndDisplayProducts = async () => {
    const filteredProducts = await getProduct();
    displayProduct(filteredProducts);
}


// *******************************************************************************************************************


subLiDisplay()
brandsLiDisplay();
sizesLiDisplay()
colorsLiDisplay()
brandSeachDisplay()
getProduct();












const basketData = JSON.parse(localStorage.getItem('basket')) || [];
const basketCount = document.querySelector('.basket sup');
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
