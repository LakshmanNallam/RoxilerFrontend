import contextObj from "../../context/context"
import SpanStyling from "./stylecComponents/index"
import "./index.css"

const Details =()=><contextObj.Consumer>
    {value=>{
        console.log(value,"indetails")
        const {userDetails}=value
        
        if (userDetails ===null){
            return null
        }else{return <><h1>User Details</h1><div className="DetialsCard"><div className="userDetails">
        <div className="rowCon"><p><SpanStyling margin="43" >Todo ID:</SpanStyling> {userDetails.id}</p></div>
        <div className="rowCon"><p><SpanStyling margin="50" >User ID:</SpanStyling>{userDetails.id}</p></div>
        <div className="rowCon"><SpanStyling margin="30" >Todo Title:</SpanStyling><p>{userDetails.title}</p></div><div className="rowCon"><p><SpanStyling margin="60" >Name:</SpanStyling>{userDetails.name}</p></div><div className="rowCon"><p><SpanStyling margin="64" >Email:</SpanStyling>{userDetails.email}</p></div>
        </div></div></>}
        
    }}
</contextObj.Consumer>

export default Details