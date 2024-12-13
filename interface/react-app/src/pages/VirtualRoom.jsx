import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import myLogo from '../assets/myFitRoomLogo_250.png'

// Mock MyClothes
const clothGrid = [
    { id: '1', src: '/images/myClothes/cloth1.jpg' },
    { id: '2', src: '/images/myClothes/cloth2.jpg' },
    { id: '3', src: '/images/myClothes/cloth3.jpg' },
    { id: '4', src: '/images/myClothes/cloth4.jpg' },
    { id: '5', src: '/images/myClothes/cloth5.jpg' },
];

// Mock MyPhotos
const photoGrid = [
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

    const handlePhotoSelect = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleClothSelect = (cloth) => {
        setSelectedCloth(cloth);
    };

    function handleTryOn() {
        if (photoSelected && clothSelected) {
          setTryOnResult(`/images/myTryOn/tryon${clothSelected.id}.png`);
        }
    };

    function handleSave() {
        if (tryOnResult) {
          console.log('Saving result:', tryOnResult);
        }
    }

    return (
        <div className="container-fluid p-0">
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

            {/* Main Content */}
            <div className="container mt-4">
                <div className='row'>
                    {/* Choose your photo */}
                    <div className="col-md-4">
                        <h4>Choose your photo</h4>
                        <div className="card mb-3">
                            <div className="card-body">
                                {/* Frame A */}
                                <div className="border rounded p-2 mb-3" style={{ height: '300px' }}>
                                  {photoSelected && (
                                    <img 
                                      src={photoSelected.src} 
                                      alt="Selected" 
                                      className="img-fluid h-100 w-100 object-fit-cover"
                                    />
                                  )}
                                </div>
                                {/* Button for half-body or full-body */}
                                <div className="mb-3">
                                  <div className="btn-group w-100">
                                    <button 
                                      className={`btn ${bodyType === 'half-body' ? 'btn-primary' : 'btn-outline-primary'}`}
                                      onClick={() => setBodyType('half-body')}
                                    >
                                      Half-body
                                    </button>
                                    <button 
                                      className={`btn ${bodyType === 'full-body' ? 'btn-primary' : 'btn-outline-primary'}`}
                                      onClick={() => setBodyType('full-body')}
                                    >
                                      Full-body
                                    </button>
                                  </div>
                                </div>
                                {/* Grid for myPhotos */}
                                <div className="row g-2">
                                  {photoGrid.map((photo) => (
                                    <div key={photo.id} className="col-4">
                                      <img 
                                        src={photo.src}
                                        alt=""
                                        className="img-thumbnail cursor-pointer"
                                        onClick={() => handlePhotoSelect(photo)}
                                        style={{ cursor: 'pointer' }}
                                      />
                                    </div>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Choose your cloth */}
                    <div className="col-md-4">
                        <h4>Choose your cloth</h4>
                        <div className="card mb-3">
                            <div className="card-body">
                                {/* Frame B */}
                                <div className="border rounded p-2 mb-3" style={{ height: '300px' }}>
                                  {clothSelected && (
                                    <img 
                                      src={clothSelected.src} 
                                      alt="Selected" 
                                      className="img-fluid h-100 w-100 object-fit-cover"
                                    />
                                  )}
                                </div>
                                {/* Grid for cloth */}
                                <div className="row g-2">
                                  {clothGrid.map((cloth) => (
                                    <div key={cloth.id} className="col-4">
                                      <img 
                                        src={cloth.src}
                                        alt=""
                                        className="img-thumbnail cursor-pointer"
                                        onClick={() => handleClothSelect(cloth)}
                                        style={{ cursor: 'pointer' }}
                                      />
                                    </div>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Try-on selection */}
                    <div className="col-md-4">
                        <h4>Try-on selection</h4>
                        <div className="card mb-3">
                            <div className="card-body">
                                {/* Frame C */}
                                <div className="border rounded p-2 mb-3" style={{ height: '300px' }}>
                                  {tryOnResult && (
                                    <img 
                                      src={tryOnResult} 
                                      alt="Result" 
                                      className="img-fluid h-100 w-100 object-fit-cover"
                                    />
                                  )}
                                </div>
                                {/* try-on type button */}
                                {bodyType === 'full-body' && (
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
                                )}
                                {/* Start to try-on button */}
                                <button 
                                  className="btn btn-primary w-100 mb-2"
                                  onClick={handleTryOn}
                                  disabled={!photoSelected || !clothSelected}
                                >
                                  Start to try on
                                </button>
                                {/* Save button */}
                                <button 
                                  className="btn btn-success w-100"
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