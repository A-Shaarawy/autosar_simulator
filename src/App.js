import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import './App.css';
import 'react-rangeslider/lib/index.css'
import axios from 'axios'
import Header from './components/Header.js'

class App extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      data: {},
      led: false,
      inputValue: 0,
      enableTimers: true,
      events: {
          "timers" : {} //{id:period} => {2:5} should be passed to the ReactInterval Component callback and period props
        },
      values:{} //{dataElementName:value}

    }
    this.addEvents = this.addEvents.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.lightLed = this.lightLed.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.createInputDisplay = this.createInputDisplay.bind(this);
    this.setValue = this.setValue.bind(this);
    this.createOutputDisplay = this.createOutputDisplay.bind(this);
    this.compile = this.compile.bind(this);
    this.disableTimers = this.disableTimers.bind(this);
    this.sendUpdates = this.sendUpdates.bind(this);
  }

  componentDidMount(){
    setTimeout(this.disableTimers, 10000)
  }

  componentWillMount(){
      axios.defaults.baseURL = 'http://autosar-studio-backend.herokuapp.com';
      axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
      axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
      let data = new FormData();
      var tempArray={} 
      data.append('project_id', 12);
      axios.post('/simulate/get/', data)
      .then(results =>{
      Object.keys(results.data.inputs).map((key,i) => {
      return(
        results.data.inputs[key].map((input,j)=>{
            if(input.type === "Boolean" ){
              return tempArray[input.name] = false 
            }
            else{
              return tempArray[input.name] = 0
            }
        })
        )
    })

    Object.keys(results.data.outputs).map((key,i) => {
      return(
        results.data.outputs[key].map((output,j)=>{
            if(output.type === "Boolean"){
              return tempArray[output.name] = false 
            }
            else{
              return tempArray[output.name] = 0
            }
        })
        )
    })
    this.setState({
      data: results.data,
      values: tempArray
    })
    })   
  }

  lightLed(event){
    if(this.state.led === false){
      this.setState({
          led: true
      })
    }else{
      this.setState({
        led: false
      })
    }
  }

  handleOnChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }

//Function called by the React Interval Component
  compile(period,eventId){
    console.log(period," a77 ",eventId)
    axios.defaults.baseURL = 'http://autosar-studio-backend.herokuapp.com';
    axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
    axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    let data = new FormData();
    data.append('runnable_id', eventId);
  
    axios.post('/simulate/run/', data)
    .then(results =>{
     // console.log(results)
      Object.keys(results.data).map((key,i) => {
            var tempCopy =  this.state
            tempCopy.values[key] = results.data[key]
            this.setState(tempCopy)
            return 0
    })
  })
}

  sendUpdates(){
    //Function to send the updated values to the Back end
  }

  printCounter2(){
    var counter2 = 10
    this.setState({
      count2: counter2
    })
  }

  getInputValue(event,k,i){
    var stateCopy = Object.assign({},this.state);
    stateCopy.data.inputs[k][i].val = event.target.value;
    this.setState(stateCopy);
  }

  setValue(e,k,i){
    //console.log(e.target.value)
    var stateCopy = Object.assign({},this.state);
    stateCopy.data.inputs[k][i].val = e.target.value;
    this.setState(stateCopy);
  }

  createInputDisplay(input,index,key){
   //console.log("input is:",key)
    if(input.type === 'Boolean'){
      return(
        <div>
          <div className="switchContainer">
            <h3>Port: {key} </h3>
            <label className="switch">
              <input type="checkbox"/>
              <div className="slider round"></div>
            </label>
            <div><h5>{input.name}</h5></div>
          </div>
          <hr/>
        </div>
      )
    }else{
      return(
        <div>
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min="0" max="100" value={this.state.values[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index)}/>
            <input type="text" value={this.state.values[input.name]} onChange= {(e) => this.getInputValue(e,key,index)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
  }

  createOutputDisplay(output,index,key){
    if(output.type === 'Boolean'){
      return(
        <div>
          <div>
            <div className="keyContainer">
              <h3>Port: {key} </h3>
            </div>
            <div className={this.state.values[output.name] === false? 'redLed':'redLed ledActive'}></div>
            <span>{output.name}</span>
          </div>
          <hr/>
        </div>
      )
    }else{
      return(
        <div>
          <div className="display">
            <div className="keyContainer">
              <h3>Port: {key} </h3>
            </div>
            <h3>{this.state.values[output.name]}</h3>
            <span>{output.name}</span>
          </div>
        <hr/>
        </div>
      )
    }
  }

//Function called on click on the start simuation button
  addEvents(e){
    axios.defaults.baseURL = 'http://autosar-studio-backend.herokuapp.com';
    axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
    axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    let data = new FormData();
    data.append('project_id', 12);
    data.append('values', JSON.stringify({}));
    axios.post('/simulate/start/', data)
    .then(results =>{
      //console.log("results: ",results)
      var tempCopy =  this.state
      tempCopy.events.timers = results.data //Here w get the {id:period}
      this.setState(tempCopy)
  })
  }

  disableTimers(){
    console.log("ethbat makank")
    this.setState({
      enableTimers: false
    })

  }
  render(){
    console.log(this.state)
    return (
        <div>
           {
            Object.keys(this.state.events.timers).map((eventID,i) => {
            return(
              <div key={i}>
                <ReactInterval timeout={this.state.events.timers[eventID]*1000} enabled={this.state.enableTimers} callback={(e) => this.compile(this.state.events.timers[eventID],eventID)}/>
              </div>
            )
            })
           }
          <div>
            <div>
              <Header/>
            </div>
            <div className="bodycontainer">
              <div className="inputContainer">
                <div className="simulationButtonContainer"><button onClick={this.addEvents} className="simulationButton">Start Simulation</button></div>
                <div className="simulationButtonContainer"><button onClick={this.sendUpdates} className="simulationButton">Apply</button></div>
                {
                  this.state.data.inputs !== undefined ?
                  Object.keys(this.state.data.inputs).map((key,i) => {
                    return(
                     this.state.data.inputs[key].map((input,j)=>{
                       return (
                         this.createInputDisplay(input,j,key)
                       )
                     })
                     )
                  }) : ""
                }
               </div>
              <div className="outputContainer">
                {
                  this.state.data.outputs !== undefined ?
                  Object.keys(this.state.data.outputs).map((key,i) => {
                    return(
                     this.state.data.outputs[key].map((output,j)=>{
                       return (
                         this.createOutputDisplay(output,j,key)
                       )
                     })
                     )
                  }):""
                }
              </div>
            </div>
          </div>

          <div>
            <div className="logContainer"></div>
          </div>
        </div>
    );
  }
}

export default App;

// axios.defaults.baseURL = 'http://autosar-studio-backend.herokuapp.com';
// axios.defaults.headers.common['Authorization'] = "Token 286d3544d83e8a9f65770baaf25d8875c26de7b9";
// axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
// let data = new FormData();
// data.append('swc_id', this.state.selectedComponent);
// axios.post('/arxml/datatype/add', data)
// .then(results =>{
//   console.log(results)
// })
