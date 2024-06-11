import React from "react";
import { useNavigate } from "react-router-dom";
import Card from './card'


var data=[
{"title":"Bicep Curl","description":"The biceps curl mainly targets the biceps brachii, brachialis and brachioradialis muscles.","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4NAe4BA8gQx3WoVZ1p0e9ydmRnk6GLu59w&usqp=CAU","f":"Bicep_curl.py"},
{"title":"Shoulder Press","description":"The biceps curl mainly targets the biceps brachii, brachialis and brachioradialis muscles.","image":"https://www.spierentraining.nl/wp-content/uploads/2017/11/shoulder-press.jpg","f":"Shoulder_press.py"},
{"title":"highknees","description":"The biceps curl mainly targets the biceps brachii, brachialis and brachioradialis muscles.","image":"https://www.focusfitness.net/stock-photos/wp-content/uploads/edd/2017/07/Fit-man-doing-high-knees-cardio-exercise.jpg","f":"Highknees.py"},
{"title":"Pushups","description":"The biceps curl mainly targets the biceps brachii, brachialis and brachioradialis muscles.","image":"https://strengthbuzz.com/wp-content/uploads/2020/01/Push-Up-Workout.jpg","f":"Pushup.py"},
{"title":"Squats","description":"The biceps curl mainly targets the biceps brachii, brachialis and brachioradialis muscles.","image":"https://totalshape.com/wp-content/uploads/2023/07/Squat-and-Reach.webp","f":"Squat.py"},
]

const Content = () =>{
    let navigate = useNavigate();
    return(
        <div>
        <div style={{marginLeft:"25px",fontSize:"30px",fontFamily:"sans-serif",fontWeight:"bold"}}>Recommended</div>
        <div style={{alignItems: "Stretch",display: "flex",flexDirection: "row",flexWrap: "nowrap",overflowX: "auto",overflowY: "hidden",padding:"10px",margin:"10px"}}>
        {data.map((item)=><Card data={item}  />)}
</div>
</div>
    );
}

export default Content