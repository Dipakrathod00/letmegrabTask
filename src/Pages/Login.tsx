import React,{useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { AppDispatch } from '../Redux/Store';
import { getLoginData } from '../Redux/Slice';
import {useSelector} from 'react-redux'
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
 
  const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
  const handleSubmit = (values: any) => {

    localStorage.setItem("login-user", JSON.stringify(values))
    dispatch(getLoginData({...values,navigate}))
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        <div className="card" style={{ width: '500px', backgroundColor: '#f0f0f0' }}>
          <div className="card-body">
            <h5 className="card-title">Login</h5>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={props.values.email} onChange={props.handleChange} type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={props.values.password} onChange={props.handleChange} type="password" name="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
