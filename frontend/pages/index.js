import Logo from '../components/Logo/Logo';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Home() {
  return (
    <div>
      <ParticlesBackground />
      <Logo animated={true} />
      <h1>Griot Urban Culture</h1>
    </div>
  );
}
