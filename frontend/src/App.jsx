import { useState } from 'react'
import './App.css'



function App() {


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
        <div class="container-fluid dashboard-container">
          <div class="container update-section">
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
          <div class="container object-section">
            <h2></h2>
            <div class="card w-100 mini-map">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">View</a>
              </div>
            </div>

            <div class="container text-center minimap-section">
              <div class="row row-cols-2 minimaps">
                <div class="col">1</div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
                <div class="col">6</div>
                <div class="col">7</div>
                <div class="col">8</div>
                <div class="col">9</div>
                <div class="col">10</div>
                <div class="col">11</div>
                <div class="col">12</div>
                <div class="col">13</div>
                <div class="col">14</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
