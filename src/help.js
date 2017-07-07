import React, { Component } from 'react';
import './help.css';
import Header from './components/Header.js'
import Data from './helpContent.js'

class Help extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:""
        }
        this.setActive=this.setActive.bind(this);
    }
    setActive(event){
        var tab = event.target.textContent
        this.setState({
            selectedTab: tab
        })
    }
    render(){
       return(
           <div>
                <div>
                    <Header/>
                </div>
                <div className="pageContainer">
                    <div className="indexContainer">
                        <div>
                        {Data.indexData.content.map(obj=>{
                            return (
                                    <div key={obj.Q} onClick={this.setActive}  className={this.state.selectedTab === obj.Q? "index selected" : "index"}>
                                        <h5  key={obj.Q} >
                                            {obj.Q}
                                        </h5>
                                    </div>
                                )
                        })
                        }
                        </div>
                    </div>
                    <div className="contentContainer">
                        {Data.helpData.content.map(obj=>{
                            console.log(obj.A)
                            return (
                                
                                <div key={obj.Q} className={this.state.selectedTab === obj.Q ? "content active":"content"}>
                                    <h4>{obj.Q}</h4>
                                    <div><p>{obj.A}</p></div>
                                </div>
                                )
                        })
                        }
                    </div>
                    
                </div>
            </div>
       ) 
    }
}

export default Help;