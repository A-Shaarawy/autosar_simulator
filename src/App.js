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
      enableTimers: false,
      valuesIn:{}, //{dataElementName:value}
      valuesOut:{}, //{dataElementName:value}
      integer_types:{
        "SInt8": { "lower": "-128", "upper": "127" },
        "UInt8": { "lower": "0", "upper": "255" },
        "SInt16": { "lower": "-32768", "upper": "32767" },
        "UInt16": { "lower": "0", "upper": "65535" },
        "SInt32": { "lower": "-2147483648", "upper": "2147483647" },
        "UInt32": { "lower": "0", "upper": "4294967295" }
       }

    }
    this.startSimulation = this.startSimulation.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.lightLed = this.lightLed.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.createInputDisplay = this.createInputDisplay.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setBoolValue = this.setBoolValue.bind(this);
    this.createOutputDisplay = this.createOutputDisplay.bind(this);
    this.requestUpdates = this.requestUpdates.bind(this);
    this.disableTimers = this.disableTimers.bind(this);
    this.sendUpdates = this.sendUpdates.bind(this);
  }

  componentDidMount(){
    //setTimeout(this.disableTimers, 20000)
  }

  componentWillMount(){
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
      axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
      let data = new FormData();
      var tempArrayIn={} 
      var tempArrayOut={} 
      data.append('project_id', 16);
      axios.post('/simulate/get/', data)
      .then(results =>{
      Object.keys(results.data.inputs).map((key,i) => {
      return(
        results.data.inputs[key].map((input,j)=>{
            if(input.type === "Boolean" ){
              return tempArrayIn[input.name] = false 
            }
            else{
              return tempArrayIn[input.name] = 0
            }
        })
        )
    })

    Object.keys(results.data.outputs).map((key,i) => {
      return(
        results.data.outputs[key].map((output,j)=>{
            if(output.type === "Boolean"){
              return tempArrayOut[output.name] = false 
            }
            else{
              return tempArrayOut[output.name] = 0
            }
        })
        )
    })
    this.setState({
      data: results.data,
      valuesIn: tempArrayIn,
      valuesOut: tempArrayOut
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
  requestUpdates(){
    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
    axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    let data = new FormData();
    data.append('project_id', 16);
  
    axios.post('/simulate/getvalues/', data)
    .then(results =>{
     console.log("request ",results)
      Object.keys(results.data).map((key,i) => {
            console.log("state ",this.state)
            var tempCopy =  this.state
            if (results.data[key] === "True")
            {
              tempCopy.valuesOut[key] = true
            }
            else if (results.data[key] === "False")
            {
              tempCopy.valuesOut[key] = false
            }
            else {
              tempCopy.valuesOut[key] = results.data[key]
            }
            this.setState(tempCopy)
            return 0
    })
  })
}

  sendUpdates(){
    //Function to send the updated values to the Back end
    var updatedInputs = this.state.valuesIn

    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
    axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    let data = new FormData();
    data.append('project_id', 16);
    data.append('values', JSON.stringify(this.state.valuesIn));
  
    axios.post('/simulate/setvalues/', data)
    .then(results =>{
      console.log(results)
    })

  }

  printCounter2(){
    var counter2 = 10
    this.setState({
      count2: counter2
    })
  }

  getInputValue(event,k,i,name){
    var stateCopy = Object.assign({},this.state);
    stateCopy.valuesIn[name] = event.target.value;
    this.setState(stateCopy);
  }

  setValue(e,name){
    //console.log(e.target.value)
    var stateCopy = Object.assign({},this.state);
    stateCopy.valuesIn[name] = e.target.value;
    this.setState(stateCopy);
  }

  setBoolValue(e,name){
    //console.log(e.target.value)
    var stateCopy = Object.assign({},this.state);
    stateCopy.valuesIn[name] = e.target.checked;
    this.setState(stateCopy);
    console.log(this.state)
  }

  createInputDisplay(input,index,key){
    if(input.type === 'Boolean'){
      return(
        <div>
          <div className="switchContainer">
            <h3>Port: {key} </h3>
            <label className="switch">
              <input type="checkbox" onChange={(e)=>this.setBoolValue(e,input.name)}/>
              <div className="slider round"></div>
            </label>
            <div><h5>{input.name}</h5></div>
          </div>
          <hr/>
        </div>
      )
    }
    else if(input.type === "SInt8"){
      return(
        <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.SInt8.lower} max={this.state.integer_types.SInt8.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
    else if(input.type === "UInt8"){
      return(
        <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.UInt8.lower} max={this.state.integer_types.UInt8.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
    else if(input.type === "SInt16"){
      return(
         <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.SInt16.lower} max={this.state.integer_types.SInt16.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
    else if(input.type === "UInt16"){
      return(
        <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.UInt16.lower} max={this.state.integer_types.UInt16.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
    else if(input.type ==="SInt32"){
      return(
        <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.SInt32.lower} max={this.state.integer_types.SInt32.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>
      )
    }
    else if(input.type ==="UInt32"){
      return(
           <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min={this.state.integer_types.UInt32.lower} max={this.state.integer_types.UInt32.upper} value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
            <div><h5>{input.name}</h5></div>
          </div>
        </div>
        <hr/>
        </div>     
      )
    }
    else{
      return(
        <div> 
        <div>
          <div className="sliderContainer">
          <div className="keyContainer">
            <h3>Port: {key} </h3>
            </div>
            <input type="range"  min="-1000000" max="1000000" step="0.001" value={this.state.valuesIn[input.name]} step="1" onChange={(e)=>this.setValue(e,key,index,input.name)}/>
            <input type="text" value={this.state.valuesIn[input.name]} onChange= {(e) => this.getInputValue(e,input.name)}/>
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
            <div className={this.state.valuesOut[output.name] === false? 'redLed':'redLed ledActive'}></div>
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
            <h3>{this.state.valuesOut[output.name]}</h3>
            <span>{output.name}</span>
          </div>
        <hr/>
        </div>
      )
    }
  }

//Function called on click on the start simuation button
  startSimulation(e){
    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.headers.common['Authorization'] = "Token c7aed2d669185df2ae09cf25fb4d039c7619463c";
    axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
    let data = new FormData();
    data.append('project_id', 16);
    data.append('values', JSON.stringify(this.state.valuesIn));
    axios.post('/simulate/start/', data)
    .then(results =>{
      console.log("results: ",results)
      this.setState({
        enableTimers: true
    })
  })
  }

  disableTimers(){
    //console.log("ethbat makank")
    this.setState({
      enableTimers: false
    })

  }
  render(){
    return (
        <div>
          <ReactInterval timeout={25} enabled={this.state.enableTimers} callback={this.requestUpdates}/>
          <div>
            <div>
              <Header/>
            </div>
            <div className="bodycontainer">
              <div className="inputContainer">
                <div className="simulationButtonContainer"><button onClick={this.startSimulation} className="simulationButton">Start Simulation</button></div>
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