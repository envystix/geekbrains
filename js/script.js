'use strict';

// Меню на главной
/* document.querySelector(".header__right-menu").onclick = function() {
    document.querySelector(".header__menu-overlay").classList.add("menu-active");
   }
   
   document.querySelector(".header__menu-close-btn").onclick = function() {
    document.querySelector(".header__menu-overlay").classList.remove("menu-active");
   } */

// Товары

let currencyId = 0;
class Currency {
    /** Конструктор валют
     * @param {string} title - Название валюты
     * @param {string} shortname - Буквенный код валюты (3 заглавные буквы, латиница)
     * @param {string} symbol - Символ валюты (юникод-символ/мнемоника)
     * @param {number} position - Расположение символа валюты (0 - перед ценой, 1 - после цены)
     */
    constructor(title, shortname, symbol, position) {
        this.id = currencyId++;
        this.title = title;
        this.shortname = shortname;
        this.symbol = symbol;
        this.position = position;
    }
    /** Метод получения цены с символом валюты
     * @param {number} price - Значение цены
     * @returns {string} Возвращает значение цены с символом валюты для подстановки в HTML-код
     */
    getPrice(price) {
        if (this.position == 1) {
            return `${price} ${this.symbol}`;
        } else if (this.position == 0) {
            return `${this.symbol} ${price}`;
        } else {
            console.log('Неверное значение объекта валюты');
        }
    }
}

