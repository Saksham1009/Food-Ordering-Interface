import { useReducer } from "react";
import cartcontext from "./Cart-context";
const defaultcartstate ={
    items:[],
    totalAmount: 0
}
const CartReducer = (state, action) => {
    if(action.type==='ADD'){
        const updatedtotalamount = state.totalAmount + (action.item.amount * action.item.price);
        const existingcartitemindex = state.items.findIndex(item => item.id===action.item.id);
        const existingcartitem = state.items[existingcartitemindex];
        let updatedItems;
        if(existingcartitem){
            const updatedItem={
                ...existingcartitem,
                amount: existingcartitem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingcartitemindex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items:updatedItems,
            totalAmount:updatedtotalamount
        };
    }
    if(action.type==='REMOVE'){
        
        const existingcarditemindex = state.items.findIndex(item => item.id === action.id);
        const existingitem = state.items[existingcarditemindex];
        const updatedTotalAmount = state.totalAmount - existingitem.price;
        let updatedItems;
        if(existingitem.amount===1){
            updatedItems=state.items.filter(item => item.id!==action.id);
        }else{
            const updatedItem = {...existingitem, amount:existingitem.amount-1};
            updatedItems = [...state.items];
            updatedItems[existingcarditemindex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if(action.type==='CLEAR'){
        return defaultcartstate;
    }

    return defaultcartstate;
};
const CartProvider = props => {
    const [cartstate, dispatchcartaction] = useReducer(CartReducer, defaultcartstate);
    const addItemtoCart = item => {
        dispatchcartaction({type:'ADD', item:item});
    };
    const removeItemFromCart = id =>{
        dispatchcartaction({type:'REMOVE', id:id});
    };
    const clearCartHandler = () => {
        dispatchcartaction({type: 'CLEAR'});
    };
    const cartContext = {
        items: cartstate.items,
        totalAmount: cartstate.totalAmount,
        addItem: addItemtoCart,
        removeItem: removeItemFromCart,
        clearCart: clearCartHandler
    };
    return <cartcontext.Provider value={cartContext}>{props.children}</cartcontext.Provider>
};
export default CartProvider;