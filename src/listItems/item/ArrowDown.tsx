import React from 'react';

interface ArrowDownProps {
    fill: string;
    className: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({ fill, className }) => {
    return (
        <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.6569 5.65685L7 11.3137L1.34315 5.65685"
                stroke={fill}
            />
        </svg>
    );
};

export default ArrowDown;
