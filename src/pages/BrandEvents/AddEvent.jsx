import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

import "./AddEvent.css"


const events = [
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Realtime Quiz",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    }];

const AddEvent = () => {

    const [imageFile,setImageFile] = useState(undefined);
    
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
        gameType: Yup.string().required('Required'),
        numberOfVouchers: Yup.number().required('Required'),
      });

      const FileUpload = ({ field ,setFieldValue }) => {
        const onDrop = React.useCallback((acceptedFiles) => {
          const file = acceptedFiles[0];
          const reader = new FileReader();
        
          reader.onloadend = () => {
            const base64data = reader.result;  
            setFieldValue(() => base64data);
            // Now base64data holds the content of the image file as a base64 encoded string
            // You can set it as the src of an img element to display the image
            //const imgTag = document.getElementById('DroppedImage');
            //if (imgTag !== null) {
            //  imgTag.src = base64data;
            //} 
          };
        
          reader.readAsDataURL(file);     
    
          //setFieldValue("file", acceptedFiles[0]);
        }, []); //[setFieldValue]
      
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
      
        return (
          <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
            {field === undefined &&
              <div className="dropzone-content">
                <div className="icon">🖼️</div>
                <p>Drop Image Here, Paste Or</p>
                <button type="button" className="select-button">Select</button>
              </div>}
            <img className='Image-display' id='DroppedImage' src={field}></img>
        </div>
        );
      };

    return (
        <div>
            <h2>New Event</h2>

            <Formik
              initialValues={{
                name: '',
                startDate: '',
                endDate: '',
                gameType: '',
                numberOfVouchers: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form className="form-container">
                <div className="Input-grid">
                    <div>
                        <label className="Field--label">Name</label>
                        <Field type="text" name="name" placeholder="Name" />
                    </div>

                    <div>
                        <label className="Field--label">Start date</label>
                        <Field type="date" name="startDate" placeholder="Start Date" />
                    </div>

                    <div>
                        <label className="Field--label">End date</label>
                        <Field type="date" name="endDate" placeholder="End Date" />
                    </div>

                    <div>
                        <label className="Field--label">Game type</label>
                        <Field type="text" name="gameType" placeholder="Game Type" />
                    </div>

                    <div>
                        <label className="Field--label">Number Of Vouchers</label>
                        <Field type="number" name="numberOfVouchers" placeholder="Number Of Vouchers" />
                    </div>
                    <div></div>
                    <FileUpload field={imageFile} setFieldValue={setImageFile}/>
                    <div></div>
                    <div className="Button-container">
                        <button type="submit" className="submit-button">+ Add Event</button>
                    </div>
                    
                </div>
                
                
              </Form>
            </Formik>
        </div>
    );
};

export default AddEvent;
