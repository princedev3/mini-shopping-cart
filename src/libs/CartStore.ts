import { Product } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const INITIAL_STATE = {
    totalPrice:0,
    totalQuantity:0,
    product:[]
}
type productType={
    id:number
    img: string;
    name: string;
    price: number;
    quantity:number
}
type cartType = {
    totalPrice:number
    totalQuantity:number
    product: productType[]
    addToCart:()=>void
    removeFromCart:()=>void
    clearFromCart:()=>void
}

export const useCartStore = create(persist<cartType & productType>((set,get) => ({

    totalPrice:INITIAL_STATE.totalPrice,
    totalQuantity:INITIAL_STATE.totalQuantity,
    product:INITIAL_STATE.product,
 
   addToCart(item:any){ 

    const allProducts = get().product
    const existProduct = allProducts.find(each=>each.id===item.id)
    if(existProduct){
const updatedProduct = allProducts.map(each=>each.id==existProduct.id? {...existProduct,price:existProduct.price+item.price,quantity:existProduct.quantity+item.quantity} : each)
set(state=>({
    totalQuantity:state.totalQuantity + item.quantity,
    totalPrice:state.totalPrice +item.price,
    product: updatedProduct
}))
    }else{
        set(state=>({
            totalQuantity:state.totalQuantity + item.quantity,
            totalPrice:state.totalPrice +item.price,
            product:[...state.product,item]
        }))
    }

    
   },

   removeFromCart(item:any){
     set((state)=>({
         totalQuantity:state.totalQuantity - item.quantity,
         totalPrice:state.totalPrice -item.price,
         product:state.product.filter(each=>each.id !==item.id)
     }))
   },
   clearFromCart(item:any){
     set((state)=>({
         totalQuantity:0,
         totalPrice:0,
         product:[]
     }))
   }
   }),{name:"cart",skipHydration:true} ))

