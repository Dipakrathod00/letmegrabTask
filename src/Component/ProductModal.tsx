import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { AddProduct, setEditValue } from "../Redux/Slice";

interface FormValues {
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}


const initialValues: FormValues = {
  title: "",
  category: "",
  price: "",
  description: "",
  image: "",
};

const ProductModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editValue } = useSelector((state: any) => state.productSlice);
  // console.log("editValue",editValue)
  const [initialStateValue, setinitialStateValue] = useState(initialValues);
  const [isClose, setisClose] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    dispatch(AddProduct(values)).then((res) => {
      if(res){
        setisClose(true);
        alert("Product added successfully, but it's not visible in the table due to mismatching Get api from the backend");
        actions.setSubmitting(false);
        actions.resetForm();
        if (isClose) {
          setisClose(false);
        }
      }
    });
  };

  useEffect(() => {
    if (editValue) {
      setinitialStateValue({
        ...initialStateValue,
        title: editValue.title,
        description: editValue.description,
        price: editValue.price,
        category: editValue.category,
      });
    }
    return () => {};
  }, [editValue]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <Formik
          initialValues={initialStateValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <Form>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                   {
                    editValue.isEdit ? "Update Product"  : 'Add Product' 
                   }
                    
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={()=>dispatch(setEditValue({ 
                      title: "",
                      price: 0,
                      description: "",
                      category: "",
                      setisEdit:()=>{},
                    isEdit:false
                    }))}
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="">Title</label>
                  <input
                    onChange={props.handleChange}
                    value={props.values.title}
                    type="text"
                    name="title"
                    className="form-control mb-2"
                    placeholder="Enter product title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                  <label htmlFor="text">Category</label>
                  <input
                    onChange={props.handleChange}
                    value={props.values.category}
                    type="text"
                    name="category"
                    className="form-control mb-2"
                    placeholder="Enter category"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={props.handleChange}
                    value={props.values.price}
                    type="number"
                    name="price"
                    className="form-control mb-2"
                    placeholder="Enter Price"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-danger"
                  />
                  <label htmlFor="description">Description</label>
                  <textarea
                    onChange={props.handleChange}
                    value={props.values.description}
                    name="description"
                    rows={4} // Adjust the number of rows to increase or decrease the height
                    className="form-control mb-2"
                    placeholder="Enter product description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />

                  <input
                    onChange={props.handleChange}
                    value={props.values.image}
                    type="file"
                    name="image"
                    className="form-control mb-2"
                    placeholder="Enter product description"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={()=>dispatch(setEditValue({ 
                    title: "",
                    price: 0,
                    description: "",
                    category: "",
                    setisEdit:()=>{},
                  isEdit:false
                  }))}
                  >
                    Close
                  </button>
                  {
                    editValue.isEdit
                    ?<button
                    type="submit"
                    className="btn btn-info text-light"
                    disabled={props.isSubmitting}
                    data-bs-dismiss={isClose ? "modal" : null}
                    onClick={()=>alert('cannot edit due to API issues')}
                  >
                     Update Product
                  </button>
                    :<button
                    type="submit"
                    className="btn btn-info text-light"
                    disabled={props.isSubmitting}
                    data-bs-dismiss={isClose ? "modal" : null}
                  >
                  Add Product
                  </button>
                  }
                  
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductModal;
