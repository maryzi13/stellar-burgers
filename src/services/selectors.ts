import { RootState } from './store';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;

export const selectUser = (state: RootState) => state.auth.user;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

export const selectOrderDetails = (state: RootState) =>
  state.orderDetails.order;

export const selectOrderDetailsLoading = (state: RootState) =>
  state.orderDetails.isLoading;

export const selectFeedTotal = (state: RootState) => state.feed.total;

export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
