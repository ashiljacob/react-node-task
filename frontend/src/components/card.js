import React from 'react'
import {Card} from 'react-bootstrap'

class SquareBox extends React.Component {
   
    render() {
        return(
           
            
            <div style={{marginTop:'10px',width:'250px',height:'100px',float:'left'}}>
                
                
                <Card bg="primary" text="white" className="text-center p-3">
                    <blockquote className="blockquote mb-0 card-body">
                    <p>
                        {this.props.cont} 
                    </p>
                    <h4>{this.props.alert}  {this.props.time}</h4>
                    
                    </blockquote>
                </Card>
                
            </div>
        )
    }
}

export default SquareBox