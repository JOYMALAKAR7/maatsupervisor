const {ALL_VEHICLE_LIST,ADD_TO_CART, REMOVE_FROM_CART, SET_USER_DATA} = require('./constant');
const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_VEHICLE_LIST:
      let vehicleList = state.filter(item => {
        return item.name != action.data;
      });
      return [...vehicleList];

    case ADD_TO_CART:
      return [...state, action.data];

    case REMOVE_FROM_CART:
      let result = state.filter(item => {
        return item.name != action.data;
      });
      return [...result];
    case SET_USER_DATA:
      return [...state, action.data];

    default:
      return state;
  }
};
