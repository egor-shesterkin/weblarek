/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const settings = {
      catalogChanged: 'catalog:changed',
      basketOpen: 'basket:open',
      cardSelect: 'card:select',
      modalOpen: 'modal:open',
      modalClose: 'modal:close',
      basketChanged: 'basket:changed',
      orderOpen: 'order:open',
      buyProduct: 'product:buy',
      removeProduct: 'product:remove',
      removeProductFromBasket: 'basket:remove product',
      cardChanged: 'card:changed',
      orderSubmit: 'order:submit',
      contactsSubmit: 'contacts:submit',
      addressChanged: 'address:change',
      emailChanged: 'email:change',
      phoneChanged: 'phone:change',
      paymentCard: 'payment:card',
      paymentCash: 'payment:cash',
      buyerChanged: 'buyer:changed',
      formErrorsChanged: 'formErrors:change',
      buyerDataCleared: 'buyerData:cleared',
  };

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};