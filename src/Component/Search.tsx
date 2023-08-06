import React from 'react'

const Search = ({searchTerm,handleSearchChange,handleFilter}:any) => {
  return (
    <div className="d-flex mb-2">
        <input
          type="text"
          placeholder="Search with title...."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control search"
          />
          <div className='ml-1'>
          <button className="btn btn-info text-light px-4" onClick={handleFilter}>Search</button>
          </div>
    </div>
  )
}

export default Search