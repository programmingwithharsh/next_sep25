"use client";
import { useState } from 'react';
/*

Without Context

C1 -> C2 -> C3 -> C4 -> C5
"Supriya" -> C2 -> C3 -> C4 -> "Supriya"

Created separate component file 
Create one file and create 5 components inside it
*/


// 1st component username is "Supriya"
const WithoutContext = () => {
    const [username, setUsername] = useState("Supriya"); // username is Supriya
    return <div>
        <h1>Without Context example</h1>
        <div>In Component 1, Username is {username}</div>
        <C2 username={username} />
    </div>
}
// 2nd component
const C2 = (props) => {
    return (<C3 username2={props.username} />);
}
// 3rd component
const C3 = (props) => {
    return (<C4 username3={props.username2} />);
}
// 4th component
const C4 = (props) => {
    return (<C5 username4={props.username3} />);
}
// 5th component
const C5 = (props) => {
    return (<div>
        <div>In Component 5, Username is {props.username4}</div>
    </div>);
}

export default WithoutContext;