let productId = 0;
class Product {
    /** Конструктор товаров
     * @constructor
     * @param {string} title - Название товара
     * @param {string} description - Краткое описание товара
     * @param {number} price - Цена товара
     * @param {number} currencyId - ID валюты товара (из константы currencyList)
     * @param {string} pictureName - Название файла картинки [имя].[расширение]
     * @param {string} pageLink - Ссылка на страницу товара
     * @param {number} salesCounter - Счетчик количества продаж товара
     * @param {string} publicationDate - Дата публикации товара в формате (Год-месяц-день)
     * @param {number} quantity - Выбранное пользователем количество товара
     * @param {number} amount - Количество товара на складе
     */
    constructor(title, description, price, currencyId, pictureName, pageLink, salesCounter, publicationDate, quantity, amount) {
        this.id = productId++;
        this.title = title;
        this.description = description;
        this.price = price;
        this.currency = currencyList[currencyId];
        this.priceHtml = currencyList[currencyId].getPrice(price);
        this.picture = `img/${pictureName}`;
        this.pageLink = pageLink;
        this.salesCounter = salesCounter;
        this.publicationDate = new Date(publicationDate);
        this.quantity = quantity;
        this.amount = amount;
    }
    /** Метод генерации полной карточки товара
     * 
     * @param {object} parentElement - Блок, куда необходимо разместить карточку товара
     * @returns {string} Возвращает HTML-код карточки товара
     */
    getFullProductCard(parentElement) {
        if (parentElement != null) {
            return parentElement.insertAdjacentHTML('beforeend', `
            <div class="main__featured_cards-card_${this.id} product-card product-card-hover">
                <div class="main__featured_cards-card_${this.id}-img-wrapper product-card-img-wrapper">
                    <div class="main__featured_cards-card_${this.id}-img-hover product-card-hover-img">
                        <button id="${this.id}" class="main__featured_cards-card_${this.id}-img-hover-btn product-card-hover-btn">
                            <svg class="product-card-hover-btn-icon" width="26" height="24" viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z"/>
                            </svg>
                            В корзину
                        </button>
                    </div>
                    <img src="${this.picture}" alt="${this.title}" class="main__featured_cards-card_${this.id}-img product-card-img">
                </div>
                <a class="main__featured_cards-link product-card-link" href="${this.pageLink}">
                    <div class="main__featured_cards-card_${this.id}-description product-card-text">
                        <h3 class="main__featured_cards-card_${this.id}-description-title product-card-title">${this.title}</h3>
                        <p class="main__featured_cards-card_${this.id}-description-subtitle product-card-description">${this.description}</p>
                        <p class="main__featured_cards-card_${this.id}-description-cost product-card-cost">${this.priceHtml}</p>
                    </div>
                </a>
            </div>`);
        }
    }
    checkAvailability(quantity) {
        if (this.amount / quantity > 0) {
            return true;
        } else {
            return false;
        }
    }
    checkInteger(quantity) {
        if (quantity % 1 == 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Cloth extends Product {
    constructor(title, description, price, currencyId, pictureName, pageLink, salesCounter, publicationDate, quantity, amount, skuColor, skuSize) {
        super(title, description, price, currencyId, pictureName, pageLink, salesCounter, publicationDate, quantity, amount);
        this.skuColor = skuColor;
        this.skuSize = skuSize;
    }
    getShortProductCard(parentElement) {
        if (parentElement != null) {
            return parentElement.insertAdjacentHTML('beforeend', `
            <div class="main__cart_content-cards-item_${this.id} cart-item">
                    <a href="${this.pageLink}" class="main__cart_content-cards-item_${this.id}-link cart-item-imglink">
                        <img class="main__cart_content-item_${this.id}-img cart-item-imglink-img" src="${this.picture}" alt="${this.title}">
                    </a>
                    <div class="main__cart_content-cards-item_${this.id}-description cart-item-description">
                        <div class="main__cart_content-cards-item_${this.id}-description-text cart-item-description-text">
                            <a href="product.html" class="main__cart_content-cards-item_${this.id}-description-text-link">
                                <h3 class="main__cart_content-cards-item_${this.id}-description-text-link-title cart-item-description-text-title">${this.title}</h3>
                            </a>
                            <p class="main__cart_content-cards-item_${this.id}-description-text-options cart-item-description-text-options">Price: <span class="cart-item-text-pink">${this.priceHtml}</span></p>
                            <p class="main__cart_content-cards-item_${this.id}-description-text-options cart-item-description-text-options">Color: <span class="cart-item-text-grey">${this.skuColor}</span></p>
                            <p class="main__cart_content-cards-item_${this.id}-description-text-options cart-item-description-text-options">Size: <span class="cart-item-text-grey">${this.skuSize}</span></p>
                            <p class="main__cart_content-cards-item_${this.id}-description-text-options cart-item-description-text-options">Quantity: <input class="cart-item-input" type="text" pattern="^[0-9]+$" value="${this.quantity}"></p>
                        </div>
                        <div class="main__cart_content-cards-item_${this.id}-description-delete close-btn">
                            <a href="#" class="main__cart_content-cards-item_${this.id}-decription-delete-btn cart-item-description-delete">
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
            </div>`);
        }
    }
}
class ProductList {
    /** Конструктор списка товаров
     * 
     * @param {array} products - Список товаров
     * @param {string} container - Контейнер, в котором будет сгенерирована карточка товара ('тег' или '.класс')
     * @param {number} quantity - Количество карточек товара для вывода в контейнер
     */
    constructor(products, container, quantity) {
        this.products = products;
        this.container = document.querySelector(container);
        this.quantity = quantity;
    }
    /** Метод сортировки списка товаров по популярности. Выводит полную карточку товара
     * 
     * @param {string} order - Направление сортировки. Может принимать значения 'ascending' или 'descending'
     */
    sortFeaturedFull(order = 'ascending') {
        if (order == 'ascending') {
            this.products.sort((a, b) => a.salesCounter - b.salesCounter);
            for (let i = 0; i < this.quantity; i++) {
                this.products[i].getFullProductCard(this.container);
            }
        } else if (order == 'descending') {
            this.products.sort((a, b) => b.salesCounter - a.salesCounter);
            for (let i = 0; i < this.quantity; i++) {
                this.products[i].getFullProductCard(this.container);
            }
        } else {
            console.log('Неверное значение сортировки');
        }
    }
    /** Метод сортировки списка товаров по новизне. Выводит полную карточку товара
     * 
     * @param {string} order - Направление сортировки. Может принимать значения 'ascending' или 'descending'
     */
    sortNewFull(order = 'ascending') {
        if (order == 'ascending') {
            this.products.sort((a, b) => a.publicationDate - b.publicationDate);
            for (let i = 0; i < this.quantity; i++) {
                this.products[i].getFullProductCard(this.container);
            }
        } else if (order == 'descending') {
            this.products.sort((a, b) => b.publicationDate - a.publicationDate);
            for (let i = 0; i < this.quantity; i++) {
                this.products[i].getFullProductCard(this.container);
            }
        } else {
            console.log('Неверное значение сортировки');
        }
    }
}

class Cart {
    constructor(products, container) {
        this.products = products;
        this.container = container;
        this.selectedProducts = [];
        this.counter = 0;
        this.subtotal = 0;
        this.subtotalHTML = '';
        this.discount = 0;
        this.total = 0;
        this.totalHTML = '';
    }
    setSubtotal(price, quantity) {
        return price * quantity;
    }
    setTotal(subtotal, discount) {
        return subtotal - subtotal * discount;
    }
    getPrice(price) {
        return currencyList[this.currencyId].getPrice(price)
    }
    addToCart(id) {
        let item = this.products.forEach((item) => {
            if (item.id == id) {
                return item;
            }
        });
        if (this.selectedProducts.includes(item)) {
            item.quantity++;
            if (item.checkAvailability(item.quantity)) {
                this.counter++;
                this.subtotal += this.setSubtotal(item.price, item.quantity);
                this.total += this.setTotal(this.subtotal, this.discount);
                this.subtotalHTML = this.getPrice(this.subtotal);
                this.totalHTML = this.getPrice(this.total);
            } else {
                item.quantity--;
            }
        } else {
            item.quantity++;
            if (item.checkAvailability(item.quantity)) {
                this.counter++;
                this.selectedProducts.push(item);
                this.subtotal += this.setSubtotal(item.price, item.quantity);
                this.total += this.setTotal(this.subtotal, this.discount);
                this.subtotalHTML = this.getPrice(this.subtotal);
                this.totalHTML = this.getPrice(this.total);
            } else {
                item.quantity--;
            }
        }
        console.log(quantity);
    }
    initCart() {
        let cartButton = document.querySelectorAll('.product-card-hover-btn');
        cartButton.forEach((item) => {
            addEventListener('click', () => cart.addToCart(item.id));
        });
    }
}

const currencyList = [
    new Currency('Доллар США', 'USD', '&dollar;', 0),
    new Currency('Евро', 'EUR', '&euro;', 0),
    new Currency('Рубль', 'RUB', '₽', 1),
];

const products = [
    new Cloth('Всесезонная куртка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 13500, 2, 'card-1.jpg', 'product.html', 530, '2021-07-11', 0, 5, 'Red', 'XL'),
    new Cloth('Элегантный костюм', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 7200, 2, 'card-2.jpg', 'product.html', 500, '2021-01-02', 0, 5, 'Red', 'XL'),
    new Cloth('Необычное худи', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 2300, 2, 'card-3.jpg', 'product.html', 480, '2021-06-28', 0, 5, 'Red', 'XL'),
    new Cloth('Курортные чинос', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 3100, 2, 'card-4.jpg', 'product.html', 420, '2021-06-21', 0, 5, 'Red', 'XL'),
    new Cloth('Деловой пиджак', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 2500, 2, 'card-5.jpg', 'product.html', 400, '2021-01-05', 0, 5, 'Red', 'XL'),
    new Cloth('Облегченная рубашка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 1700, 2, 'card-6.jpg', 'product.html', 397, '2021-01-06', 0, 5, 'Red', 'XL'),
    new Cloth('Повседневная куртка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 3700, 2, 'card-7.jpg', 'product.html', 231, '2021-07-01', 0, 5, 'Red', 'XL'),
    new Cloth('Летний свитшот', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 2100, 2, 'card-10.jpg', 'product.html', 206, '2021-06-17', 0, 5, 'Red', 'XL'),
    new Cloth('Белая футболка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 999, 2, 'card-11.jpg', 'product.html', 183, '2021-06-12', 0, 5, 'Red', 'XL'),
    new Cloth('Деловая рубашка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 1700, 2, 'card-12.jpg', 'product.html', 151, '2021-06-11', 0, 5, 'Red', 'XL'),
    new Cloth('Стильная косуха', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 4200, 2, 'card-13.jpg', 'product.html', 123, '2021-06-07', 0, 5, 'Red', 'XL'),
    new Cloth('Повседневная рубашка', 'Known for her sculptural takes on&nbsp;traditional tailoring, \
    Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with Moda Operandi.', 1300, 2, 'card-14.jpg', 'product.html', 113, '2021-05-28', 0, 5, 'Red', 'XL'),
];

const productListFeatured = new ProductList(products, '.featured-cards', 6);
productListFeatured.sortFeaturedFull('descending');

const productListNew = new ProductList(products, '.new-cards', 9);
productListNew.sortNewFull('descending');

const cart = new Cart(products, '.cart-items');
cart.initCart();