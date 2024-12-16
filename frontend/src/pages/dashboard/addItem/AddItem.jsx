import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Additem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [imageFileName, setimageFileName] = useState('');

    const onSubmit = (data) => {
        const newItemData = {
            ...data,
            coverImage: imageFileName,
            id: Date.now(), // Simple unique ID based on timestamp
        };

        try {
            // Get existing items from localStorage or set it as an empty array if none exist
            const existingItems = JSON.parse(localStorage.getItem('items')) || [];

            // Add the new item to the array
            existingItems.push(newItemData);

            // Save the updated items array back to localStorage
            localStorage.setItem('items', JSON.stringify(existingItems));

            Swal.fire({
                title: "Item Added",
                text: "Your item has been successfully added!",
                icon: "success",
                confirmButtonText: "Okay"
            });

            reset();
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error('Failed to add item:', error);
            Swal.fire({
                title: "Error",
                text: "There was an error adding the item. Please try again.",
                icon: "error",
                confirmButtonText: "Okay"
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    };

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Item</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Reusable Input Field for Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter item title"
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter item description"
                    type="textarea"
                    register={register}
                />

                {/* Reusable Select Field for Category */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        // Add more options as needed
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-2 w-full"
                    />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                     <span>Add Item</span>
                </button>
            </form>
        </div>
    );
};

export default Additem;
