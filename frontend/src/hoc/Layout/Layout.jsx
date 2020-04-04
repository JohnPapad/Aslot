import React, { useState } from 'react';

import NavBar from '../../containers/Navigation/NavBar/NavBar';
import SignInModal from '../../containers/auth/SignInModal/SignInModal';


export default function Layout(props) {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    return (
        <>
            <NavBar isSignInModalOpen={isSignInModalOpen} toggleSignInModalOpen={() => setIsSignInModalOpen(!isSignInModalOpen)}/>
            {props.children}
            {/* Sign In Modal */}
            <SignInModal isSignInModalOpen={isSignInModalOpen} toggleSignInModalOpen={() => setIsSignInModalOpen(!isSignInModalOpen)}/>
        </>
    );
}