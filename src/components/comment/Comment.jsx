import React from 'react'
import {useSession} from 'next-auth/react'
import {format} from 'timeago.js'
import person from '../../../public/person.jpg'
import {BsTrash} from 'react-icons/bs'
import Image from 'next/image'

const Comment = ({comment, setComments}) => {
  const {data: session} = useSession()
  const token = session?.user?.accessToken

  const handleDeleteComment = async() => {
    try {
      await fetch(`http://localhost:3000/api/comment/${comment?._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: "DELETE"
      })

      setComments(prev => {
        return [...prev].filter((c) => c?._id !== comment?._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="h-full my-0 mx-auto flex justify-between items-center w-5/6">
        <div className="flex gap-5">
            <Image
              src={person}
              width='45'
              height='45'
              alt=""
              className='w-10 h-10 object-cover rounded-full'
            />
             <div className="flex flex-col items-start gap-1">
               <h4>{comment?.authorId?.username}</h4>
               <span className="text-base text-slate-400">{format(comment?.createdAt)}</span>
             </div>
             <span>{comment?.text}</span>
        </div>
        <div>
           {session?.user?._id === comment?.authorId?._id && (
             <BsTrash className="cursor-pointer text-red-500"  onClick={handleDeleteComment} />
           )}
        </div>
      </div>
    </div>
  )
}

export default Comment