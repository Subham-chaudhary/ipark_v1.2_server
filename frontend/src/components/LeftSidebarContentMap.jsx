import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import mqtt from 'mqtt';
import './LeftSidebarContentMap.css';
import { saveMessageToDB, getMessagesFromDB } from './Tabs/indexedDb';

const LeftSidebarContentMap = ({ isSidebarVisible }) => {
    const [updates, setUpdates] = useState([]);
    const [visibleUpdatesCount, setVisibleUpdatesCount] = useState(15);
    const [activePopoverId, setActivePopoverId] = useState(null);


    // Load messages from IndexedDB when the component mounts
    useEffect(() => {
        const loadMessagesFromDB = async () => {
            const savedMessages = await getMessagesFromDB();
            setUpdates(savedMessages.reverse()); // Reverse to show the latest message on top
        };

        loadMessagesFromDB();
    }, []);

    const host = "192.168.250.229";
const port = "8000";
const topic = "parkingLot/v1";

    // Handle MQTT connection and message reception
    useEffect(() => {
        const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);

        const url = `ws://${host}:${port}`;
        const options = { clientId };

        // Connect to the MQTT broker
        const client = mqtt.connect(url, options);

        // On successful connection, subscribe to the topic
        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${topic}`);
                } else {
                    console.error('Subscription error:', err);
                }
            });
        });

        // Handle incoming MQTT messages
        client.on('message', (topic, message) => {
            try {
                const jsonMessage = JSON.parse(message.toString());
                const { title, description } = jsonMessage;

                const newUpdate = {
                    key: `${title}-${Date.now()}`,
                    id: `${title}-${Date.now()}`,
                    title: `Update x` || title,
                    description: description || "No description available",
                    timestamp: new Date().toLocaleTimeString() 
                };

                // Save the message to IndexedDB
                saveMessageToDB(newUpdate)
                    .then(() => {
                        // Once saved to IndexedDB, update the state
                        setUpdates((prevUpdates) => [newUpdate, ...prevUpdates]);
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

    const loadMoreUpdates = () => {
        setVisibleUpdatesCount(prevCount => Math.min(prevCount + 5, updates.length));
    };
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
