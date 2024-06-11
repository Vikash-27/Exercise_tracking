import React, { useState } from "react";
import axios from 'axios'
const runExercise = async (f) => {
    console.log("the name of file is ", f)
    let fd = new FormData()
    // fd.append('asdfghjk',f)
    // fd.append('resources','emti')
    // console.log(fd)
    let formdata = {
        'scriptname': f
    }
    console.log('form data is ', formdata)
    try {
        let response;
        if (f === 'Squat.py')
            response = await axios.post('http://localhost:3001/squat', formdata)
        else if(f === 'Bicep_curl.py')
            response = await axios.post('http://localhost:3001/bicepcurl', formdata)
        else if(f === 'Shoulder_press.py')
            response = await axios.post('http://localhost:3001/shoulderpress', formdata)
        else if(f === 'Highknees.py')
            response = await axios.post('http://localhost:3001/highknees', formdata)
        else
            response = await axios.post('http://localhost:3001/pushup', formdata)




        console.log(response)
    } catch (error) {
        console.log(error)
    }
    //     axios.post("http://localhost:3001/upload", {'scriptname':file})
    //         .then((response) => {
    //             console.log(response);
    //         }).catch(error => {
    //             console.error('Error:', error);
    //             // Show error message
    //         })
}

const Card = ({ data }) => {
    return (
        <div class="grid grid-flow-col auto-cols-max" style={{ marginRight: "30px" }}>
            <div class="max-w-sm bg-white  border border-gray-100 shadow-md dark:bg-white-800 dark:border-gray-200">
                <img src={data['image']} width="100%" />
                <div class="p-5" >
                    <h5 class="mb-2 text-2xl font-bold tracking-tight " style={{ margin: "10px" }}>{data['title']}</h5>
                    <p class="mb-3 font-normal  dark:text-gray-500" style={{ margin: "10px" }}>{data['description']}</p>
                    <button style={{ margin: "10px" }} onClick={() => runExercise(data.f)} className="ui medium basic right labeled icon purple button" >
                        <i class="right arrow icon"></i>
                        Start Exercise
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card