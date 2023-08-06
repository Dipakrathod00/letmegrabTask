import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom"

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Confirm password is required'),
});

const LoginForm: React.FC = () => {
  const [data,setData]=useState<any>([])
  const navigate = useNavigate()
  const handleSubmit = (values: LoginFormValues) => {
    if (values) {
      const existingData: LoginFormValues[] = JSON.parse(localStorage.getItem("user") || "[]");
      const newData: LoginFormValues[] = [...existingData, values];
      localStorage.setItem("user", JSON.stringify(newData));
      navigate("/login");
    }  
    console.log(values);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        <div className="card" style={{ width: '500px', backgroundColor: '#f0f0f0' }}>
          <div className="card-body">
            <h5 className="card-title">Sign Up</h5>
            <Formik
              initialValues={{
                username:"",
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                 <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input value={props.values.username} onChange={props.handleChange} type="username" name="username" className="form-control" />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </div>
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
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Password</label>
                    <input value={props.values.confirmPassword} onChange={props.handleChange} type="password" name="confirmPassword" className="form-control" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary">Sing Up</button>
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
