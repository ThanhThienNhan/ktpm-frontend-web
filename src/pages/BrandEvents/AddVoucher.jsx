import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import DropzoneBrand from "../../../components/DropzoneBrand";
import "./AddVoucher.css";
import { toast } from 'react-toastify';
import { useBrand } from '../../BrandContext';

const AddVoucher = () => {
    const [imageFile, setImageFile] = useState(undefined);
    const { brandId } = useBrand();

    const validationSchema = Yup.object({
        expirationDate: Yup.date().required('Required'),
        price: Yup.number().required('Required'),
        description: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('ID_THUONGHIEU', brandId);
        formData.append('NGAYHETHAN', values.expirationDate);
        formData.append('TRIGIA', values.price);
        formData.append('MOTA', values.description);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.post('http://localhost/brand/api/v1/voucher', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Voucher created successfully:', response.data);
            toast.success('Add voucher successfully!');
            resetForm();
            setImageFile(undefined); 

        } catch (error) {
            console.error('Error creating voucher:', error.response ? error.response.data : error.message);
            toast.error('Failed to add voucher.');
        }
    };

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
                onSubmit={handleSubmit}
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
                            <DropzoneBrand field={imageFile} setFieldValue={setImageFile} />
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
