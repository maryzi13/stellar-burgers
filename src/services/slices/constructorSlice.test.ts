import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredient,
  removeIngredient
} from './constructorSlice';

import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: '',
  image_mobile: '',
  image_large: ''
};

const sauce: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус',
  type: 'sauce',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice', () => {
  it('добавляет булку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toMatchObject(bun);
    expect(state.bun).not.toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('добавляет начинку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(state.ingredients[0].id).toBeDefined();
    expect(state.bun).toBeNull();
  });

  it('удаляет ингредиент из конструктора', () => {
    const ingredient: TConstructorIngredient = {
      ...main,
      id: 'ingredient-1'
    };

    const initialState = {
      bun: null,
      ingredients: [ingredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient('ingredient-1')
    );

    expect(state.ingredients).toEqual([]);
  });

  it('меняет порядок ингредиентов', () => {
    const firstIngredient: TConstructorIngredient = {
      ...main,
      id: 'ingredient-1'
    };

    const secondIngredient: TConstructorIngredient = {
      ...sauce,
      id: 'ingredient-2'
    };

    const initialState = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    const state = constructorReducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients[0].id).toBe('ingredient-2');
    expect(state.ingredients[1].id).toBe('ingredient-1');
  });

  it('очищает конструктор', () => {
    const initialState = {
      bun,
      ingredients: [
        {
          ...main,
          id: 'ingredient-1'
        }
      ]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
