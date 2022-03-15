import React from "react";

const cartcontext = React.createContext({
items:[],
totalAmount:0,
addItem: ()=>{},
removeItem: (id) => {}});

export default cartcontext;