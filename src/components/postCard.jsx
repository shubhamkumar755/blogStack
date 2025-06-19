import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

//"$id" is just syntax of appwrite... dont get confuse
//The keys prefixed with $ (like $id, $createdAt) are Appwrite’s way of marking system-generated fields.
function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>

                {featuredImage &&
                 <div className='w-full justify-center mb-4'>
                        {console.log("Image preview URL:", appwriteService.getFilePreview(featuredImage))}
                        {console.log("File ID:", featuredImage)}


                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />
                </div>}

                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
