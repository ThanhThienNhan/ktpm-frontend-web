import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./AddEvent.css";
import Dropzone from "../../../components/Dropzone";
import { toast } from 'react-toastify';

const EditEvent = () => {
    const { id } = useParams(); // Get event ID from URL
    const [imageFile, setImageFile] = useState(undefined);
    const [eventData, setEventData] = useState(undefined);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
        gameType: Yup.string().required('Required'),
    });

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/v1/event/${id}`);
                setEventData(response.data);
                setImageFile(response.data.HINHANH);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [id]);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("ID_THUONGHIEU","1"); // Temp ID
        formData.append('name', values.name);
        formData.append('startDate', values.startDate);
        formData.append('endDate', values.endDate);
        formData.append('gameType', values.gameType);

        if (imageFile instanceof File) {
            formData.append('image', imageFile);
        }

        try {
            await axios.put(`http://localhost:3002/api/v1/event/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Event updated successfully!');
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Error updating event');
        }
    };

    return (
        <div>
            <h2>Edit Event</h2>
            {eventData ? (
                <Formik
                    initialValues={{
                        name: eventData.TENSUKIEN || '',
                        startDate: new Date(eventData.TGBATDAU).toISOString().slice(0, 16),
                        endDate: new Date(eventData.TGKETTHUC).toISOString().slice(0, 16),
                        gameType: eventData.LOAITROCHOI || 'Trivia Quiz',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className="form-container">
                            <div className="Input-grid">
                                <div>
                                    <label className="Field--label">Name</label>
                                    <Field type="text" name="name" placeholder="Name" />
                                </div>

                                <div>
                                    <label className="Field--label">Start Date and Time</label>
                                    <Field type="datetime-local" name="startDate" />
                                </div>

                                <div>
                                    <label className="Field--label">End Date and Time</label>
                                    <Field type="datetime-local" name="endDate" />
                                </div>

                                <div>
                                    <label className="Field--label">Game Type</label>
                                    <Field as="select" name="gameType">
                                        <option value="Trivia Quiz">Trivia Quiz</option>
                                        <option value="Roll Dice">Roll Dice</option>
                                    </Field>
                                </div>

                                <div></div>
                                <Dropzone field={imageFile} setFieldValue={setImageFile} />
                                <div></div>
                                <div className="Button-container">
                                    <button type="submit" className="submit-button">Save Changes</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p>Loading event data...</p>
            )}
        </div>
    );
};

export default EditEvent;
