export default function HaloEffect() {
  return (
    <div className="halo-container">
      <style jsx>{`
        .halo-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          background: radial-gradient(circle at center, rgba(0, 150, 255, 0.3) 0%, transparent 70%);
        }
        .halo-container::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(0, 150, 255, 0.5), rgba(255, 200, 0, 0.5));
          z-index: -2;
          filter: blur(20px);
          animation: pulse 3s infinite alternate;
        }
        @keyframes pulse {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
