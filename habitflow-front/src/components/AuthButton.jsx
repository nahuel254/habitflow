import React from 'react';

const AuthButton = ({ text, onClick, className, children }) => {
    return (
        <button className={className} onClick={onClick}>
            {children ? children : text}
        </button>
    );
};

export default AuthButton;