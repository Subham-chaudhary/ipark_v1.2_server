import { useState, useEffect, Suspense, lazy } from "react";
import MapHolder from "./MapHolder";
import './HomePage.css';


// Lazy load sidebar content components
const LeftSidebarContentMap = lazy(() => import('./LeftSidebarContentMap'));
const LeftSidebarContentAnalytics = lazy(() => import('./LeftSidebarContentAnalytics'));
const LeftSidebarContentGraph = lazy(() => import('./LeftSidebarContentGraph'));
const LeftSidebarContentRecords = lazy(() => import('./LeftSidebarContentRecords'));
const LeftSidebarContentStaff = lazy(() => import('./LeftSidebarContentStaff'));


const RightSidebarContentMap = lazy(() => import('./RightSidebarContentMap'));
const RightSidebarContentAnalytics = lazy(() => import('./RightSidebarContentAnalytics'));
const RightSidebarContentGraph = lazy(() => import('./RightSidebarContentGraph'));
const RightSidebarContentRecords = lazy(() => import('./RightSidebarContentRecords'));
const RightSidebarContentStaff = lazy(() => import('./RightSidebarContentStaff'));

const HomePage = () => {
    const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(true);
    const [objectSectionVisible, setObjectSectionVisible] = useState(true);

    const [updateTogglerRotated, setUpdateTogglerRotated] = useState(false);
    const [objectTogglerRotated, setObjectTogglerRotated] = useState(false);

    //to toggle the sidebar buttons
    const handleToggle = () => {
        setIsUpdateSectionVisible(!isUpdateSectionVisible);
        setUpdateTogglerRotated(!updateTogglerRotated);
    };
    //to toggle the sidebars 
    const handleObjectToggle = () => {
        setObjectSectionVisible(!objectSectionVisible);
        setObjectTogglerRotated(!objectTogglerRotated);
    };

    //this is pop-up a scroll to top button when users scrolls down a bit
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


    // State to manage active tab
    const [activeTab, setActiveTab] = useState('map');

    const handleTabChange = (tab) => {
        console.log("hel");

        setActiveTab(tab);
    };

    const getLeftSidebarContent = () => {
        switch (activeTab) {
            case 'map':
                return <LeftSidebarContentMap />;
            case 'analytics':
                return <LeftSidebarContentAnalytics />;
            // Add other cases for each tab
            default:
                return <div>Select a tab</div>;
        }
    };

    const getRightSidebarContent = () => {
        switch (activeTab) {
            case 'map':
                return <RightSidebarContentMap />;
            case 'analytics':
                return <RightSidebarContentAnalytics />;
            // Add other cases for each tab
            default:
                return <div>Select a tab</div>;
        }
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
                                <label className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'map'}
                                        onChange={() => handleTabChange('map')}
                                    />
                                    Map
                                </label>
                                <label className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'analytics'}
                                        onChange={() => handleTabChange('analytics')}
                                    />
                                    Analytics
                                </label>
                                <label className={`nav-link ${activeTab === 'graph' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'graph'}
                                        onChange={() => handleTabChange('graph')}
                                    />
                                    Graph
                                </label>
                                <label className={`nav-link ${activeTab === 'operators' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'operators'}
                                        onChange={() => handleTabChange('operators')}
                                    />
                                    Operators
                                </label>
                                <label className={`nav-link ${activeTab === 'records' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'records'}
                                        onChange={() => handleTabChange('records')}
                                    />
                                    Records
                                </label>
                                <label className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === 'settings'}
                                        onChange={() => handleTabChange('settings')}
                                    />
                                    Settings
                                </label>
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

                    {/* update section container sidebar */}
                    <div className="container update-section"
                        style={{ display: isUpdateSectionVisible ? 'block' : 'none' }}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {getLeftSidebarContent()}
                        </Suspense>
                    </div>


                    <div className="container map-section">
                        <div className="svg-container">
                            {activeTab === 'map' && <MapHolder />}
                            {activeTab === 'analytics' && <div><h2>Analytics Section</h2></div>}
                            {activeTab === 'graph' && <div><h2>Graph Section</h2></div>}
                            {activeTab === 'staff' && <div><h2>Staff Section</h2></div>}
                            {activeTab === 'records' && <div><h2>Records Section</h2></div>}
                            {activeTab === 'settings' && <div><h2>Settings Section</h2></div>}

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
