'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

const BlogCard = ({ blog: { title, desc, imageUrl, likes, authorId, _id } }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [blogLikes, setBlogLikes] = useState(0)


  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id))
    session && likes && setBlogLikes(likes.length)
  }, [likes, session])

  const handleLike = async () => {
    try {
      const res = await fetch(`https://sharify-jw0b7axnn-edk21.vercel.app/blog/${_id}/like`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: 'PUT'
      })

      console.log(res)
      if (res.ok) {
        if (isLiked) {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev - 1)
        } else {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-3/12 h-{540px} shadow-sm transition rounded-xl hover:shadow-lg">
      <div className="p-5 w-full h-full flex flex-col">
        <Link href={`/blog/${_id}`}>
          <Image
            src={imageUrl}
            width="350"
            height="350"
            alt=""
            className='object-cover w-full my-0 mx-auto rounded-3xl hover:scale-105 transition ease-in-out duration-200'
          />
        </Link>
        <div className="ml-3 flex justify-between items-center">
          <div>
            <h3 className='text-lg font-bold mt-6 mb-5'>{title}</h3>
            <p className='text-slate-500'>{desc}</p>
            <span className='mt-8 flex items-center gap-2 text-base'>Created By: <span className='text-slate-600'>1th of January</span></span>
          </div>
          <div className="cursor-pointer flex items-center gap-2 text-lg">
            {blogLikes} {" "} {isLiked
              ? (<AiFillLike onClick={handleLike} size={18} />)
              : (<AiOutlineLike onClick={handleLike} size={18} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard