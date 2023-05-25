'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import classes from './createBlog.module.css'

const CreateBlog = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category || !desc){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`https://sharify-jw0b7axnn-edk21.vercel.app//blog`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,desc,category,imageUrl,authorId: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const blog = await res.json()

          router.push(`/blog/${blog?._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })

          const data = await res.json()

          const imageUrl = data['secure_url']

          return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <label htmlFor="theme" class="block -mb-4 text-sm font-medium text-gray-900 dark:text-white">Select your theme</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} id="theme" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <label className="block -mb-4 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  <button className={classes.createBlog}>Create</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog