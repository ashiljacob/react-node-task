import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import SquareBox from './components/card'

let count = 0
let alert = 0
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
    }
    componentDidMount() {
        const apiUrl = 'http://localhost:5000';
        fetch(apiUrl)          
            .then((response) => response.json())
            .then(data => {
                this.setState({ data:data }) 
                // console.log(this.state.data);
                // console.log("Contents :",this.state.data[0].Parameter1)
                
            })
            .catch(() => console.log("Can’t access " + apiUrl + " response. Blocked by browser?"))
    }
      
    render() {
        console.log("Contents :",this.state.data)

        
        for (let i=48;i<this.state.data.length; i++) {
            console.log("I : ",i)
            if (this.state.data[i].Parameter1 >=3 && count<5) {
                count+=1
                console.log(this.state.data[i].Parameter1,"Count : ",count, "i : ",i)
                
            }else if (this.state.data[i].Parameter1 < 3){
                count = 0
                console.log("Inside elseif ",this.state.data[i].Parameter1)
            }
            else{
                alert+=1
                console.log("Alert")
                break
            }
                // console.log(this.state.data[i].Parameter1)
            

        }
    
      
        
        // const data = [
        //     {									
        //         color: "steelblue", 
        //         points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}] 
        //     },
        //     {									
        //         color: "red", 
        //         points: [{x: 1, y: 3}, {x: 3, y: 6}, {x: 7, y: -2}] 
        //     },
        //     {									
        //         color: "green", 
        //         points: [{x: 1, y: 4}, {x: 3, y: 7}, {x: 7, y: -1}] 
        //     },

        // ];
        const data = [
            {									
                color: "steelblue", 
                points: this.state.data.map((d) => {
                    {x: d.Receive_Date }
                })
            },
            {									
                color: "red", 
                points: [{x: 1, y: 3}, {x: 3, y: 6}, {x: 7, y: -2}] 
            },
            {									
                color: "green", 
                points: [{x: 1, y: 4}, {x: 3, y: 7}, {x: 7, y: -1}] 
            },

        ];
        

        return (
            <div>
              <div className='container-fluid bg-secondary'>
                <h1 className='text-center display-3'>Chart</h1>
              </div>
                <div className="App container" >
                    <h1>LineChart</h1>
                    <LineChart
                        width={600}
                        height={400}
                        data={data}
                        yLabel="Voltage"
                        xLabel ="Time"
                        
                    />
    
                </div>
                <div className='container' style={{marginTop:'40px',marginLeft:'1opx'}}>
                    <SquareBox cont='Power Outage in minutes'/>
                    <SquareBox cont='Last Power Outage'/>
                    <SquareBox cont='Critical Alert'alert={alert}/>
                    <SquareBox cont='Last Analysed Time'/>
                </div>
            		
            </div>
        );
    }
}