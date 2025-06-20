import { useState, useEffect, Suspense, lazy, startTransition } from "react";
import './Styles/HomePage.css';
import mqtt from 'mqtt';
import { saveMessageToDB, getMessagesFromDB } from './Tabs/indexedDb';


// Lazy load sidebar content components
const LeftSidebarContentMap = lazy(() => import('./LeftSidebarContentMap'));

const RightSidebarContentMap = lazy(() => import('./RightSidebar/RightSidebarContentMap'));
const RightSidebarContentAnalytics = lazy(() => import('./RightSidebar/RightSidebarContentAnalytics'));
const RightSidebarContentGraph = lazy(() => import('./RightSidebar/RightSidebarContentGraph'));
const RightSidebarContentRecords = lazy(() => import('./RightSidebar/RightSidebarContentRecords'));
const RightSidebarContentStaff = lazy(() => import('./RightSidebar/RightSidebarContentStaff'));

//imports for the tabs
const MapHolder = lazy(() => import('./Tabs/MapHolder'))
const AnalyticSection = lazy(() => import('./Tabs/Analytics'));
const GraphSection = lazy(() => import('./Tabs/Graph'));
const OperatorSection = lazy(() => import('./Tabs/Staff'));
const RecordSection = lazy(() => import('./Tabs/Records'));
const SettingSection = lazy(() => import('./Tabs/Settings'));

const HomePage = () => {
    const [isUpdateSectionVisible, setIsUpdateSectionVisible] = useState(true);
    const [objectSectionVisible, setObjectSectionVisible] = useState(false);

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


    // MQTT connection settings
    const host = "ws://broker.mqttdashboard.com:8000/mqtt";
    // Topics for different events
    const topics = {
        checkIn: "ParQ/checkIn",
        checkOut: "ParQ/checkOut",
        trespassing: "ParQ/tresspaser"
    };

    // Helper function to format the time from the array
    const formatTime = (timeArray) => {
        const [year, month, day, hour, minute, second] = timeArray;
        return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
    };

    const [updates, setUpdates] = useState([]);
    // Handle MQTT connection and message reception
    useEffect(() => {
        const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
        const options = { clientId };

        const client = mqtt.connect(host, options);

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            Object.values(topics).forEach((topic) => {
                client.subscribe(topic, (err) => {
                    if (!err) {
                        console.log(`Subscribed to ${topic}`);
                    } else {
                        console.error(`Subscription error for topic ${topic}:`, err);
                    }
                });
            });
        });

        // Handle incoming MQTT messages
        client.on('message', (topic, message) => {
            try {
                const jsonMessage = JSON.parse(message.toString());
                const { uuid, plate_number, parking_spot, time } = jsonMessage;
                const event=topic.split('/').pop();

                var newUpdate = {};
                // console.log(jsonMessage);
                

                // Handle check-in, check-out, and trespassing messages
                if (topic === topics.checkIn) {
                    newUpdate = {
                        uid: uuid,
                        key: `checkIn-${Date.now()}`,
                        id: `checkIn-${Date.now()}`,
                        event:event,
                        parking_spot:parking_spot,
                        plate_number:plate_number,
                        description: `Plate Number: ${plate_number}, Time: ${formatTime(time)}`,
                        timestamp: formatTime(time)
                    };
                } else if (topic === topics.checkOut) {
                    newUpdate = {
                        uid: uuid,
                        key: `checkOut-${Date.now()}`,
                        id: `checkOut-${Date.now()}`,
                        event:event,
                        parking_spot:parking_spot,
                        plate_number:plate_number,
                        description: `Plate Number: ${plate_number}, Time: ${formatTime(time)}`,
                        timestamp: formatTime(time)
                    };
                } else if (topic === topics.trespassing) {
                    newUpdate = {
                        uid: uuid,
                        key: `Tresspassing-${Date.now()}`,
                        id: `Tresspassing-${Date.now()}`,
                        event:event,
                        parking_spot:parking_spot,
                        plate_number:plate_number,
                        description: `Plate Number: ${plate_number}, Time: ${formatTime(time)}`,
                        timestamp: formatTime(time)
                    };
                }

                // Save the message to IndexedDB
                saveMessageToDB(newUpdate)
                    .then(() => {
                        // Once saved to IndexedDB, update the state
                        setUpdates((prevUpdates) => [newUpdate, ...prevUpdates]);
                        //  console.log(updates);

                    })
                    .catch((error) => {
                        console.error("Error saving message to IndexedDB:", error);
                    });
            } catch (error) {
                console.error("Error parsing MQTT message:", error);
            }
        });

        return () => {
            client.end();
        };
    }, []);

    const [activeTab, setActiveTab] = useState('map');

    const handleTabChange = (tab) => {
        startTransition(() => {
            setActiveTab(tab);
        });
    };

    const getLeftSidebarContent = () => {
        return <LeftSidebarContentMap isSidebarVisible={[isUpdateSectionVisible, objectSectionVisible]} update={updates.length > 0 ? [updates[0]] : []} />;
    };

    const getRightSidebarContent = () => {
        switch (activeTab) {
            case 'map':
                return <RightSidebarContentMap />;
            case 'analytics':
                return <RightSidebarContentAnalytics />;
            case 'graph':
                return <RightSidebarContentGraph />;
            case 'records':
                return <RightSidebarContentRecords />;
            case 'staff':
                return <RightSidebarContentStaff />;
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <>
            <div className="container-fluid mainpage-container">
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#120A54' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" style={{ color: 'white' }} href="#">i-Park</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse btn" id="navbarNavAltMarkup">
                            <div className="navbar-nav" style={{ flex: 1, justifyContent: 'space-around' }}>
                                {['map', 'analytics', 'graph', 'staff', 'records', 'settings'].map(tab => (<div>

                                    <label className={`nav-link custom-btn ${activeTab === tab ? 'active' : ''}`}>
                                        <input
                                            key={tab}
                                            type="radio"
                                            name="piku"

                                            onChange={() => handleTabChange(tab)}
                                        />
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}</label>
                                </div>
                                ))}
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
                        {activeTab === 'map' && <Suspense fallback={<div>Loading...</div>}>
                            <MapHolder update={updates.length > 0 ? [updates[0]] : []} />
                        </Suspense>}
                        {activeTab === 'analytics' && <Suspense fallback={<div>Loading...</div>}>
                            <AnalyticSection />
                        </Suspense>}
                        {activeTab === 'graph' && <Suspense fallback={<div>Loading...</div>}>
                            <GraphSection />
                        </Suspense>}
                        {activeTab === 'staff' && <Suspense fallback={<div>Loading...</div>}>
                            <OperatorSection />
                        </Suspense>}
                        {activeTab === 'records' && <Suspense fallback={<div>Loading...</div>}>
                            <RecordSection />
                        </Suspense>}
                        {activeTab === 'settings' && <Suspense fallback={<div>Loading...</div>}>
                            <SettingSection />
                        </Suspense>}
                    </div>

                    <div className="container object-section" style={{ display: objectSectionVisible ? 'flex' : 'none' }}>
                        <div className="mini-map-container">
                            <div className="mini-map">
                                <img
                                    src="/src/maps/map1.svg"
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
