import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios';

import "./EditUser.css"
import Dropzone from '../../../components/Dropzone';
import ErrorMessageBox from '../../../components/ErrorMessageBox';

export default function EditUser() {
  let navigate = useNavigate();
  const { username } = useParams();
  const [initialValues, setInitialValues] = useState({
    TENDANGNHAP: '',
    VAITRO: 'Player',
    SDT: '',
    EMAIL: '',
    MATKHAU: '',
    TRANGTHAI: 'Active',
  });
  const [imageFile, setImageFile] = useState();
  const [oldAvatar,setOldAvatar] = useState();
  const [avatar,setAvatar] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    if (username) {
      axios.get(`http://localhost:2999/user/v1/api/auth/users/info/${username}`)
        .then(response => {
          const userData = response.data;
          setInitialValues({
            TENDANGNHAP: userData.TENDANGNHAP,
            VAITRO: userData.VAITRO,
            SDT: userData.SDT,
            EMAIL: userData.EMAIL,
            MATKHAU: userData.MATKHAU,
            TRANGTHAI: userData.TRANGTHAI,
          });
          setAvatar(userData.AVATAR)
          console.log("Avatar: ", avatar);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError("There was an error fetching user data. Check your connection.");
        });
      
      if(avatar !== null && avatar !== undefined && avatar !== ""){
        //axios.get(`http://localhost:2999/user/v1/api/auth/images/image/${avatar}`)
        //.then(response => {
        //  const imageData = response.data;
        //  setImageFile(imageData.secure_url);
        //}).catch(error => {
        //  console.error('Error fetching user image:', error);
        //  setError("There was an error fetching user image. Check your connection.");
        //});
        setImageFile(avatar);
      }
        
    }//
  }, [username,avatar]);

  function handleImageFile(base64data){
    const formData = new FormData();
    formData.append('file', base64data);
    formData.append('upload_preset', 'my-preset'); // Replace with your Cloudinary upload preset

    console.log("Uploading Image");
    axios.post('https://api.cloudinary.com/v1_1/deabgvqk2/image/upload', formData) // Replace with your Cloudinary cloud name
    .then((response) => {
      console.log("Image Uploaded!");
      setImageFile(response.data.secure_url);
      setAvatar(response.data.secure_url);
      setOldAvatar(response.data.secure_url);
    })
    .catch((error) => {
      console.error("There was an error uploading the image!", error);
      setError("There was an error uploading the image! Please check your connection.");
    });
  }

  const handleCloseError = () => {
    setError(null);
  };


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
    axios.put(`http://localhost:2999/user/v1/api/auth/users/edit/${username}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("User data updated successfully!", response.data);
      navigate("/admin/user-management/");
    })
    .catch((error) => {
      console.error("There was an error updating the user data!", error);
      setError("There was an error updating user data! Please try again.");
    });
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
              <ErrorMessage name="TENDANGNHAP" component="div" />
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
              <ErrorMessage name="SDT" component="div" />
            </div>
        
            <div>
              <label htmlFor="EMAIL">Email</label>
              <Field type="email" id="EMAIL" name="EMAIL" className="input-field" />
              <ErrorMessage name="EMAIL" component="div" />
            </div>
        
            <div>
              <label htmlFor="MATKHAU">Password</label>
              <Field type="password" id="MATKHAU" name="MATKHAU" className="input-field" />
              <ErrorMessage name="MATKHAU" component="div" />
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
