import {Component} from 'react'
import Home from './components/Home'
import contextObj from './context/context'
import './App.css'

class App extends Component {
  state = {userDetails: null}

  getUserDetails = async(id,title) => {
    console.log(id)
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data=(await response.json())
    this.setState({userDetails:{...data,title}})
  }

  render() {
    const {userDetails} = this.state
    return (
      <contextObj.Provider
        value={{userDetails, getUserDetails: this.getUserDetails}}
      >
        <Home />
      </contextObj.Provider>
    )
  }
}

export default App
