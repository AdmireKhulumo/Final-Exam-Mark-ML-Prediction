import React, {useState} from 'react';
import './App.css';
import Questions from './components/questions';
import axios from 'axios';
import {useQuery} from 'react-query';
import {Card} from "@material-ui/core";

const fetchPrediction = async ( query) =>{
  
    const res = await fetch ('http://127.0.0.1:5000/predict',{
      method: 'POST',
      body: JSON.stringify(query)
    });

    return res.json();

};


function App() {
  const [query, setQuery] = useState();
  const [prediction, setPrediction] = useState();
  
  const getPrediction = async(query1)=>{
      const result = await axios.post('http://127.0.0.1:5000/predict', query1);
     setPrediction(result.data);
  };


  return (
    <div className="App">
      <h1> <span role='img' ariel-aria-label='emoji'>🤷🏽‍♀️</span> What Mark Will I Get? <span role='img' ariel-aria-label='emoji'>🤷🏾‍♂️</span></h1>
      <Questions setQuery={setQuery} getPrediction={getPrediction}/>

      {prediction && 
        <div>
          <h3>Predicted Mark: {prediction*5}% </h3>
        </div>
      }


    </div>
  );
}

export default App;
