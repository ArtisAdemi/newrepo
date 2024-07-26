import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
     console.log("query: ", query)
    }, [query])
    

  return (
    <div className='wishlist flex items-center p-2 pr-4 -ml-6 end-1 mb-[3px] cursor-pointer'>
        <input className='border border-1 sm:w-[150px] md:w-[200px] lg:w-[250px] border-[#0C0C0C4F] rounded-md p-1 px-6 ' style={{color: 'black'}} type="text" onChange={handleInputChange}  placeholder='Kerko...'/>
    </div>
  )
}

export default SearchBar