export default function Title(props) {
    console.log("Title", props);
    return <div>
        <div>This is Title Functional Component</div>
        <h1>Username Props is {props.username} </h1>
        <h1>Username Hobbies Props is {props.interests[0]} </h1>
        <h1>Username Birth Props is {props.birth.place} </h1>
    </div>
}