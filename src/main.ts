import { Success } from './components/views/Success';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Products } from './components/Models/Products';
import { StoreAPI } from './components/StoreAPI';
import './scss/styles.scss';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { CardCatalog } from './components/views/Card/CardCatalog';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/views/Gallery';
import { Header } from './components/views/Header';
import { Modal } from './components/views/Modal';
import { IBuyer, IProduct } from './types';
import { CardPreview } from './components/views/Card/CardPreview';
import { BasketView } from './components/views/BasketView';
import { CardBasket } from './components/views/Card/CardBasket';
import { FormOrder } from './components/views/Form/FormOrder';
import { FormContacts } from './components/views/Form/FormContacts';

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const headerContainer = ensureElement<HTMLElement>('.header');
const page__wrapper = ensureElement<HTMLElement>('.page__wrapper');
const events = new EventEmitter();
const header = new Header(events, headerContainer);

// Чтобы мониторить все события, для отладки
// events.onAll(({ eventName, data }) => {
//     console.log(eventName, data);
// })

const api = new Api(API_URL);
const storeAPI = new StoreAPI(CDN_URL, api);
const productsModel = new Products(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);
const order = new FormOrder(cloneTemplate(orderFormTemplate), events);
const contacts = new FormContacts(cloneTemplate(contactsFormTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);
const gallery = new Gallery(document.body, events);
const modal = new Modal(modalContainer, events);

// Получить доступные товары по API с сервера
storeAPI
    .getProductList()
    .then((data => {
        productsModel.setItems(data);
    }))
    .catch((err) => console.error(err));

// Отобразить карточки в общем каталоге и отправить событие для её детального просмотра по нажатию на неё
events.on(settings.catalogChanged, () => {
    const itemCards = productsModel.getItems().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit(settings.cardSelect, item),
        });
        return card.render(item);
    });

    gallery.render({ catalog: itemCards });
});

//отрисовываем и открываем модальное окно при нажатии на карточку и блокируем прокрутку страницы
events.on(settings.cardSelect, (item: IProduct) => {
    productsModel.setItem(item);
    const productInBasket = basketModel.getProductInBasket(item.id);
    const product = productsModel.getItem();
    if (productInBasket) {
        const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, {
            onClick: () => events.emit(settings.removeProduct, item),
        });
        card.buttonName = 'Удалить из корзины';
        modal.render({ content: card.render(product) });
    }
    else {
        const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, {
            onClick: () => events.emit(settings.buyProduct, item),
        });
        if (product.price === null) {
            card.buttonName = 'Недоступно';
            card.disableButton();
        }
        modal.render({ content: card.render(product) });
    }

    page__wrapper.classList.add('page__wrapper_locked');
});

//закрываем модальное окно при получении события и разблокируем прокрутку страницы
events.on(settings.modalClose, () => {
    modal.close();
    productsModel.setItem({
        id: "",
        description: "",
        image: "",
        title: "",
        category: "",
        price: null
    });
    page__wrapper.classList.remove('page__wrapper_locked');
});

const basketView = new BasketView(cloneTemplate(basketTemplate), events);

// Открыть корзину с главной страницы
events.on(settings.basketOpen, () => {
    const totalCost = basketModel.getCostOfProductsInBasket();
    const basketCards = basketModel.getProductsInBasket().map((item, index) => {
        const cardInBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit(settings.removeProductFromBasket, item),
        });
        cardInBasket.index = (index + 1).toString();
        return cardInBasket.render(item);
    });

    modal.render({ content: basketView.render({ items: basketCards, total: totalCost }) });
    page__wrapper.classList.add('page__wrapper_locked');
});

// Добавить товар в корзину
events.on(settings.buyProduct, (item: IProduct) => {
    if (!basketModel.getProductInBasket(item.id)) {
        basketModel.setProductInBasket(item);
    }

})

// События при изменении состава корзины
events.on(settings.basketChanged, () => {
    const counter = basketModel.getNumberOfProductsInBasket();
    header.counter = counter;
    const totalCost = basketModel.getCostOfProductsInBasket();
    const basketCards = basketModel.getProductsInBasket().map((item, index) => {
        const cardInBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit(settings.removeProductFromBasket, item),
        });
        cardInBasket.index = (index + 1).toString();
        return cardInBasket.render(item);
    });
    basketView.render({ items: basketCards, total: totalCost });
})

// Удаление товара из корзины
events.on(settings.removeProduct, (item: IProduct) => {
    if (basketModel.getProductInBasket(item.id))
        basketModel.clearProductInBasket(item.id);
})

events.on(settings.removeProductFromBasket, (item: IProduct) => {
    if (basketModel.getProductInBasket(item.id))
        basketModel.clearProductInBasket(item.id);
})

//Перерисовка деталей карточки при добавлении/удалении товара из корзины
events.on(settings.cardChanged, (item: IProduct) => {
    const productInBasket = basketModel.getProductInBasket(item.id);
    const product = productsModel.getItem();
    if (product.id !== '') {
        if (productInBasket) {
            const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, {
                onClick: () => events.emit(settings.removeProduct, item),
            });
            card.buttonName = 'Удалить из корзины';
            modal.render({ content: card.render(product) });
        }
        else {
            const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events, {
                onClick: () => events.emit(settings.buyProduct, item),
            });
            modal.render({ content: card.render(product) });
        }
    }
})

events.on(settings.orderOpen, () => {
    modal.render({ content: order.render() });
})

events.on(settings.paymentCard, () => {
    buyerModel.setBuyerData({ ...buyerModel, payment: 'card' });
    order.payment = 'card';
})

events.on(settings.paymentCash, () => {
    buyerModel.setBuyerData({ ...buyerModel, payment: 'cash' });
    order.payment = 'cash';
})

events.on(settings.addressChanged, (value: IBuyer) => {
    buyerModel.setBuyerData({ ...buyerModel, address: value.address });
})

events.on(settings.buyerChanged, () => {
    buyerModel.validateBuyerData();
})

events.on(settings.emailChanged, (value: IBuyer) => {
    buyerModel.setBuyerData({ ...buyerModel, email: value.email });
})

events.on(settings.phoneChanged, (value: IBuyer) => {
    buyerModel.setBuyerData({ ...buyerModel, phone: value.phone });
})

events.on(settings.orderSubmit, () => {
    modal.render({ content: contacts.render() });
    contacts.errors = '';
})

events.on(settings.buyerDataCleared, () => {
    order.payment = '';
    order.address = '';
    contacts.email = '';
    contacts.phone = '';
})

// Изменилось состояние валидации формы
events.on(settings.formErrorsChanged, (errors: Partial<IBuyer>) => {
    const { payment, address, email, phone } = errors;
    order.isValid = !payment && !address;
    contacts.isValid = !email && !phone;
    order.errors = Object.values({ payment, address }).filter(error => !!error).join('; ');
    contacts.errors = Object.values({ email, phone }).filter(error => !!error).join('; ');
});

events.on(settings.contactsSubmit, () => {
    const buyer = buyerModel.getBuyerData();
    const products = basketModel.getProductsInBasket();
    const items = products.map(product => product.id)

    storeAPI.buyProducts({
        payment: buyer.payment,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
        total: basketModel.getCostOfProductsInBasket(),
        items: items
    }).then(data => {
        success.cost = data.total;
        basketModel.clearBasket();
        buyerModel.clearBuyerData();
        modal.render({ content: success.render() });
    });

})