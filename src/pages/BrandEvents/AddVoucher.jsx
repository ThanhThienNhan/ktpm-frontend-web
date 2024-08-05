import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import "./AddVoucher.css";
import Dropzone from "../../../components/Dropzone";

const AddVoucher = () => {
    const [imageFile, setImageFile] = useState(undefined);

    const validationSchema = Yup.object({
        expirationDate: Yup.date().required('Required'),
        price: Yup.number().required('Required'),
        description: Yup.string().required('Required'),
    });

    if (imageFile) {
        console.log(imageFile);
    }

    return (
        <div>
            <h2>New Voucher</h2>

            <Formik
                initialValues={{
                    expirationDate: '',
                    price: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form className="form-container">
                    <div className="Input-grid">
                        <div>
                            <label className="Field--label">Expiration Date and Time</label>
                            <Field type="datetime-local" name="expirationDate" placeholder="Expiration Date and Time" />
                        </div>

                        <div>
                            <label className="Field--label">Price</label>
                            <Field type="number" name="price" placeholder="Price" />
                        </div>

                        <div>
                            <label className="Field--label">Description</label>
                            <Field type="text" name="description" placeholder="Description" />
                        </div>

                        <div>
                            <label className="Field--label">Image</label>
                            <Dropzone field={imageFile} setFieldValue={setImageFile} />
                        </div>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button">+ Add Voucher</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddVoucher;
