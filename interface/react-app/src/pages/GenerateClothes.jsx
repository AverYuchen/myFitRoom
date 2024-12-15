import { useState } from 'react'
import { Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sparkles, Wand2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './GenerateClothes.css'
import myLogo from '../assets/myFitRoomLogo_250.png'

function GenerateClothes() {
    const navigate = useNavigate()
    const [inputText, setInputText] = useState('');
    const [generatePrompt, setGeneratePrompt] = useState('');
    const [generateOutfit, setGenerateOutfit] = useState('');
    
    const handleInput= (event) => {
        setInputText(event.target.value);
    };
    const handleGenerateButton = () => {
        setGeneratePrompt(inputText)
        handleOutfitGeneration()
    }
    const handleSuggestedGeneration = (value) => {
        setGeneratePrompt(value)
        handleOutfitGeneration()
    }
    const handleOutfitGeneration = () => {
        if(generatePrompt == 'a white T-shirt with Star War theme with a white background'){
            setGenerateOutfit('/images/myClothes/cloth1.jpg')
        } 
        if(generatePrompt == 'a red polka dot dress with a white background'){
            setGenerateOutfit('/images/myClothes/cloth2.jpg')
        } 
    }
    
    
    return (
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-light bg-light">
                <div className="container">
                  <button 
                    className="navbar-brand btn btn-link p-0" 
                    onClick={() => navigate('/')}
                  >
                    <img 
                      src={myLogo}
                      width="30" 
                      height="30" 
                      className="d-inline-block align-top" 
                      alt="MyFitRoom"
                    />
                    MyFitRoom
                  </button>
                </div>
            </nav>
        <div className = "container">
            <div className='column'>
                <div>
                    <h5>
                        What kind of clothes do you want?
                    </h5>
                    <input type = "text"
                            value = {inputText}
                            onChange = {handleInput}
                            placeholder = "a white shirt with hello kitty"
                            />
                    <Button onClick = {handleGenerateButton}>Generate</Button>
                </div>
                <div>
                    <h5>
                        Suggested Prompts
                    </h5>
                    <Button onClick={() => handleSuggestedGeneration("a red dress")}>a red dress</Button>
                    <Button onClick={() => handleSuggestedGeneration("a black pants")}>a black pants</Button>
                    <Button onClick={() => handleSuggestedGeneration("a yellow top")}>a yellow top</Button>
                </div>
            </div>
            <div className = "column">
                <h5>Your generated clothes:</h5>
                <div className="rectangle-box">
                    {generateOutfit && (<img src={generateOutfit}
                    alt="MyFitRoom"/>)}
                </div>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        </div>
      </div>
    )
  }

export default GenerateClothes;