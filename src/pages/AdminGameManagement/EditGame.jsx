import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios';

import "./style.css";
import Dropzone from '../../../components/Dropzone';

function EditGame() {
  const {gameId} = useParams();
  const [imageFile,setImageFile] = useState();
  const [initialValues, setInitialValues] = useState({
    id: 0,
    name: "" ,
    type: "",
    exchangable: 'No',
    instruction: '',
    imageFile: '',
  })

  let gameData = JSON.parse(localStorage.getItem("gameData"));
  let validationSchema;
  let onSubmit;
  let navigate = useNavigate();

  React.useEffect(() => {
      //fetch data
      if(gameId !== undefined){
        gameData.forEach(element => {
          if(element.id - gameId === 0){
            setInitialValues({
              id: element.id,
              name: element.name ,
              type: element.type,
              exchangable: element.exchangable,
              instruction: element.instruction,
              imageFile: element.imageFile,
            });
            setImageFile(element.imageFile);
          }
        });
      }
  },[]);

  function handleImageFile(base64data){
    console.log(base64data);
    const formData = new FormData();
    formData.append('file', base64data);
    formData.append('upload_preset', 'my-preset'); // Replace with your Cloudinary upload preset

    console.log("Uploading Image");
    axios.post('https://api.cloudinary.com/v1_1/deabgvqk2/image/upload', formData) // Replace with your Cloudinary cloud name
    .then((response) => {
      console.log("Image Uploaded!");
      setImageFile(response.data.secure_url);
    })
    .catch((error) => {
      console.error("There was an error uploading the image!", error);
      setError("There was an error uploading the image! Please check your connection.");
    });
  }

  validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    instruction: Yup.string(),
  });

  onSubmit = (values) => {
    const data = {
      ...values,
      imageFile: imageFile
    }

    const newData = gameData.map(game => {
      if(game.id === data.id){
        return data;
      }else{;
        return game;
      }
    })
    
    localStorage.setItem("gameData", JSON.stringify(newData));
    navigate("/admin/game-management")
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
          <Form className="form-container">
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" className="input-field" />
              <ErrorMessage name="name" component="div" />
            </div>
            
            <div>
              <label htmlFor="type">Type</label>
              <Field type="text" id="type" name="type" className="input-field" />
              <ErrorMessage name="type" component="div" />
            </div>
            
            <div>
              <label htmlFor="exchangable">Exchangable</label>
              <Field as="select" id="exchangable" name="exchangable" className="input-field">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Field>
            </div>
            
            <div>
              <label htmlFor="phone">Instruction</label>
              <Field as="textarea" id="instruction" name="instruction" className="input-field" />
              <ErrorMessage name="instruction" component="div" />
            </div>
            
            <Dropzone field={imageFile} setFieldValue={handleImageFile}/>
            
            <div>
              <button type="submit" disabled={isSubmitting} className="submit-button">Save</button>
              <button type="button" className="cancel-button">Cancel</button>
            </div>
          </Form>
        )}
    </Formik>
  )
}

export default EditGame