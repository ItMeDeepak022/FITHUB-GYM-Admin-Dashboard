import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export default function AddProgram() {
const apiUrl = import.meta.env.VITE_AdminUrl;
    // UPDATE PROGRAM

    let navigate = useNavigate()
    let { id } = useParams()
    let { state } = useLocation()

    let [oldImg, setoldImg] = useState('')
    let [updateform, setupdateform] = useState({
        programName: '',
        description: '',
        duration: '',
        price: '',
        programImg: ''
    })


    let updatedData = (e) => {

        e.preventDefault()

        let formData = new FormData()

        formData.append("programName", updateform.programName)
        formData.append("description", updateform.description)
        formData.append("duration", updateform.duration)
        formData.append("price", updateform.price)



        formData.append("programImg", updateform.programImg)



        axios.put(
            `${apiUrl}/update-program/${id}`,
            formData
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {

                    alert(finalRes.message)
                    navigate('/view-program')


                }
            })





    }

    // old data set
    useEffect(() => {

        if (state) {

            setupdateform({
                programName: state.programName,
                description: state.description,
                duration: state.duration,
                price: state.price,
                programImg: state.programImg
            })
            const fileName = decodeURIComponent(state.programImg.split("/").pop());
            setoldImg(fileName)
        }

    }, [state])


    // ADD PROGRAM
    let submitData = (e) => {

        e.preventDefault()

        let formData = new FormData(e.target)

        axios.post(
            `${apiUrl}/add-program`,
            formData
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    alert(finalRes.message)
                    navigate('/view-program')
                }
            })

    }









    return (

        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">

            <h2 className="text-2xl font-semibold mb-4">
                {id ? 'Edit Program' : 'Add Program'}
            </h2>

            <form
                className="space-y-6"
                onSubmit={id ? updatedData : submitData}
            >

                {/* Program Name */}
                <div>

                    <label className="block text-sm font-medium mb-1">
                        Program Name
                    </label>

                    <input
                        type="text"
                        name="programName"
                        required
                        value={updateform.programName}
                        onChange={(e) =>
                            setupdateform({
                                ...updateform,
                                programName: e.target.value
                            })
                        }
                        placeholder="Enter program name"
                        className="w-full border rounded px-3 py-2"
                    />

                </div>

                {/* Description */}
                <div>

                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        name="description"
                        required
                        value={updateform.description}
                        onChange={(e) =>
                            setupdateform({
                                ...updateform,
                                description: e.target.value
                            })
                        }
                        placeholder="Enter description"
                        className="w-full border rounded px-3 py-2"
                    ></textarea>

                </div>

                {/* Duration & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Duration
                        </label>

                        <input
                            type="Number"
                            name="duration"
                            required
                            value={updateform.duration}
                            onChange={(e) =>
                                setupdateform({
                                    ...updateform,
                                    duration: e.target.value
                                })
                            }
                            placeholder="12"
                            className="w-full border rounded px-3 py-2"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-1">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            required
                            value={updateform.price}
                            onChange={(e) =>
                                setupdateform({
                                    ...updateform,
                                    price: e.target.value
                                })
                            }
                            placeholder="25000"
                            className="w-full border rounded px-3 py-2"
                        />

                    </div>

                </div>

                {/* Image */}
                <div>

                    <label className="block text-sm font-medium mb-1">
                        Program Image
                    </label>

                    <input
                        type="file"
                        name="programImg"
                        required={!id}
                        className="sm:w-[40%] w-full border border-slate-200 rounded-2xl p-2"
                        onChange={(e) =>
                            setupdateform({
                                ...updateform,
                                programImg: e.target.files[0]
                            })
                        }
                    />


                    {id ? <p className='text-[20px] font-bold text-[green]'>Old Img:{oldImg}</p> : ''}
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    {id ? 'Edit Program' : 'Save Program'}
                </button>

            </form>

        </div>

    )
}