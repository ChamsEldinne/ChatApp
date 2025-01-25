'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosClient from '../axiosClient'

function page() {
    const[input,setInput]=useState({email:"",password:""})
    const[errors,setErrors]=useState({email:null,password:null})
    const [loading ,setLoading]=useState(false) ;
    const router = useRouter();
  
    function handelChange(e){
      setInput({...input ,[e.target.id]:e.target.value})
      setErrors({email:null,password:null})
    }
    async function login(e){
        e.preventDefault()
        // axiosClient.get('/sanctum/csrf-cookie').then(
        //   async ()  => {
        try {
          setLoading(true) ;
          const response =await  axiosClient.post('api/login',
          {
            email: input.email,
            password: input.password,
          },
          {
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
          }
        );

          window.localStorage.setItem('user',JSON.stringify(response.data.user)) ;
          window.localStorage.setItem('token',response.data.token) ;
  
          router.push('/')
        } catch (error) {
          if(error?.status==422){
            const err=error.response.data.errors
            setErrors({
                      password:err?.password,
                      email:err?.email,
            })
          }else{
            window.alert(error)
          }
        }finally{
          setLoading(false) ;
        }
      
      //});
    };  
  return (
 <div className='bg-gray-900 h-screen w-full  flex justify-center items-center'>
    <form className="max-w-sm shadow-gray-800 shadow-xl min-w-96 bg-gray-900 p-4 rounded-md">
    <h1 className='text-gray-200 text-2xl mx-auto font-semibold my-4'>Sign in to your account</h1>
    <p className="my-2 text-sm text-gray-300  ">
               haven't an account?
              <a href="/register" className="text-blue-400 underline ">Register</a>.
    </p>
    <div className="mb-5">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-200">Your email</label>
        <input type="email" id="email" value={input.email} onChange={(e)=>handelChange(e)}  className="shadow-sm  border   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 focus:ring-blue-500 focus:border-blue-500  outline-none shadow-sm-light" placeholder="name@flowbite.com" required />
        {errors.email && <p className='text-red-400'>{errors.email}</p>}
    </div>
    <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-200">Your Password</label>
        <input type="password" id="password" value={input.password} onChange={(e)=>handelChange(e)} className="shadow-sm  border   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 focus:ring-blue-500 focus:border-blue-500  outline-none shadow-sm-light" placeholder="name@flowbite.com" required />
        {errors.password && <p className='text-red-400'>{errors.password}</p>}
    </div>
    <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
        <input id="terms" type="checkbox" value="" className="w-4 h-4 border  outline-none rounded  focus:ring-3  bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" required />
        </div>
        <label for="terms" className="ms-2 text-sm font-medium text-gray-200">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
    </div>
    <button onClick={(e)=>login(e)} type="submit" className="text-gray-200 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{loading?"Sing In....": "Sing In"}</button>
    </form>
</div>   

  )
}

export default page