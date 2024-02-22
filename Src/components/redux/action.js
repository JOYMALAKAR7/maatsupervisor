import {ALL_VEHICLE_LIST,ADD_TO_CART, REMOVE_FROM_CART,USER_LIST} from './constant'

export const ALL_VEHICLE_LIST=item=>{
    return {
        type:ALL_VEHICLE_LIST,
        data:item
    }
}

export const addToCart=item=>{
    return {
        type:ADD_TO_CART,
        data:item
    }
}
export const removeFromCart=item=>{
    return {
        type:REMOVE_FROM_CART,
        data:item
    }
    
}
export function getUserList(){
    return{
       type: USER_LIST  
    }
       
        }