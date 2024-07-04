"use client"
import {useCartStore  } from '@/libs/CartStore';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";

const Cart = () => {
    const[open,setOpen]=useState(false)

    const modalRef = useRef(null);

    const handleClickOutside = (event:any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setOpen(false)
        }
      };
      useEffect(() => {
        if (open) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [open]);

      const { totalQuantity,product,totalPrice,removeFromCart,clearFromCart}= useCartStore ()

      useEffect(()=>{
        useCartStore .persist.rehydrate()
      },[])
  return (
    <div className='relative'>
        <div className="absolute flex justify-end flex-col right-0 md:right-7 lg:right-20">
         <div className="self-end relative">

        <CiShoppingCart onClick={()=>setOpen(!open)} className='text-5xl  bg-slate-50 p-2 rounded-sm hover:bg-slate-100 cursor-pointer'/>
        <div className="w-5 h-5 bg-blue-500 absolute  top-0 right-0 rounded-full text-white flex items-center justify-center ">{totalQuantity} </div>
         </div>
        {
            open && <div ref={modalRef} className="min-w-[300px] min-h-fit bg-white shadow-sm ring-1 ring-black/5 hover:bg-slate-50 z-50 p-5  rounded-lg flex flex-col gap-3">

                {
                    product.map(item=>(

                <div className="flex items-center justify-between" key={item.id}>
                    <Image src={item.img} width={200} height={200} alt='' className='object-cover w-14 h-14 rounded-full'/>
                    <span className="text-sm text-gray-600 capitalize font-medium" >{item.name} </span>
                     <span className="text-sm ext-gray-600 capitalize font-semibold"> ${item.price} </span>
                     <p className="text-lg text-red-700 font-bold cursor-pointer" onClick={()=>removeFromCart(item)}>X</p>
                </div>
                    ))
                }
               

                    <hr />
                <div className="">
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-gray-700"><span className="text-blue-700 mr-1">Total:</span> ${totalPrice} </h1>
                        <button className='text-white  capitalize font-light bg-blue-600 p-2 rounded-md hover:bg-blue-700'>checkout</button>
                    </div>
                </div>
            </div> 
        }
        </div>

    </div>
  )
}

export default Cart