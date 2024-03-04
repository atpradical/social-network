import React from 'react';
import isLoading from "../../assets/preLoader.svg";

export const Preloader:React.FC = () => {
    return (
        <div>
            <img src={isLoading} alt="loader" style={{width: "100px", height: "100px"}}/>
        </div>
    );
};