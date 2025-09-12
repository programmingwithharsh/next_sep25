"use client";
import { useState, createContext, useContext } from 'react';
/*

With Context

C1 -> C2 -> C3 -> C4 -> C5
"Supriya" -> C2 -> C3 -> C4 -> "Supriya"

Created separate component file 
Create one file and create 5 components inside it
*/

const UserContext = createContext(); // create context
// const EmailContext = createContext(); // create context

// 1st component username is "Supriya"
const WithContext = () => {
    const [username, setUsername] = useState("Supriya"); // username is Supriya

    return <div>
        <h1>With Context example</h1>
        <div>In Component 1, Username is {username}</div>
        <UserContext.Provider value={{ username, setUsername }}>
            <C2 />
        </UserContext.Provider>
    </div>
}
// 2nd component
const C2 = () => {
    return (<C3 />);
}
// 3rd component
const C3 = () => {
    return (<C4 />);
}
// 4th component
const C4 = () => {
    return (<C5 />);
}
// 5th component
const C5 = () => {
    const { username, setUsername } = useContext(UserContext); // using value from context
    return (<div>
        <div>In Component 5, Username is {username}</div>
        <div style={{ marginTop: 8 }}>
            <button onClick={() => setUsername("Ananya")}>Set username to Ananya</button>
        </div>
        <div style={{ marginTop: 8 }}>
            <label>
                Update username: 
                <input
                    style={{ marginLeft: 8 }}
                    placeholder="Type a name"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
        </div>
    </div>);
}

export default WithContext;

