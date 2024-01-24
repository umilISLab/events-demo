import "./Hero.css";
import Sphere from "./Sphere";
import { Canvas } from "@react-three/fiber";

function Hero() {
  return (
    <div className="Hero">
      {/* <Canvas
        style={{ position: "absolute", width: "540px" }}
        className="Sphere"
      >
        <Sphere />
      </Canvas> */}
      <div className="LogoContainer">
        <img className="Logo" src="/logo.png"></img>
        <img src="/logo_unimi.png" alt="" className="LogoUnimi" />
      </div>
      <h1>
        Explore 1948, <br /> like never <strong>before</strong>
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci
        nisi, iaculis non eros a, tempus maximus elit. Phasellus vitae tristique
        lectus. Phasellus dignissim sit amet tellus a semper. Pellentesque
        congue nec ipsum sit amet accumsan. Nam enim massa, malesuada eget
        imperdiet at, tristique ut augue. Mauris convallis eget ligula ut
        pulvinar. Aenean elementum ultrices vehicula. Vivamus lobortis consequat
        nibh, sit amet tempor velit tempor id. Cras ligula tortor, tristique
        vitae mi sed, convallis porta nibh. Pellentesque id tincidunt leo, vitae
        dapibus turpis. Integer vitae malesuada odio. Donec vel bibendum tortor.
        Curabitur sed aliquam augue. Nam suscipit convallis pharetra. Aenean
        vitae congue libero. Donec eu massa interdum mauris bibendum tristique.
        Duis pretium, orci eget hendrerit consectetur, ligula tortor placerat
        lacus, quis mollis nisi lectus sed mi.
      </p>
      {/* <img className="Statue" src="/statue_1.webp"></img> */}
    </div>
  );
}

export default Hero;
