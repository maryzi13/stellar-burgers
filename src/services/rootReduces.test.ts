import { rootReducer } from './store';

describe('rootReducer', () => {
  it('корректно инициализирует начальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      auth: {
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      orderDetails: {
        order: null,
        isLoading: false,
        error: null
      }
    });
  });
});
