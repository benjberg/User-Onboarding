import React, {useState, useEffect} from 'react';
import {withFormik ,Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const Formbuild = ({values, errors, touched, status}) =>{
    const [data,setData]=useState([]);
    useEffect(()=> {
        console.log('status has changed', status);
        status && setData (data => [...data, status]);
    },[status])
    return (
       <div>
       <Form>
           <label htmlFor='name'>
               Name:
            <Field id='name' type='text' name='name' placeholder='Name' />
            {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>)}
            </label>
            <br></br>
            <label htmlFor='email'>
               Email:
            <Field id='email' type='text' name='email' placeholder='Email' />
            {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>)}
            </label>
            <br></br>
            <label htmlFor='password'>
               Password:
            <Field id='password' type='password' name='password' placeholder='Password' />
            {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>)}
            </label>
            <br></br>
            <label htmlFor='tos'>
                Do you agree to the Terms of Service?
                <Field id='tos' type='checkbox' checked={values.tos}/>
                {touched.tos && errors.tos && (
            <p className="errors">{errors.tos}</p>)}
            </label>
            <button type='submit'>Submit Data!</button>

        </Form>
        {data.map(data => {
        return (
          <ul key={data.id}>
            <li>Name: {data.name}</li>
            <li>Email: {data.email}</li>
          </ul>
        );
        })}
        </div>
    )
};
const Formikform = withFormik({
    
    mapPropsToValues(props) {
      // set initial state of form to value from parent component OR the initial value (after || )
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        tos: props.tos || false
        
      };
      
},
validationSchema: Yup.object().shape({
    name: Yup.string().min(2, 'name must be at least 2 characters').required('must fill in name'),
    password: Yup.string().min(6, 'password must contain at least 6 charaters').required('Password is required'),
    email: Yup.string().required('Valid Email address is required'),
    tos: Yup.boolean().oneOf([true], "You must accept the ToS to continue"),
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(results => {
        console.log("success", results);
        setStatus(results.data);

        resetForm();
      })
      .catch(error => console.log(error.response));
  }
})(Formbuild);



export default Formikform;