import React, { useState } from 'react'
import './Ride.css'
import axios from 'axios'

export default function Ride() {

    const [pickUp, setPickup] = useState('')
    const [destination, setDestination] = useState('')

    const bookRide = async () => {
        const response = await fetch('http://localhost:2050/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pickUp,
                destination
            })
        })
        if (!response.ok) {
            alert('invalid')
        }
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 class="title-font font-medium text-4xl text-gray-900">Uber-alternative with women safety</h1>
                    <p class="leading-relaxed mt-4 text-black text-2xl">Female passengers can choose a female driver</p>
                </div>
                <div class="lg:w-2/6 md:w-1/2 bg-gray-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 class="text-white text-lg font-medium title-font mb-5">Book a ride now</h2>
                    <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-400">Pickup location</label>
                        <input value={pickUp} type="text" autoComplete="on"
                            onChange={(e) => {
                                setPickup(e.target.value)



                            }}
                            id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-400">Destination</label>
                        <input value={destination} onChange={(e) => setDestination(e.target.value)} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button onClick={
                        bookRide} class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Request now</button>
                    <p class="text-xs text-gray-500 mt-3">Ride Safe and Stylish: The Female-Friendly Alternative to Uber</p>
                </div>
            </div>
        </section>
    )
}
