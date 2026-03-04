const WaveformLogo = ({ size = 28 }: { size?: number }) => {
    return (
        <img
            src="/logo.png"
            alt="VerbAItim logo"
            width={size}
            height={size}
            className="object-contain"
            style={{ width: size, height: size }}
        />
    );
};

export default WaveformLogo;
