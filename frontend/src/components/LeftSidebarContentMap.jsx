import React, { useState, useEffect} from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import './LeftSidebarContentMap.css';

const LeftSidebarContentMap = ({ isSidebarVisible}) => {
    const [updates, setUpdates] = useState([
        {
            id: 1,
            title: `Update 1`,
            description: `This is the description for update 1.`,
            timestamp: new Date().toLocaleTimeString(),
        },
        {
            id: 2,
            title: `Update 2`,
            description: `This is the description for update 2.`,
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    const [visibleUpdatesCount, setVisibleUpdatesCount] = useState(5);
    const [activePopoverId, setActivePopoverId] = useState(null); // Track which popover is open


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const newUpdate = {
    //             id: updates.length + 1,
    //             title: `Update ${updates.length + 1}`,
    //             description: `This is the description for update ${updates.length + 1}.`,
    //             timestamp: new Date().toLocaleTimeString()
    //         };
    //         setUpdates(prevUpdates => {
    //             const updatedUpdates = [newUpdate, ...prevUpdates];
    //             return updatedUpdates;
    //         });
    //     }, 1000); 
    //     // Add a new update every 3 seconds

    //     return () => clearInterval(intervalId);
    // }, [updates]);

    // const loadMoreUpdates = () => {
    //     setVisibleUpdatesCount(prevCount => Math.min(prevCount + 5, updates.length));
    // };


     // Trigger a resize event when the sidebar visibility changes to update the popovers
     useEffect(() => {
        console.log(isSidebarVisible);
        
        if (isSidebarVisible) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize')); // Dispatch resize event
            }, 100); // Add a slight delay to allow sidebar animation to finish
        }
    }, [isSidebarVisible]);

    // Close all popovers when the sidebar is hidden
    useEffect(() => {
        if (!isSidebarVisible[0]) {
            setActivePopoverId(null); // Close all popovers
        }
        // console.log(objectSectionVisible);
        
    }, [isSidebarVisible]);

    const handlePopoverToggle = (id) => {
        setActivePopoverId((prevId) => (prevId === id ? null : id)); // Toggle the popover
    };

    return (
        <>
            <h2>Upcoming Updates</h2>
            {updates.slice(0, visibleUpdatesCount).map(update => (
                <OverlayTrigger
                    key={update.id}
                    trigger="click"
                    placement='auto'
                    show={activePopoverId === update.id} // Only show if it's the active popover
                    onToggle={() => handlePopoverToggle(update.id)}
                    overlay={
                        <Popover id={`popover-${update.id}`}>
                            <Popover.Header as="h3">{update.title}</Popover.Header>
                            <Popover.Body>{update.description}</Popover.Body>
                        </Popover>
                    }
                >
                    <div className="card w-100 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{update.title}</h5>
                            <p className="card-text">{update.description}</p>
                            <p className="card-text"><small className="text-muted">{update.timestamp}</small></p>
                        </div>
                    </div>
                </OverlayTrigger>
            ))}
            {visibleUpdatesCount < updates.length && (
                <button className="btn btn-primary" onClick={loadMoreUpdates}>Load More</button>
            )}
        </>
    );
};

export default LeftSidebarContentMap;
