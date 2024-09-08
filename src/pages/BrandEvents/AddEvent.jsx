import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import DropzoneBrand from "../../../components/DropzoneBrand";
import "./AddEvent.css";
import { toast } from 'react-toastify';
import { useBrand } from '../../BrandContext';


const AddEvent = () => {
    const [imageFile, setImageFile] = useState(undefined);
    const { brandId } = useBrand();

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
        gameType: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('ID_THUONGHIEU', brandId); // Temp ID 1
        formData.append('name', values.name);
        formData.append('startDate', values.startDate);
        formData.append('endDate', values.endDate);
        formData.append('gameType', values.gameType);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.post('http://localhost/brand/api/v1/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Event created successfully:', response.data);
            toast.success('Event created successfully!');
            resetForm();
            setImageFile(undefined);

        } catch (error) {
            console.error('Error creating event:', error.response ? error.response.data : error.message);
            toast.error('Failed to create event.');
        }
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
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="form-container">
                        <div className="Input-grid">
                            <div>
                                <label className="Field--label">Name</label>
                                <Field type="text" name="name" placeholder="Name" />
                                {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
                            </div>

                            <div>
                                <label className="Field--label">Start Date and Time</label>
                                <Field type="datetime-local" name="startDate" placeholder="Start Date and Time" />
                                {errors.startDate && touched.startDate ? <div className="error">{errors.startDate}</div> : null}
                            </div>

                            <div>
                                <label className="Field--label">End Date and Time</label>
                                <Field type="datetime-local" name="endDate" placeholder="End Date and Time" />
                                {errors.endDate && touched.endDate ? <div className="error">{errors.endDate}</div> : null}
                            </div>

                            <div>
                                <label className="Field--label">Game Type</label>
                                <Field as="select" name="gameType">
                                    <option value="" label="Select game type" />
                                    <option value="Trivia Quiz" label="Trivia Quiz" />
                                    <option value="Roll Dice" label="Roll Dice" />
                                </Field>
                                {errors.gameType && touched.gameType ? <div className="error">{errors.gameType}</div> : null}
                            </div>

                            <div>
                                <label className="Field--label">Image</label>
                                <DropzoneBrand field={imageFile} setFieldValue={setImageFile} />
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" className="submit-button">+ Add Event</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddEvent;
