import React from 'react'
import CategoriesList from '../components/CategoriesList'
import AddCategory from '../components/AddCategory'

const Categories = () => {

  return (
    <div className='w-full h-[calc(100vh-65px)] flex justify-start items-center  pl-8 pr-8 pt-4 pb-4 bg-primary'>

      <div className='right w-[55%] h-full'>

        <h1 className='text-xl font-bold text-white mb-8  h-[5%]'>Available Categories</h1>
        <div className="w-full h-[90%]">
       <CategoriesList/>
        </div>
      </div>

      <div className='left w-[45%] pl-5 h-full  flex flex-col '>
        <div className="w-full h-full">
       <AddCategory/>
        </div>
      </div>
    </div>
  )
}

export default Categories
