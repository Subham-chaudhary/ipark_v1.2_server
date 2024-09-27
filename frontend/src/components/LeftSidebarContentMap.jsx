import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import './LeftSidebarContentMap.css';
import { saveMessageToDB, getMessagesFromDB } from './Tabs/indexedDb';

const LeftSidebarContentMap = ({ isSidebarVisible,update}) => {
    const [updates, setUpdates] = useState([]);
    const [visibleUpdatesCount, setVisibleUpdatesCount] = useState(15);
    const [activePopoverId, setActivePopoverId] = useState(null);


    useEffect(() => {
        const loadMessagesFromDB = async () => {
            const savedMessages = await getMessagesFromDB();
            setUpdates(savedMessages.reverse()); // Reverse to show the latest message on top
        };
        // console.log(update);
        
        loadMessagesFromDB();
    }, []);


    useEffect(() => {
          if (update && update.length > 0) {
            const newUpdates = update.map(({ key, id, title, description, timestamp }) => ({
                key,
                id,
                title,
                description,
                timestamp,
            }));

            setUpdates((prevUpdates) => [...newUpdates, ...prevUpdates]); // Prepend new updates to the list
        }
    }, [update]);

    const loadMoreUpdates = () => {
        setVisibleUpdatesCount(prevCount => Math.min(prevCount + 5, updates.length));
    };


    // Trigger a resize event when the sidebar visibility changes to update the popovers
    useEffect(() => {
        // console.log(isSidebarVisible);

        if (isSidebarVisible) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    }, [isSidebarVisible]);

    useEffect(() => {
        if (!isSidebarVisible[0]) {
            setActivePopoverId(null);
        }
        // console.log(objectSectionVisible);

    }, [isSidebarVisible]);

    const handlePopoverToggle = (id) => {
        setActivePopoverId((prevId) => (prevId === id ? null : id));
    };

    return (
        <>
            <h2>Upcoming Updates</h2>
            {updates.slice(0, visibleUpdatesCount).map(update => (
                <OverlayTrigger
                    key={update.id}
                    trigger="click"
                    placement='auto'
                    show={activePopoverId === update.id} 
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
