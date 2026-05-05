import { rootReducer } from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { authReducer } from './slices/authSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';
import { orderDetailsReducer } from './slices/orderDetailsSlice';

describe('rootReducer', () => {
  it('корректно инициализирует начальное состояние', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, action),
      auth: authReducer(undefined, action),
      burgerConstructor: constructorReducer(undefined, action),
      order: orderReducer(undefined, action),
      feed: feedReducer(undefined, action),
      profileOrders: profileOrdersReducer(undefined, action),
      orderDetails: orderDetailsReducer(undefined, action)
    });
  });
});
