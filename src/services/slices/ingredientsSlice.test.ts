import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';

import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  it('обрабатывает pending', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('обрабатывает rejected', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
