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
        <header className="header">
              <div className="logo-section">
                <button 
                    className="navbar-brand btn btn-link p-0" 
                    onClick={() => navigate('/')}
                  >
                <img src={myLogo} alt="MyFitRoom" className="header-logo" />
                </button>
                <span className="title">MyFitRoom</span>
              </div>
            </header>

        {/* Main Content */}
        <div style={{ marginTop: '20px' }}></div>
        <div className="main-content">
        <div className = "container">
        <div className='column'>
                <div>
                    <h5 className="m-0 gradient-text fw-semibold">
                        What kind of clothes do you want?
                    </h5>
                <div style={{ marginTop: '30px' }}></div>
                    <textarea 
                            className = "inputbox"
                            type = "text"
                            value = {inputText}
                            onChange = {handleInput}
                            placeholder = "A white shirt with hello kitty..."
                            style={{ width: '80%', height: '200px' }}
                            />
                    <div>
                    <div style={{ marginTop: '20px' }}></div>
                        <button className = "Button" onClick = {handleGenerateButton}>Generate</button>
                    </div>
                </div>
                <div>
                <div style={{ marginTop: '35px' }}></div>
                    <h5 className="m-0 gradient-text fw-semibold">
                        Suggested Prompts
                    </h5>
                    <div style={{ marginTop: '30px' }}></div>
                    <div>
                        <button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a white T-shirt with Star War theme with a white background")}>a white T-shirt with Star War theme with a white background</button>
                    </div>
                    <div style={{ marginTop: '30px' }}></div>
                    <div>
                        <button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a black pants")}>a black pants</button>
                    </div>
                    <div style={{ marginTop: '30px' }}></div>
                    <div>
                        <button className = "suggestedPrompts" onClick={() => handleSuggestedGeneration("a yellow top")}>a yellow top</button>
                    </div>
                </div>
            </div>
            <div className = "column">
                <h5 className="m-0 gradient-text fw-semibold">Your generated clothes:</h5>
                <div style={{ marginTop: '25px' }}></div>
                <div className="rectangle-box"
                style={{ width: '65%', height: '65%' }}>
                    {
                    generateOutfit && (
                    <img src={generateOutfit} 
                    style={{ width: '100%', height: '100%' }}
                    alt="MyFitRoom"/ >)}
                </div>
                <div style={{ marginTop: '25px' }}>
                {generateOutfit && (<button className="Button" style={{ marginLeft: '140px' }}
                onClick={handleDownload}>Download</button>)}
                {generateOutfit && !saveToCloset &&(<button className="Button" style={{ marginLeft: '140px' }}
                onClick={handleSaveToCloset}>Save to My Closet</button>)}
                {isPopupVisible && (
                    <div className="popupOverlayStyle" style={{ marginLeft: '140px' }}>
                    <div className="popupContentStyle">
                        <h2>Clothes Saved!</h2>
                        <button
                        onClick={closePopup}
                        className='popup-button'
                        style={{ marginLeft: '130px' }}
                        >
                        Close
                        </button>
                    </div>
                </div>)}
                {saveToCloset &&(<button className="Button" style={{ marginLeft: '140px' }} onClick={() => navigate('/virtual-room')}>Try it on!</button>)}
                {generateOutfit && (<button className="Button" style={{ marginLeft: '140px' }}
                onClick={reset}>Clear    </button>)}
                </div>
            </div>
        </div>
      </div>
        </div>
    )
  }

export default GenerateClothes;