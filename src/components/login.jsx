import React,{useState} from 'react'
import { Link,matchPath,useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice' // here we have just renamed login to authLogin to use in this file only
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form" 

function Login() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm() //handleSubmit is now a keyword in useForm.
    const [error,setError]=useState("")

    //we have login as async method as it can take time so we have to wait for it
    const login=async(data)=>{
        setError("") //always clean error before declaring login
        try{
            const session=await authService.login(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(storeLogin(userData)) 
                navigate("/") //after above processes done, navigate to homepage automatically
            }
        }
        catch(error)
        {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width="100%"/>
            </span>
        </div>
            <h2 className='text-center text-2xl font-bold'>
                Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link to="/signup"
                    className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>
            
            {error && <p className='text-red-500 text-center'>
                {error}</p>}

            <form onSubmit={handleSubmit(login)}
            className='mt-8'> 
                <div className='space-y-5'>

                    <Input 
                    label="Email:" 
                    placeholder="enter your email" //eventhough we have not declared placeholder prop in "Input", "...props" will take care of it
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) 
                            || "Email address must be a valid address"
                        }
                    })} //it is imp to pass register here as we are using useForm here.
                    //we are using "..." to prevent overwrite if we have used "register" in any other "Input".
                    />

                    <Input 
                    label="Password:"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true
                    })} />

                    <Button
                    type="submit"
                    className='w-full'>
                        Sign in</Button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default Login
