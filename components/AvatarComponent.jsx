import React, { useContext } from 'react';
import { UserContext } from '../src/contexts/UserContext';


function Avatar() {
    const { loggedInUser } = useContext(UserContext);

    if (loggedInUser) {
        // Get the first letter of the username
        const initials = loggedInUser.firstName.charAt(0).toUpperCase();
        return (
            <div className="avatar">
                {initials}
            </div>
        );
    }

    return null; // Render nothing if user is not logged in
}

export default Avatar;
