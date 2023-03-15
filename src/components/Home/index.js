import { Component } from 'react'
import {Audio} from 'react-loader-spinner'
import Details from "../Details"
import contextObj from '../../context/context'
import "./index.css"

const renderingObj={"INITIAL":"inital","laoding":"load","success":"sucesss","failure":"failed"}
class Home extends Component{
    state={todosList:[],currentrendering:renderingObj.INITIAL,inputVal:"",filterdList:[]}

    componentDidMount(){
        this.gettodosList()
    }

    gettodosList=async()=>{
        this.setState({currentrendering:renderingObj.laoding})
        const response=await fetch("https://jsonplaceholder.typicode.com/todos")
        const data=await response.json()
        console.log(data)
        this.setState({currentrendering:renderingObj.success,todosList:data,filteredList:data})
    }

    getAllRows=()=>{
        const {filteredList}=this.state
       
        return filteredList.map(eachItem=>
            <contextObj.Consumer>
                {value=>{
                    const {getUserDetails}=value
                    const getUserDetailsCall=()=>{
                        getUserDetails(eachItem.userId,eachItem.title)
                    }
                    return <div className='rowCon rowCon2'><h1  className='paraWidth'>{eachItem.id}</h1><p  className='paraWidth'>{eachItem.title}</p><p  className='paraWidth'>{eachItem.completed?"Completed":"Incomplete"}</p><div  className='paraWidth' ><button onClick={getUserDetailsCall}>User Details</button></div></div>
                } }  
            </contextObj.Consumer>)
    }

    getcurrentdetails=()=>{
        const {currentrendering}=this.state
       
        switch (currentrendering){
            case renderingObj.laoding:
                return <div className="products-loader-container">
                <Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
              </div>
            case renderingObj.success:
                return this.getAllRows()
            case renderingObj.failure:
                return <p>Failed</p>
            default:
                return null
        }
    }

    filteredList=()=>{
        const {inputVal,todosList}=this.state
            
            const updatedList=todosList.filter(eachItem=>{
                if (eachItem.title.toLowerCase().includes(inputVal)||eachItem.id.toString()===inputVal){
                    console.log("yes1",inputVal)
                    return true
                }
                else if(("completed".includes(inputVal.toLowerCase()))){
                    if (eachItem.completed){
                        return true
                    }
                    return false
                }else if ("incompleted".includes(inputVal) && !eachItem.completed){
                    console.log("yes3",inputVal)
                    return true
                }else{
                    console.log("yes4",inputVal)
                    return false
                }
                
            })
            this.setState({filteredList:updatedList,
            },this.getcurrentdetails)
    }

    inputChanged=(event)=>{
        
        this.setState({inputVal:event.target.value},this.filteredList)
        
    }

    render(){
        const {inputVal}=this.state
       
        return (<>
        <nav className='navEle'><h1>REACT CODING CHALLLENGE</h1></nav>
        <div className='LowerCon'>
           <div className='LeftCon'>
            <div className='rowCon header'><h1 className='Tagh1'>Todos</h1><input type="text" placeholder='Search' className='inoutEel' value={inputVal} onChange={this.inputChanged}/></div>
            <div className='rowCon subheader'><p className='paraWidth'>Todo ID</p><p className='paraWidth'>Title</p><p className='paraWidth'>Status</p><p className='paraWidth'>User Details</p></div>
            <div className='LowerOverFlow'>{this.getcurrentdetails()}</div>
            </div> 
            <div className='RightCon'>
                {<Details/>}
            </div> 

        </div>
        
        </>)
    }
}


export default Home
