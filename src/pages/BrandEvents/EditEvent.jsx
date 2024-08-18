import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";

import "./AddEvent.css";
import Dropzone from "../../../components/Dropzone";
import sampleImage from "./sampleImage";

const events = {
    image: "https://via.placeholder.com/280x190",
    name: "Saturday Quiz",
    type: "Realtime Quiz",
    startDate: "2024-08-24T14:00",
    endDate: "2024-08-24T16:00",   
};

const EditEvent = () => {
    const { id } = useParams();

    const [imageFile, setImageFile] = useState(undefined);
    const [eventData, setEventData] = useState(undefined);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
        gameType: Yup.string().required('Required'),
        numberOfVouchers: Yup.number().required('Required'),
    });

    useEffect(() => {
        // Fetch data
        setEventData(events);

        // Fetch image
        const fetchedImage = sampleImage;
        setImageFile(fetchedImage);
    }, []);

    return (
        <div>
            <h2>Edit Event</h2>
            {eventData !== undefined &&
                <Formik
                    initialValues={{
                        name: eventData.name,
                        startDate: eventData.startDate,
                        endDate: eventData.endDate,
                        gameType: eventData.type,
                        numberOfVouchers: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log({ ...values, imageFile });
                    }}
                >
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

                            <div>
                                <label className="Field--label">Number Of Vouchers</label>
                                <Field type="number" name="numberOfVouchers" placeholder="Number Of Vouchers" />
                            </div>

                            <div></div>
                            <Dropzone field={imageFile} setFieldValue={setImageFile} />
                            <div></div>
                            <div className="Button-container">
                                <button type="submit" className="submit-button">+ Add Event</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
        </div>
    );
};

export default EditEvent;
