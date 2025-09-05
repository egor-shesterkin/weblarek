import { IProduct } from './types/index';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Products } from './components/Models/Products';
import { StoreAPI } from './components/StoreAPI';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';

const productsModel = new Products();
productsModel.setItems(apiProducts.items);

const buyerModel = new Buyer();
buyerModel.setBuyerData({
    // payment: 'card',
    // email: 'email',
    phone: 'phone',
    address: 'address'
});

const basketModel = new Basket();

console.log(`Массив товаров из каталога: `, productsModel.getItems());
console.log(`Товар из каталога по его id`, productsModel.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'));

productsModel.setItem(apiProducts.items[1]);

console.log(`Товар для подробного отображения`, productsModel.getItem());

const api = new Api(API_URL);
const storeAPI = new StoreAPI(CDN_URL, api);

storeAPI.getProductList()
    .then((data => {
        console.log(`Товары с сервера: `, data);
        productsModel.setItems(data);
        console.log(`Массив товаров в моделе, полученных с сервера: `, productsModel.getItems())
    }));

storeAPI.buyProducts({
    "payment": "card",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
}).then(data => console.log(`Произошла покупка`, data));

console.log(`Данные покупателя`, buyerModel.getBuyerData());

console.log(`Валидация данных покупателя`, buyerModel.validateBuyerData());

buyerModel.clearBuyerData();
console.log(`Данные покупателя очищены`, buyerModel.getBuyerData());

basketModel.setProductInBasket(apiProducts.items[0]);
basketModel.setProductInBasket(apiProducts.items[1]);
basketModel.setProductInBasket(apiProducts.items[2]);

console.log(`Товары в корзине`, basketModel.getProductsInBasket());
console.log(`Стоимость всех товаров в корзине`, basketModel.getCostOfProductsInBasket());
console.log(`Количество товаров в корзине`, basketModel.getNumberOfProductsInBasket());
console.log(`Наличие товара в корзине`, basketModel.getProductInBasket('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));

basketModel.clearProductInBasket('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log(`Товар удалён из корзины`, basketModel.getProductsInBasket());


basketModel.clearBasket();
console.log(`Корзина очищена`, basketModel.getProductsInBasket());