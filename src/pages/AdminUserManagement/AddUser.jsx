import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./EditUser.css"
import Dropzone from '../../../components/Dropzone';
import ErrorMessageBox from '../../../components/ErrorMessageBox';

export default function AddUser() {
  let navigate = useNavigate();
  const [imageFile, setImageFile] = useState();
  const [avatar,setAvatar] = useState("");
  const [error, setError] = useState(null);

  const [initialValues, setInitialValues] = useState({
    TENDANGNHAP: '',
    VAITRO: 'Player',
    SDT: '',
    EMAIL: '',
    MATKHAU: '',
    TRANGTHAI: 'Active',
  });

  function handleImageFile(base64data){
    const formData = new FormData();
    formData.append('file', base64data);
    formData.append('upload_preset', 'my-preset'); // Replace with your Cloudinary upload preset

    axios.post('https://api.cloudinary.com/v1_1/deabgvqk2/image/upload', formData) // Replace with your Cloudinary cloud name
    .then((response) => {
      setImageFile(response.data.secure_url);
      setAvatar(response.data.secure_url);
      console.log(response);
    })
    .catch((error) => {
      console.error("There was an error uploading the image!", error);
      setError("There was an error uploading the image! Please check your connection.");
    });
  }

  const validationSchema = Yup.object({
    TENDANGNHAP: Yup.string().required('Required'),
    VAITRO: Yup.string().required('Required'),
    SDT: Yup.string().required('Required'),
    EMAIL: Yup.string().email('Invalid email format').required('Required'),
    MATKHAU: Yup.string().required('Required'),
    TRANGTHAI: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    const data = JSON.stringify({...values,AVATAR: avatar});
    axios.post('http://localhost/user/v1/api/auth/users/new', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("Submitted!", response.data);
      navigate("/admin/user-management");
    })
    .catch((error) => {
      console.error("There was an error submitting the form!", error);
      setError("There was an error submitting the form. Please try again.");
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorMessageBox message={error} onClose={handleCloseError} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form-container">
            <div>
              <label htmlFor="TENDANGNHAP">Username</label>
              <Field type="text" id="TENDANGNHAP" name="TENDANGNHAP" className="input-field" />
              <ErrorMessage className='ErrorMessage' name="TENDANGNHAP" component="div" />
            </div>

            <div>
              <label htmlFor="VAITRO">Role</label>
              <Field as="select" id="VAITRO" name="VAITRO" className="input-field">
                <option value="Player">Player</option>
                <option value="Admin">Admin</option>
                <option value="Brand">Brand</option>
              </Field>
            </div>

            <div>
              <label htmlFor="SDT">Phone</label>
              <Field type="text" id="SDT" name="SDT" className="input-field" />
              <ErrorMessage className='ErrorMessage' name="SDT" component="div" />
            </div>

            <div>
              <label htmlFor="EMAIL">Email</label>
              <Field type="email" id="EMAIL" name="EMAIL" className="input-field" />
              <ErrorMessage className='ErrorMessage' name="EMAIL" component="div" />
            </div>

            <div>
              <label htmlFor="MATKHAU">Password</label>
              <Field type="password" id="MATKHAU" name="MATKHAU" className="input-field" />
              <ErrorMessage className='ErrorMessage' name="MATKHAU" component="div" />
            </div>

            <div>
              <label htmlFor="TRANGTHAI">Status</label>
              <Field as="select" id="TRANGTHAI" name="TRANGTHAI" className="input-field">
                <option value="Banned">Banned</option>
                <option value="Active">Active</option>
              </Field>
            </div>

            <Dropzone setFieldValue={handleImageFile} field={imageFile} />

            <div>
              <button type="submit" disabled={isSubmitting} className="submit-button">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
