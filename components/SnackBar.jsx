import React, { useState } from 'react';
const Snackbar = ({ message, type }) => {

    const [visible, setVisible] = useState(false);

    React.useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div id="snackbar" className={`${type} ${visible ? 'show' : ''}`}>
            {message}
        </div>
    );
};

export default Snackbar;
