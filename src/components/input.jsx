import React,{useId} from 'react'

// React.forwardRef is a special React function that allows you to pass a ref from a parent component down to a child component's DOM element (like an <input>).

// using forwardRef so that if any parent wants to control or focus the input, they can pass in a ref and it'll directly connect to the <input> element.

// as we are building reusable components like Input and Button thats why we are usinf forwardRef so that the parent using them can directly access their internal DOM elements.

const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    const id=useId() //to generate unique ids 
    return (
        <div className='w-full'>
            {/*if label is given then only proceed further*/}
            {label && 
            <label 
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
                {label}
            </label>}

            <input type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
            ${className}`} 
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
