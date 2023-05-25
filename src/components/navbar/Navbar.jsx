'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import person from '../../../public/person.jpg'
import { AiOutlineClose } from 'react-icons/ai'
import {signIn, signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Navbar = () => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const {data: session} = useSession()

  const handleShowDropdown = () => setShowDropdown(prev => true)

  const handleHideDropdown = () => setShowDropdown(prev => false)

  const loggedIn = false

  return (
    <div className="sticky w-full h-{60px} bg-white shadow-md flex justify-center items-center top-0 left-0 z-50 p-5">
      <div className="my-0 mx-auto flex justify-between items-center relative w-10/12">
        <h2 className="text-4xl text-green-500 hover:text-green-700 transition duration-200">
          <Link href="/">ShariFy</Link>
        </h2>
        <ul className="flex items-center gap-5">
          {
            session?.user
              ? (
                <div>
                  <Image
                    onClick={handleShowDropdown}
                    src={person}
                    width='45'
                    height='45'
                    alt=""
                    className='object-cover rounded-full cursor-pointer'
                  />
                  {showDropdown && (
                    <div className="absolute p-4 flex flex-col items-center gap-5 top-10 -right-12 rounded-lg bg-slate-100">
                      <AiOutlineClose className="absolute top-1 right-1 cursor-pointer" onClick={handleHideDropdown} />
                      <button
                        onClick={() => {signOut(); handleHideDropdown(); router.push("/")}}
                        className="mt-4 ml-4 px-4 py-2 border-none text-white text-lg rounded-lg font-bold bg-green-500 hover:bg-green-700 cursor-pointer transition duration-200">
                          Logout
                      </button>
                      <Link
                        onClick={handleHideDropdown}
                        href='/create-blog'
                        className="mt-4 text-slate-500 text-lg font-light">
                          Create
                      </Link>
                    </div>
                  )}
                </div>
              )
              : (
                <>
                  <button
                    onClick={() => {signIn()}}
                    className="outline-none border-none px-4 py-2 border-none text-white text-lg rounded-lg font-bold bg-green-500 hover:bg-green-700 cursor-pointer transition duration-200">
                      Log in
                  </button>
                  <Link href='/register'>Register</Link>
                </>
              )
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar