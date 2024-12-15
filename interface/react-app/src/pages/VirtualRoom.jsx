import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ShirtIcon, Wand2, Sparkles} from 'lucide-react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import myLogo from '../assets/myFitRoomLogo_250.png'
import './VirtualRoom.css';  

// Mock MyClothes
const initialClothGrid = [
    { id: '1', src: '/images/myClothes/cloth1.jpg' },
    { id: '2', src: '/images/myClothes/cloth2.jpg' },
    { id: '3', src: '/images/myClothes/cloth3.jpg' },
    { id: '4', src: '/images/myClothes/cloth4.jpg' },
    { id: '5', src: '/images/myClothes/cloth5.jpg' },
];

// Mock MyPhotos
const initialPhotoGrid = [
    { id: '1', src: '/images/myPhotos/model1.jpg' },
    { id: '2', src: '/images/myPhotos/model2.jpg' },
    { id: '3', src: '/images/myPhotos/model3.jpg' },
    { id: '4', src: '/images/myPhotos/model4.jpg' },
    { id: '5', src: '/images/myPhotos/model5.jpg' },
];

function VirtualRoom() {
    const navigate = useNavigate();
    const [photoSelected, setSelectedPhoto] = useState(null);
    const [clothSelected, setSelectedCloth] = useState(null);
    const [bodyType, setBodyType] = useState(''); // half-body or full-body
    const [tryOnType, setTryOnType] = useState(''); // upper, lower, or dress
    const [tryOnResult, setTryOnResult] = useState(null);

    // state for managing grids and uploads
    const [photoGrid, setPhotoGrid] = useState(initialPhotoGrid);
    const [clothGrid, setClothGrid] = useState(initialClothGrid);
    const [photoNextId, setPhotoNextId] = useState(6);
    const [clothNextId, setClothNextId] = useState(6);

    // Refs for file inputs
    const photoInputRef = useRef(null);
    const clothInputRef = useRef(null);

    // Handle photo select
    const handlePhotoSelect = (photo) => {
        setSelectedPhoto(photo);
    };

    // Handle cloth select
    const handleClothSelect = (cloth) => {
        setSelectedCloth(cloth);
    };

    // Handle photo upload
    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
              const newPhoto = {
                  id: `uploaded-${Date.now()}`,
                  src: reader.result
              };
              setSelectedPhoto(newPhoto);
          };
          reader.readAsDataURL(file);
      }
      event.target.value = '';
    };

    // Handle cloth upload
    const handleClothUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const newCloth = {
                    id: `uploaded-${Date.now()}`,
                    src: reader.result
                };
                setSelectedCloth(newCloth);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    // Trigger file input click
    const triggerPhotoUpload = () => {
        photoInputRef.current.click();
    };

    const triggerClothUpload = () => {
        clothInputRef.current.click();
    };

    // for upper-lower-dress style
     const customStyles = {
    baseButton: {
      fontFamily: "'Baloo 2', cursive",
      borderColor: '#212529',
      transition: 'all 0.3s ease',
      padding: '0.5rem 1rem'
    },
    blackActive: {
      backgroundColor: '#212529',
      borderColor: '#212529',
      color: '#fff'
    },
    blackInactive: {
      backgroundColor: 'transparent',
      borderColor: '#212529',
      color: '#000'
    },
    pinkActive: {
      backgroundColor: '#FFC0CB',
      borderColor: '#212529',
      color: '#000'
    },
    pinkInactive: {
      backgroundColor: 'transparent',
      borderColor: '#212529',
      color: '#000'
    }
  };

  const hoverStyles = `
    .black-btn:hover {
      background-color: #212529 !important;
      color: #fff !important;
    }
    .pink-btn:hover {
      background-color: #FFC0CB !important;
      color: #000 !important;
    }
  `;


    function handleTryOn() {
        if (photoSelected && clothSelected) {
            if (photoSelected.id.startsWith('uploaded') && clothSelected.id.startsWith('uploaded')) {
                setTryOnResult(`/images/myTryOn/tryon${photoNextId}.png`);
            } else if (photoSelected.id.startsWith('uploaded')) {
                setTryOnResult(`/images/myTryOn/tryon${clothSelected.id}.png`);
            } else if (clothSelected.id.startsWith('uploaded')) {
                setTryOnResult(`/images/myTryOn/tryon${photoSelected.id}.png`);
            } else {
                setTryOnResult(`/images/myTryOn/tryon${clothSelected.id}.png`);
            }
        }
    };

    function handleSave() {
        if (tryOnResult) {
          // Save uploaded photo if exists
          if (photoSelected && photoSelected.id.startsWith('uploaded')) {
              const newPhoto = {
                  id: String(photoNextId),
                  src: photoSelected.src
              };
              const updatedPhotoGrid = [
                  ...photoGrid.slice(1),
                  newPhoto
              ];
              setPhotoGrid(updatedPhotoGrid);
              setPhotoNextId(photoNextId + 1);
          }

          // Save uploaded cloth if exists
          if (clothSelected && clothSelected.id.startsWith('uploaded')) {
              const newCloth = {
                  id: String(clothNextId),
                  src: clothSelected.src
              };
              const updatedClothGrid = [
                  ...clothGrid.slice(1),
                  newCloth
              ];
              setClothGrid(updatedClothGrid);
              setClothNextId(clothNextId + 1);
          }

          // Clear temporary states
          setSelectedPhoto(null);
          setSelectedCloth(null);
          setTryOnResult(null);
        }
    }

    return (
        <div className="container-fluid p-0">
            {/* Hidden file inputs */}
            <input
                type="file"
                ref={photoInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <input
                type="file"
                ref={clothInputRef}
                onChange={handleClothUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />

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

            {/* <nav className="navbar navbar-light bg-light">
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
            </nav> */}

            {/* Main Content */}
            <div className="container mt-4">
                <div className='row'>
                    {/* Choose your photo */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-2 mb-3">
                      <motion.div
                        animate={{ 
                          y: [-2, 2, -2],
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut"
                        }}>
                          <Camera className="gradient-icon" size={24} />
                      </motion.div>
                        <h4 className="m-0 gradient-text fw-semibold">My photo albums</h4>
                      </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                {/* Frame A */}
                                <div className="preview-frame">
                                  {photoSelected && (
                                    <img 
                                      src={photoSelected.src} 
                                      alt="Selected" 
                                      className="w-100 h-100 object-fit-cover rounded"
                                    />
                                  )}
                                </div>

                                {/* Button for half-body or full-body */}
                                <div className="mb-3"></div>
                                <div className="mb-3">
                                <style>{hoverStyles}</style>
                                <div className="btn-group w-100">
                                  <button
                                    className={`btn ${
                                      bodyType === 'half-body' 
                                        ? 'btn-dark' 
                                        : 'btn-outline-dark'
                                    }`}
                                    style={customStyles.baseButton}
                                    onClick={() => setBodyType('half-body')}
                                  >
                                    Half-body
                                  </button>
                                  <button
                                    className="btn pink-btn"
                                    style={{
                                      ...customStyles.baseButton,
                                      ...(bodyType === 'full-body' 
                                        ? customStyles.pinkActive 
                                        : customStyles.pinkInactive)
                                    }}
                                    onClick={() => setBodyType('full-body')}
                                  >
                                    Full-body
                                  </button>
                                </div>
                              </div>
                                {/* <div className="mb-3">
                                  <div className="toggle-btn-group">
                                    <button 
                                      className={`toggle-btn ${bodyType === 'half-body' ? 'active' : ''}`}
                                      onClick={() => setBodyType('half-body')}
                                    >
                                      Half-body
                                    </button>
                                    <button 
                                      className={`toggle-btn ${bodyType === 'full-body' ? 'active' : ''}`}
                                      onClick={() => setBodyType('full-body')}
                                    >
                                      Full-body
                                    </button>
                                  </div>
                                </div> */}

                                {/* Grid for myPhotos */}
                                <div className="row g-2">
                                    {/* Show photos */}
                                    {[...photoGrid].reverse().map((photo) => (
                                      <div key={photo.id} className="col-4">
                                        <img 
                                          src={photo.src}
                                          alt=""
                                          className="img-thumbnail cursor-pointer"
                                          onClick={() => handlePhotoSelect(photo)}
                                        />
                                      </div>
                                    ))}

                                    {/* Upload Button */}
                                    <div className="col-4">
                                    <button className="upload-button" onClick={triggerPhotoUpload}>
                                      <Upload className="upload-icon" size={28} strokeWidth={2} />
                                      <span className="upload-text">Upload</span>
                                  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Choose your cloth */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-2 mb-3 title-wrapper">
                        <ShirtIcon className="gradient-icon animated-icon" size={24} />
                        <h4 className="m-0 fw-semibold gradient-text animated-text">My closet</h4>
                      </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                {/* Frame B */}
                                <div className="preview-frame">
                                  {clothSelected && (
                                    <img 
                                      src={clothSelected.src} 
                                      alt="Selected" 
                                      className="w-100 h-100 object-fit-cover rounded"
                                    />
                                    
                                  )}
                                </div>

                                <div className="mb-3">  
                                </div>
                               
                                {/* Grid for cloth */}
                                <div className="row g-2" >
                                    {/* Show cloth */}
                                    {[...clothGrid].reverse().map((cloth) => (
                                      <div key={cloth.id} className="col-4">
                                        <img 
                                          src={cloth.src}
                                          alt=""
                                          className="img-thumbnail cursor-pointer"
                                          onClick={() => handleClothSelect(cloth)}
                                        />
                                      </div>
                                    ))}

                                    {/* Upload Button */}
                                    <div className="col-4">    
                                      <button className="upload-button" onClick={triggerClothUpload}>
                                        <Upload className="upload-icon" size={28} strokeWidth={2} />
                                        <span className="upload-text">Upload</span>
                                  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Try-on selection */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-2 mb-3 title-wrapper">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                        <Wand2 className="gradient-icon animated-icon" size={24} />
                        </motion.div>
                        <h4 className="m-0 fw-semibold gradient-text animated-text">Virtual Try-on</h4>
                      </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                
                                <div className="preview-frame">
                                  {tryOnResult && (
                                    <img 
                                      src={tryOnResult} 
                                      alt="Result" 
                                      className="img-fluid h-100 w-100 object-fit-cover"
                                    />
                                  )}
                                </div>
                                
                                
                                <div className="mb-3">  
                                </div>

                                {/* try-on type button */}
                                <style>{hoverStyles}</style>
                                {bodyType === 'full-body' && (
                                  <div className="btn-group w-100 mb-3">
                                    <button
                                      className={`btn ${
                                        tryOnType === 'upper' 
                                          ? 'btn-dark' 
                                          : 'btn-outline-dark'
                                      }`}
                                      style={customStyles.baseButton}
                                      onClick={() => setTryOnType('upper')}
                                    >
                                      Upper
                                    </button>
                                    <button
                                      className={`btn pink-btn`} // 添加自定义类名
                                      style={{
                                        ...customStyles.baseButton,
                                        ...(tryOnType === 'lower' 
                                          ? customStyles.pinkActive 
                                          : customStyles.pinkInactive)
                                      }}
                                      onClick={() => setTryOnType('lower')}
                                    >
                                      Lower
                                    </button>
                                    <button
                                      className={`btn ${
                                        tryOnType === 'dress' 
                                          ? 'btn-dark' 
                                          : 'btn-outline-dark'
                                      }`}
                                      style={customStyles.baseButton}
                                      onClick={() => setTryOnType('dress')}
                                    >
                                      Dress
                                    </button>
                                  </div>
                                )}
                                
                                {/* {bodyType === 'full-body' && (
                                  <div className="btn-group w-100 mb-3">
                                    <button 
                                      className={`btn ${tryOnType === 'upper' ? 'btn-primary' : 'btn-outline-primary'}`}
                                      onClick={() => setTryOnType('upper')}
                                    >
                                      Upper
                                    </button>
                                    <button 
                                      className={`btn ${tryOnType === 'lower' ? 'btn-primary' : 'btn-outline-primary'}`}
                                      onClick={() => setTryOnType('lower')}
                                    >
                                      Lower
                                    </button>
                                    <button 
                                      className={`btn ${tryOnType === 'dress' ? 'btn-primary' : 'btn-outline-primary'}`}
                                      onClick={() => setTryOnType('dress')}
                                    >
                                      Dress
                                    </button>
                                  </div>
                                )} */}
                                
                                {/* Start to try-on button */}
                                <button 
                                  className="btn btn-primary nav-button first-button w-100 mb-2"
                                  onClick={handleTryOn}
                                  disabled={!photoSelected || !clothSelected}
                                >
                                  Start to try on
                                  <Sparkles className="button-icon" size={20} />
                                  </button>

                                {/* Save button */} 
                                <button 
                                  // className="btn btn-success w-100"
                                  className="btn btn-success nav-button last-button w-100"
                                  onClick={handleSave}
                                  disabled={!tryOnResult}
                                >
                                  Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default VirtualRoom;