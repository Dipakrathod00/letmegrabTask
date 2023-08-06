import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProduct, setEditValue, setLoginState } from "../Redux/Slice";
import { AppDispatch } from "../Redux/Store";
import ImageCarousel from "../Component/ImageCarousel";
import Search from "../Component/Search";
import { tableItem, tableItems } from "../intefaces";

const Carousel: React.FC = () => {
  const postStatus = useSelector((state: any) => state.productSlice);
  const [isEdit, setisEdit] = useState<boolean>(false)
  
  const [filteredData, setfilteredData] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchTerm(event.target.value);
  
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData1 = filteredData?.map((item: any) => {
      if (item?.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
      return undefined; 
    });
    const filteredAndCleanedData = filteredData1.filter((item:any) => item !== undefined);
    
    setfilteredData(filteredAndCleanedData);
    if(searchTerm.length == 0 ){
      setfilteredData(postStatus?.data)  
    }
  };
  

  useEffect(() => {

    dispatch(GetProduct());
    return () => {};
    
}, []);

useEffect(()=>{
      setfilteredData(postStatus?.data)
  },[postStatus?.data])

  console.log(isEdit)

  return (
    <>
      <ImageCarousel  />
      <div className="container-fluid my-5 px-3">
        <div className='table-container'>
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleFilter={handleFilter} />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            filteredData?.map((item: tableItems,index:number) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{item?.title}</td>
                    <td>{item?.description}</td>
                    <td>{item?.price}</td>
                    <td>{item?.category}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                          setisEdit(true)
                          dispatch(setEditValue({...item,setisEdit,isEdit:true})) 
                        }}><i className="bi bi-pencil-square"></i></button>
                        <button className="btn btn-outline-danger btn-sm" onClick={()=>{
                          alert("Cannot Delete due to api issue")
                          dispatch(DeleteProduct(item?.id))
                        }}><i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })
            }
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default Carousel;
