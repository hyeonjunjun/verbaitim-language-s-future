const WaveformLogo = ({ size = 28 }: { size?: number }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
        >
            {/* Elegant organic shape combining a soundwave and a leaf/drop of water */}
            <path
                d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
                fill="currentColor"
                opacity="0.15"
            />
            {/* Central dynamic waves */}
            <path
                d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V12Z"
                fill="currentColor"
            />
            <path
                d="M15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9V23C17 23.5523 16.5523 24 16 24C15.4477 24 15 23.5523 15 23V9Z"
                fill="currentColor"
            />
            <path
                d="M19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13V19C21 19.5523 20.5523 20 20 20C19.4477 20 19 19.5523 19 19V13Z"
                fill="currentColor"
            />
            {/* Organic accent leaf/drop wrapping the bottom */}
            <path
                d="M23 16C23 19.866 19.866 23 16 23C12.134 23 9 19.866 9 16C9 14.4984 9.47355 13.1075 10.2783 11.9682C10.7495 12.3551 11.3486 12.5833 12 12.5833C12.8795 12.5833 13.6279 12.0163 13.9167 11.2312C14.072 11.192 14.2332 11.1714 14.4 11.1714C14.9398 11.1714 15.4377 11.3537 15.8333 11.6599V21C15.8333 21.092 15.8304 21.1834 15.8247 21.2736C18.6657 20.8986 21.8333 18.5273 21.8333 16H23Z"
                fill="currentColor"
                opacity="0.3"
            />
        </svg>
    );
};

export default WaveformLogo;

