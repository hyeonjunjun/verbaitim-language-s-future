const WaveformLogo = ({ size = 24 }: { size?: number }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-signal"
        >
            {/* Rounded square container */}
            <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="5"
                ry="5"
                fill="currentColor"
                opacity="0.12"
            />
            {/* Speech waveform bars */}
            <rect x="5" y="9" width="2" height="6" rx="1" fill="currentColor" />
            <rect x="8.5" y="6" width="2" height="12" rx="1" fill="currentColor" />
            <rect x="12" y="4" width="2" height="16" rx="1" fill="currentColor" />
            <rect x="15.5" y="7" width="2" height="10" rx="1" fill="currentColor" />
            <rect x="19" y="9.5" width="2" height="5" rx="1" fill="currentColor" />
        </svg>
    );
};

export default WaveformLogo;
