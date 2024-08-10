import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MapHolder from "./MapHolder";
import './HomePage.css';

const HomePage = () => {
    const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(true);
    const [objectSectionVisible, setObjectSectionVisible] = useState(true);

    const [updateTogglerRotated, setUpdateTogglerRotated] = useState(false);
    const [objectTogglerRotated, setObjectTogglerRotated] = useState(false);

    const handleToggle = () => {
        setIsUpdateSectionVisible(!isUpdateSectionVisible);
        setUpdateTogglerRotated(!updateTogglerRotated);
    };

    const handleObjectToggle = () => {
        setObjectSectionVisible(!objectSectionVisible);
        setObjectTogglerRotated(!objectTogglerRotated);
    };

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const minimapSection = document.querySelector('.minimap-section');

        const handleScroll = () => {
            if (minimapSection.scrollTop > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        minimapSection.addEventListener('scroll', handleScroll);

        return () => {
            minimapSection.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        const minimapSection = document.querySelector('.minimap-section');
        minimapSection.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    //for updating the notification slide bar

    const [updates, setUpdates] = useState([]);
    const [visibleUpdatesCount, setVisibleUpdatesCount] = useState(5);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newUpdate = {
                id: updates.length + 1,
                title: `Update ${updates.length + 1}`,
                description: `This is the description for update ${updates.length + 1}.`,
                timestamp: new Date().toLocaleTimeString()
            };

            setUpdates(prevUpdates => {
                const updatedUpdates = [newUpdate, ...prevUpdates];
                return updatedUpdates.length > 25 ? updatedUpdates.slice(0, 25) : updatedUpdates;
            });
        }, 10000); // Add a new update every 3 seconds

        return () => clearInterval(intervalId);
    }, [updates]);

    const loadMoreUpdates = () => {
        setVisibleUpdatesCount(prevCount => Math.min(prevCount + 5, updates.length));
    };

    //map section for zooming in and out
    // const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level 

    // const handleZoomIn = () => {
    //     setZoomLevel(prevZoom => prevZoom * 1.2); // Increase zoom level by 20%
    // };

    // const handleZoomOut = () => {
    //     setZoomLevel(prevZoom => Math.max(1, prevZoom / 1.2)); //Decrease zoom level by 20%, with a minimum zoom level of 1
    // };


    return (
        <>
            <div className="container-fluid mainpage-container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">i-Park</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav" style={{ flex: 1, justifyContent: 'space-around' }}>
                                <Link className="nav-link active" to="/">Map</Link>
                                <Link className="nav-link" to="/analytics">Analytics</Link>
                                <Link className="nav-link" to="/graph">Graph</Link>
                                <Link className="nav-link" to="/operators">Operators</Link>
                                <Link className="nav-link" to="/records">Records</Link>
                                <Link className="nav-link" to="/settings">Settings</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid toggler-container">
                    <button className="btn btn-primary update-toggler" onClick={handleToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={updateTogglerRotated ? 'rotated' : ''}>
                            <g>
                                <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z" />
                                <polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293" />
                            </g>
                        </svg>
                    </button>

                    <button className="btn btn-primary object-toggler" onClick={handleObjectToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={objectTogglerRotated ? 'rotated' : ''}>
                            <path d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z" />
                        </svg>
                    </button>
                </div>

                <div className="container-fluid dashboard-container">
                    <div className="container update-section"
                        style={{ display: isUpdateSectionVisible ? 'block' : 'none' }}>
                        <h2>Upcoming Updates</h2>
                        {updates.slice(0, visibleUpdatesCount).map(update => (
                            <div key={update.id} className="card w-100 mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{update.title}</h5>
                                    <p className="card-text">{update.description}</p>
                                    <p className="card-text"><small className="text-muted">{update.timestamp}</small></p>
                                </div>
                            </div>
                        ))}
                        {visibleUpdatesCount < updates.length && (
                            <button className="btn btn-primary" onClick={loadMoreUpdates}>Load More</button>
                        )}
                    </div>

                    <div className="container map-section">
                        <div className="svg-container">
                            <MapHolder/>

                            {/* <img
                                src="/maps/map1.svg"
                                alt="Main Map"
                                style={{
                                    transform: `scale(${zoomLevel})`,
                                    transformOrigin: 'center'
                                }}
                            /> */}
                        </div>
                        {/* <div className="zoom-controls">
                            <button className="zoom-button" onClick={handleZoomIn}>+</button>
                            <button className="zoom-button" onClick={handleZoomOut}>-</button>
                        </div> */}
                    </div>

                    <div className="container object-section" style={{ display: objectSectionVisible ? 'flex' : 'none' }}>
                        <div className="mini-map-container">
                            <div className="mini-map">
                                <img
                                    src="/maps/map1.svg"
                                    alt="Mini Map"
                                />
                            </div>

                            <div className="minimap-section">
                                <div className="row row-cols-1 row-cols-md-2 minimaps">
                                    <div className="col">
                                        <div className="card mini-map-card">
                                            <div className="card-body">
                                                <h5 className="card-title">Map 1</h5>
                                                <p className="card-text">Details about Map 1.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card mini-map-card">
                                            <div className="card-body">
                                                <h5 className="card-title">Map 2</h5>
                                                <p className="card-text">Details about Map 2.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card mini-map-card">
                                            <div className="card-body">
                                                <h5 className="card-title">Map 3</h5>
                                                <p className="card-text">Details about Map 3.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card mini-map-card">
                                            <div className="card-body">
                                                <h5 className="card-title">Map 4</h5>
                                                <p className="card-text">Details about Map 4.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showButton && (
                                    <button id="back-to-top-btn" onClick={scrollToTop}>
                                        ↑
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
