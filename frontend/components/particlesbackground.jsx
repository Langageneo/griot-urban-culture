import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
          size: { value: 3 },
          opacity: { value: 0.5 }
        }
      }}
    />
  );
};

export default ParticlesBackground;
