import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full h-{400px} mt-20 mb-5">
      <div className="flex justify-between items-center h-full my-0 mx-auto w-10/12">
        <div className="flex flex-col gap-2 w-3/5">
          <h2 className='mb-4 justify-self-start -ml-1.5'>About the App</h2>
          <p className='max-w-{425px} text-slate-500 text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptates velit fuga perspiciatis itaque iste, aliquid dignissimos voluptate modi,
            tempore assumenda adipisci dolor hic atque quod consequuntur cupiditate. Quasi, nobis veritatis!
          </p>
        </div>
        <div className="flex flex-col gap-2 w-1/5">
          <h2 className='mb-4 justify-self-start -ml-1.5'>Contacts</h2>
          <span>Phone +02 34 46 89</span>
          <span>YouTube: Sharify</span>
          <span>GitHub: ShariFy</span>
        </div>
        <div className="flex flex-col gap-2 w-1/5">
          <h2 className='mb-4 justify-self-start -ml-1.5'>Location</h2>
          <span>Continent: Europe</span>
          <span>Country: Bruxelles</span>
          <span>Current Location: Tienen</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer