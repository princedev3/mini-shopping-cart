import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";



export const GET = async(req:NextRequest,{params}:{params:string})=>{
    const {searchParams}= new URL(req.url)
    const cat= searchParams.get("cat")
    const name= searchParams.get("name")


try {

    if(name){

        let product;
        if(cat=== "all"){        
            product = await prisma.product.findMany()
            const filtered = product.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()) )
            return new NextResponse(JSON.stringify(filtered),{status:200})
        }else{
            product = await prisma.product.findMany({
                where:{
                    cat:cat || undefined
                }
            })
            const filtered = product.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()) )
            return new NextResponse(JSON.stringify(filtered),{status:200})
        }
      }
   else if(cat && cat !=="all") {
        const products = await prisma.product.findMany({
              where:{
              cat:cat || undefined
           }
          })
          return new NextResponse(JSON.stringify(products),{status:200})
  
      }else  if(   cat ==="all" ){
        let product = await prisma.product.findMany()

        return new NextResponse(JSON.stringify(product),{status:200})
          
    }

  
} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"can not fetch product"}),{status:500})
}
}

