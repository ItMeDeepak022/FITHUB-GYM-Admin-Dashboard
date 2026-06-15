import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';

export default function AddNutrition() {
 const apiUrl = import.meta.env.VITE_AdminUrl;
  // ADD Nutritions 
  let [category, setcategory] = useState('')

  let navigate = useNavigate()

  let submitData = (e) => {
    e.preventDefault()
    let formValue = e.target
    let formData = new FormData(formValue)

    // let obj = {
    //   nutritionName: e.target.nutritionName.value,
    //   category,
    //   calories: e.target.calories.value,
    //   protein: e.target.protein.value,
    //   carbs: e.target.carbs.value,
    //   fat: e.target.fat.value,
    //   nutritionImg: e.target.nutritionImg.files[0],
    //   details: e.target.details.value,
    // };



    axios.post(
      `${apiUrl}/add-nutrition`, formData)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.status) {
          e.target.reset()
          setcategory('')
          console.log(finalRes);
          alert(finalRes.message)
          navigate('/view-nutrition')
        }
      })

  }

  // Update Nutritions 
  let { state } = useLocation()

  let [formData, setformData] = useState(
    {
      nutritionName: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      category: '',
      nutritionImg: '',
      details: ''
    }
  )

  let [img, setimg] = useState('')

  useEffect(() => {
    if (state) {
      setformData(
        {
          nutritionName: state.nutritionName,
          calories: state.calories,
          protein: state.protein,
          carbs: state.carbs,
          fat: state.fat,
          category: state.category,
          nutritionImg: state.nutritionImg,
          details: state.details
        }
      )
      const fileName = decodeURIComponent(state.nutritionImg.split("/").pop())
      setimg(fileName)
    }
  }, [state])

  let { id } = useParams();
  
  let updateData = (e) => {
    e.preventDefault()

    let sendData = new FormData();

    sendData.append("nutritionName", formData.nutritionName);
    sendData.append("calories", formData.calories);
    sendData.append("protein", formData.protein);
    sendData.append("carbs", formData.carbs);
    sendData.append("fat", formData.fat);
    sendData.append("category", formData.category);
    sendData.append("details", formData.details);

    sendData.append('nutritionImg', formData.nutritionImg)


    axios.put(
      `${apiUrl}/edit-nutrition/${id}`, sendData)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.status) {
          setformData(
            {
              nutritionName: '',
              calories: '',
              protein: '',
              carbs: '',
              fat: '',
              category: '',
              nutritionImg: '',
              details: ''
            }
          )
          alert(finalRes.message)
          navigate('/view-nutrition')
        }
      })

  }


  return (
    <div className="min-h-screen bg-slate-100 py-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-semibold text-slate-900">{id ? "Edit Nutrition" : 'Add Nutrition'}</h1>
          <p className="mt-2 text-sm text-slate-500">Enter nutrition details to create a new meal plan entry.</p>
        </div>

        <form className="space-y-6" onSubmit={id ? updateData : submitData}>
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Nutrition Name */}
            <div>
              <label
                htmlFor="nutritionName"
                className="block text-sm font-medium text-slate-700"
              >
                Nutrition Name
              </label>

              <input
                id="nutritionName"
                name="nutritionName"
                type="text"
                value={formData.nutritionName}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    nutritionName: e.target.value
                  })
                }
                required
                placeholder="e.g. Chicken Salad"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <select
                value={id ? formData.category : null}
                onChange={id ?

                  (e) =>
                    setformData({
                      ...formData,
                      category: e.target.value
                    })

                  : (e) => setcategory(e.target.value)}
                id="category"
                name="category"
                required
                defaultValue={""}
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              >
                <option value={''}>Not Selected</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="massgain">Muscle Gain Nutrition</option>
                <option value="fatloss">Weight Loss & Fat Burn</option>
              </select>
            </div>

            {/* Calories */}
            <div>
              <label
                htmlFor="calories"
                className="block text-sm font-medium text-slate-700"
              >
                Calories
              </label>

              <input
                id="calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={(e) => setformData({
                  ...formData, calories: e.target.value
                })}
                required
                placeholder="e.g. 350"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </div>

            {/* Protein */}
            <div>
              <label
                htmlFor="protein"
                className="block text-sm font-medium text-slate-700"
              >
                Protein (g)
              </label>

              <input
                id="protein"
                value={formData.protein}
                onChange={(e) => setformData({
                  ...formData, protein: e.target.value
                })}
                name="protein"
                type="number"
                required
                placeholder="e.g. 30"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </div>

            {/* Carbs */}
            <div>
              <label
                htmlFor="carbs"
                className="block text-sm font-medium text-slate-700"
              >
                Carbs (g)
              </label>

              <input
                id="carbs"
                value={formData.carbs}
                onChange={(e) => setformData({
                  ...formData, carbs: e.target.value
                })}
                name="carbs"
                type="number"
                required
                placeholder="e.g. 20"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </div>

            {/* Fat */}
            <div>
              <label
                htmlFor="fat"
                className="block text-sm font-medium text-slate-700"
              >
                Fat (g)
              </label>

              <input
                id="fat"
                name="fat"
                value={formData.fat}
                onChange={(e) => setformData({
                  ...formData, fat: e.target.value
                })}
                type="number"
                required
                placeholder="e.g. 12"
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </div>

            {/* Nutrition Img */}
            <div>
              <label
                htmlFor="nutritionImg"
                className="block text-sm font-medium text-slate-700"
              >
                Nutrition Img
              </label>

              <input
                id="nutritionImg"
                name="nutritionImg"
                onChange={(e) => setformData({
                  ...formData, nutritionImg: e.target.files[0]
                })}
                type="file"
                required={!id}
                className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />

            </div>
          </div>
          {id ? <p className='text-green-800'>Old Img:{img}</p> : ''}
          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-slate-700"
            >
              Details
            </label>

            <textarea
              id="details"
              name="details"
              rows="5"
              value={formData.details}
              onChange={(e) => setformData({
                ...formData, details: e.target.value
              })}
              required
              placeholder="Describe the nutrition item"
              className="mt-2 block w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-3xl bg-sky-600 px-6 py-3 text-white"
          >
            {id ? 'Updated Nutrition' : 'Save Nutrition'}
          </button>
        </form>
      </div >
    </div >
  )
}
