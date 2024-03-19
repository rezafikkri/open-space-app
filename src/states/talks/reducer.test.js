import { describe, expect, test } from 'vitest';
import talksReducer from './reducer';

/**
* test scenario for talksReducer
*
* - talkReducers function
*  - should return the current state when given by unknown action
*  - should return the talks when given by RECEIVE_TALKS action
*  - should return the talks with the new talk when given by ADD_TALK action
*  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
*
*/


describe('talksReducer function', () => {
  test('should return the current state when given by unknown action', () => {
    // arrange: mengumpulkan semua kebutuhan yang dibutuhkan untuk menguji sebuah unit
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action: bagian aksi dari unit yang diuji. Biasanya, bagian ini hanya
    // terdiri dari satu baris kode saja yaitu pemanggilan fungsi dari unit yang diuji.
    const nextState = talksReducer(initialState, action);

    // assert: bagian untuk memeriksa efek atau hasil dari action yang telah dilakukan
    // oleh unit yang diuji.
    expect(nextState).toEqual(initialState);
  });

  test('should return the talks when given by RECEIVE_TALKS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          }
        ],
      },
    };

    // action
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.talks);
  });

  test('should return the talks with the new talk when given by ADD_TALK action', () => {
    // arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2022-09-22T10:06:56.588Z',
        },
      },
    };

    // action
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual([...initialState, action.payload.talk]);
  });

  test('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    // arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        talkId: 'talk-1',
        userId: 'user-1',
      },
    };

    // action: like talk
    const nextState = talksReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [action.payload.userId],
      },
    ]);

    // action: unlike talk
    const nextState2 = talksReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
});
