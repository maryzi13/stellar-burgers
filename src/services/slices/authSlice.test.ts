import { authReducer } from './authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  it('обрабатывает loginUser.pending', () => {
    const action = { type: 'auth/loginUser/pending' };
    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает loginUser.fulfilled', () => {
    const action = {
      type: 'auth/loginUser/fulfilled',
      payload: {
        user: { email: 'test@test.com', name: 'Test' }
      }
    };

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(action.payload.user);
  });

  it('обрабатывает loginUser.rejected', () => {
    const action = {
      type: 'auth/loginUser/rejected',
      error: { message: 'Ошибка авторизации' }
    };

    const state = authReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Ошибка авторизации');
  });
});
