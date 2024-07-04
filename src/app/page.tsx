"use client"
import Cart from '@/components/Cart'
import { useCartStore  } from '@/libs/CartStore'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const Home = () => {



const [selectedCheckbox, setSelectedCheckbox] = useState<any>(null);
const [selected, setSelected] = useState<any>("all");
const[query,setQuery]=useState("")
  
const checkboxes = [
  { id: 1, label: 'all' },
  { id: 5, label: 'camera' },
  { id: 2, label: 'phone' },
  { id: 3, label: 'laptop' },
  { id: 4, label: 'game' },
  { id: 5, label: 'earbud' },

];

const handleChange = (item:string)=>{
 setSelected(item)
  }



const fetcher = async (url:string)=>{
  
  const res = await fetch(url)
      const data = await res.json()
      return data
}

const { data, error,mutate, isLoading } = useSWR(`http://localhost:3000/api/product?cat=${selected}&name=${query}`, fetcher)



const {addToCart}= useCartStore ()
useEffect(()=>{
  useCartStore .persist.rehydrate()
},[])
  return (
    <div className='p-5 md:py-28 md:px-16 relative '>
      <Cart/>
      <div className="">


        <div className="flex gap-8 md:gap-36 items-center">
          <h1 className="text-2xl text-gray-500 hover:text-gray-600 hover:text-3xl duration-300 transition-all hidden sm:block ">Phonix</h1>

          <input type="text" onChange={(e)=>setQuery(e.target.value)} className='border outline-none p-2 rounded-md md:min-w-[300px] md:focus:w-[500px] '  placeholder='search item here'/>
        </div>

 <div className="mt-7 flex items-center gap-5">

  <div className="flex flex-col gap-5 self-start">
    {
      checkboxes.map((item,idx)=>(
        <div className="flex flex-row gap-2 items-center shadow-sm p-2 hover:bg-slate-100 rounded-md cursor-pointer ">
        <input type="checkbox"  className='w-4 h-4 ' checked={selectedCheckbox===idx}  value={item.label} onChange={()=>(handleChange(item.label),setSelectedCheckbox(idx)) }  />
        <span className='capitalize text-gray-600 '>{item.label} </span>
</div>
      ))
    }

  

  </div>

{
  isLoading ? 
  
    <div className="w-[300px] h-[300px] bg-gray-200 rounded-md group relative animate-pulse">
      <div className="relative w-full h-[180px] ">
           <div className="rounded-md object-cover w-full h-full bg-gray-300"></div>
      </div>
      <div className="p-2 flex flex-col gap-2 ">
        <span className="h-4 bg-gray-300 rounded w-1/2"></span>
        <span className="h-3 bg-gray-300 rounded w-1/3"></span>
        <span className="h-8 bg-gray-300 rounded w-full"></span>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-blue-500 text-white py-2 px-4 rounded w-full"></div>
      </div>
  
  </div>:
  <div className=" self-start flex flex-wrap gap-4 gap-y-8  justify-center w-full">
 {
  data.length===0?<div className="w-[300px] h-[300px] bg-gray-200 rounded-md group relative animate-pulse">
  <div className="relative w-full h-[180px] ">
       <div className="rounded-md object-cover w-full h-full bg-gray-300 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-blue-500">No item found</h1>
       </div>
  </div>
  <div className="p-2 flex flex-col gap-2 ">
    <span className="h-4 bg-gray-300 rounded w-1/2"></span>
    <span className="h-3 bg-gray-300 rounded w-1/3 "></span>
    
    <span className="h-8 bg-gray-300 rounded w-full"></span>
    
  </div>

</div> : data?.map((item:Product)=>(

  <div className="w-full sm:min-w-[40%] md:w-[45%] lg:w-[30%]  bg-black/5 rounded-md group relative  ">
      <div className="relative w-full h-[180px] ">
           <Image src={item.img} fill alt='' className='rounded-md object-cover'/>
      </div>
      <div className="p-2 flex flex-col gap-2 ">
      <span className="text-lg capitalize text-gray-500"><b className='text-black'>name:</b> {item.name} </span>
      <span className="text-sm  text-gray-700 capitalize"><b className='text-black'>price:</b>${item.price} </span>
      <p className="text-sm font-light"><b className='font-semibold'>Desc:</b> {item.desc} </p>
      <button onClick={()=>addToCart({
          id:item.id,
          img: item.img,
          name: item.name,
          price: item.price,
          quantity:1
      })} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-blue-500 text-white py-2 px-4 rounded w-full">add to cart</button>
      </div>
  </div>
  ))
 }

</div>
}

 </div>
      </div>
    </div>
  )
}

export default Home