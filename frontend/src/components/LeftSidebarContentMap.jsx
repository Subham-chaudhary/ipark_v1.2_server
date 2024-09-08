import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './LeftSidebarContentMap.css';

const LeftSidebarContentMap = () => {
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
        }, 3000); // Add a new update every 3 seconds

        return () => clearInterval(intervalId);
    }, [updates]);

    const loadMoreUpdates = () => {
        setVisibleUpdatesCount(prevCount => Math.min(prevCount + 5, updates.length));
    };

    return (
        <>
            <h2>Upcoming Updates</h2>
            {updates.slice(0, visibleUpdatesCount).map(update => (
                <div
                    key={update.id}
                    className="card w-100 mb-3"
                >
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
        </>
    );
};

export default LeftSidebarContentMap;
