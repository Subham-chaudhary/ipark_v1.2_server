import { useState } from 'react'
import './App.css'



function App() {
  const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(true);
  const [objectSectionVisible, setObjectSectionVisible] = useState(true);

  const [updateTogglerRotated, setUpdateTogglerRotated] = useState(false);
  const [objectTogglerRotated, setObjectTogglerRotated] = useState(false);

  const handleToggle = () => {
    setIsUpdateSectionVisible(!isUpdateSectionVisible);
    setUpdateTogglerRotated(!updateTogglerRotated);
  };

  return (
    <>
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">i-Park</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup" >
              <div class="navbar-nav" style={{ flex: 1, justifyContent: 'space-around' }}>
                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                <a class="nav-link active" href="#">Map</a>
                <a class="nav-link" href="#">Stats</a>
                <a class="nav-link" href="#">Record</a>
                <a class="nav-link" href="#">Users</a>
                <a class="nav-link" href="#">Others</a>
                <a class="nav-link" href="#">Control</a>
                <a class="nav-link" href="#">Settings</a>
              </div>
            </div>
          </div>
        </nav>

        <div class="container-fluid toggler-container">
          <button className="btn btn-primary update-toggler" onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={updateTogglerRotated ? 'rotated' : ''}>
              <g>
                <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z" />
                <polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293" />
              </g>
            </svg>

          </button>

          <button
            className="btn btn-primary object-toggler"
            onClick={() => {
              // toggle object section visibility
              setObjectSectionVisible(!objectSectionVisible);
              setObjectTogglerRotated(!objectTogglerRotated);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={objectTogglerRotated ? 'rotated' : ''}
            >
              <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
            </svg>
          </button>
        </div>

        <div class="container-fluid dashboard-container">
          <div class="container update-section"
            style={{ display: isUpdateSectionVisible ? 'block' : 'none' }}>
            <h2></h2>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
          <div class="container map-section">
            <h2></h2>
            <div class="card w-100">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div class="container object-section"
            style={{ display: objectSectionVisible ? 'block' : 'none' }}>
            <h2></h2>
            {objectSectionVisible && (
              <div>
                <div className="card w-100 mini-map">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">View</a>
                  </div>
                </div>

                <div className="container text-center minimap-section">
                  <div className="row row-cols-2 minimaps">
                    <div className="col">1</div>
                    <div className="col">2</div>
                    <div className="col">3</div>
                    <div className="col">4</div>
                    <div className="col">5</div>
                    <div className="col">6</div>
                    <div className="col">7</div>
                    <div className="col">8</div>
                    <div className="col">9</div>
                    <div className="col">10</div>
                    <div className="col">11</div>
                    <div className="col">12</div>
                    <div className="col">13</div>
                    <div className="col">14</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
