const WaveformLogo = ({ size = 28 }: { size?: number }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
        >
            {/* Open book base */}
            <path
                d="M8 48V18C8 18 14 14 32 14C50 14 56 18 56 18V48C56 48 50 44 32 44C14 44 8 48 8 48Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.06"
            />
            {/* Book spine */}
            <path
                d="M32 14V44"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Left page lines */}
            <path
                d="M14 24H28M14 29H26M14 34H24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
            />
            {/* Right page — speech / quotation mark */}
            <path
                d="M40 24C40 24 42 22 44 22C46 22 47 23.5 47 25C47 27 44 29 40 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            <circle cx="40" cy="31" r="1" fill="currentColor" />
            {/* Sound waves emanating upward (organic) */}
            <path
                d="M22 14C22 14 24 8 28 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.6"
            />
            <path
                d="M32 14C32 14 32 7 32 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.7"
            />
            <path
                d="M42 14C42 14 40 8 36 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.6"
            />
            {/* Organic flourish wisps */}
            <path
                d="M26 8C24 5 20 4 18 6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.35"
            />
            <path
                d="M38 8C40 5 44 4 46 6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.35"
            />
        </svg>
    );
};

export default WaveformLogo;
