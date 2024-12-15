import { useState, useEffect } from 'react'
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
    const [saveToCloset, setSaveToCloset] = useState(false);
    const [pendingGeneration, setPendingGeneration] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (pendingGeneration) {
          handleOutfitGeneration();
          setPendingGeneration(false); // Reset the flag
        }
    }, [generatePrompt, pendingGeneration]);

    const handleInput= (event) => {
        setInputText(event.target.value);
    };
    const handleGenerateButton = () => {
        setGeneratePrompt(inputText);
        setPendingGeneration(true);
    }
    const handleSuggestedGeneration = (value) => {
        setGeneratePrompt(value);
        setPendingGeneration(true);
    }
    const handleOutfitGeneration = () => {
        if(generatePrompt == 'a white T-shirt with Star War theme with a white background'){
            setGenerateOutfit('/images/myClothes/cloth1.jpg')
        } 
        if(generatePrompt == 'a red polka dot dress with a white background'){
            setGenerateOutfit('/images/myClothes/cloth2.jpg')
        } 
    }
    const handleSaveToCloset = () => {
        console.log("You saved your clothes to you closet")
        setIsPopupVisible(true)
    }
    
    const closePopup = () => {
        setIsPopupVisible(false);
        setSaveToCloset(true); // Hide the pop-up
    };
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = generateOutfit; // Path to your image
        link.download = "myOutfit.jpg"; // File name for the downloaded image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    }
    const reset = () => {
        setInputText('');
        setGeneratePrompt('');
        setGenerateOutfit('');
        setSaveToCloset(false);
        setPendingGeneration(false);
        setIsPopupVisible(false);
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
                    <textarea 
                            className = "inputbox"
                            type = "text"
                            value = {inputText}
                            onChange = {handleInput}
                            placeholder = "a white shirt with hello kitty"
                            />
                    <div>
                        <Button className = "Button" onClick = {handleGenerateButton}>Generate</Button>
                    </div>
                </div>
                <div>
                    <h5>
                        Suggested Prompts
                    </h5>
                    <div>
                        <Button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a white T-shirt with Star War theme with a white background")}>a white T-shirt with Star War theme with a white background</Button>
                    </div>
                    <div>
                        <Button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a black pants")}>a black pants</Button>
                    </div>
                    <div>
                        <Button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a yellow top")}>a yellow top</Button>
                    </div>
                </div>
            </div>
            <div className = "column">
                <h5>Your generated clothes:</h5>
                <div className="rectangle-box">
                    {generateOutfit && (<img src={generateOutfit}
                    alt="MyFitRoom"/>)}
                </div>
                {generateOutfit && (<button className="Button" onClick={handleDownload}>Download the clothes</button>)}
                {generateOutfit && !saveToCloset &&(<Button className="Button" onClick={handleSaveToCloset}>Save to My Closet</Button>)}
                {isPopupVisible && (
                    <div className="popupOverlayStyle">
                    <div className="popupContentStyle">
                        <h2>Clothes Saved!</h2>
                        <p>Your outfit has been successfully saved to your virtual closet.</p>
                        <button
                        onClick={closePopup}
                        className='popup-button'
                        >
                        Close
                        </button>
                    </div>
                </div>)}
                {saveToCloset &&(<Button className="Button" onClick={() => navigate('/virtual-room')}>Try it on!</Button>)}
                {generateOutfit && (<Button className="Button" onClick={reset}>Discard</Button>)}
            </div>
        </div>
      </div>
    )
  }

export default GenerateClothes;