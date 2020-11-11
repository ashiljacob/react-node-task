import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
import SquareBox from './components/card'

let count = 0
let count1 = 0
let alert = 0
var dic = []
let power = true
let time = null



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

  // Parameter 1      

  
        for (let i=0;i<this.state.data.length; i++) {
           
            if (this.state.data[i].Parameter1 >=3 && count<5) {
                count+=1
                console.log(this.state.data[i].Parameter1,"Count : ",count, "i : ",i)
                
            }else if (this.state.data[i].Parameter1 < 3){
                count = 0
                console.log("Inside elseif ",this.state.data[i].Parameter1)
            }
            else{
                alert++
                console.log("Alert")

                break
            }    
        }

        // parameter 5 checking
        for (let i=0;i<this.state.data.length; i++) {
    
            if (this.state.data[i].Parameter5 === 0 && count1<10) {
                count1+=1
                power = false
                console.log(this.state.data[i].Parameter5,"Count : ",count1, " i : ",i)
                
            }else if (this.state.data[i].Parameter5 > 0){
                count = 0
                power = true
                time=new Date().toLocaleTimeString() +" "+ new Date().toDateString()
                console.log(time,new Date().toDateString())
                // console.log("Inside elseif ",this.state.data[i].Parameter5)
            }
            else{
                console.log("Power Is OK")
                
            }    

        }
       
    
      console.log(this.state.data[0])

    // creating dynamic data for the graph  

      this.state.data.map((item) => {
            dic.push({
                x:item.Parameter1,
                y:item.Receive_Time
            },
            {
                x:item.Parameter2,
                y:item.Receive_Time
            },
            {
                x:item.Parameter3,
                y:item.Receive_Time
            })
        })

    // Test Data
        const data = [
            {									
                color: "steelblue", 
                points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}] 
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
                <h1 className='text-center display-3'>Website</h1>
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
                    <SquareBox cont='Last Power Outage' time={time}/>
                    <SquareBox cont='Critical Alert'alert={alert}/>
                    <SquareBox cont='Last Analysed Time'time={new Date().toLocaleTimeString() +" "+ new Date().toDateString()}/>
                </div>
            		
            </div>
        );
    }
}