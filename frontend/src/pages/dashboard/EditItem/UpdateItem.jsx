import React, { useEffect } from 'react'
import InputField from '../additem/InputField'
import SelectField from '../additem/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchitemByIdQuery, useUpdateitemMutation } from '../../../redux/features/items/itemsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const Updateitem = () => {
  const { id } = useParams();
  const { data: itemData, isLoading, isError, refetch } = useFetchitemByIdQuery(id);
  // console.log(itemData)
  const [updateitem] = useUpdateitemMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  useEffect(() => {
    if (itemData) {
      setValue('title', itemData.title);
      setValue('description', itemData.description);
      setValue('category', itemData?.category);
      setValue('trending', itemData.trending);
      setValue('oldPrice', itemData.oldPrice);
      setValue('newPrice', itemData.newPrice);
      setValue('coverImage', itemData.coverImage)
    }
  }, [itemData, setValue])

  const onSubmit = async (data) => {
    const updateitemData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || itemData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/items/edit/${id}`, updateitemData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "item Updated",
        text: "Your item is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch()
    } catch (error) {
      console.log("Failed to update item.");
      alert("Failed to update item.");
    }
  }
  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching item data</div>
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update item</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter item title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter item description"
          type="textarea"
          register={register}
        />

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
          ]}
          register={register}
        />
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

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update item
        </button>
      </form>
    </div>
  )
}

export default Updateitem