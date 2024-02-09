import ArrowDown from "./ArrowDown";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero">
      <div className="Overlay"></div>
      <div className="ContentContainer">
        <div className="LogoContainer">
          {/* <img className="Logo" src="/logo.png"></img> */}
          <img className="LogoFBK" src="/logo_fbk.png"></img>
          <img src="/logo_unimi.png" alt="" className="LogoUnimi" />
          <img className="LogoRCS" src="/logo_rcs.png"></img>
        </div>
        <h1>
          Explore 1948, <br /> like never <strong>before</strong>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci
          nisi, iaculis non eros a, tempus maximus elit. Phasellus vitae
          tristique lectus. Phasellus dignissim sit amet tellus a semper.
          Pellentesque congue nec ipsum sit amet accumsan. Nam enim massa,
          malesuada eget imperdiet at, tristique ut augue. Mauris convallis eget
          ligula ut pulvinar. Aenean elementum ultrices vehicula. Vivamus
          lobortis consequat nibh, sit amet tempor velit tempor id. Cras ligula
          tortor, tristique vitae mi sed, convallis porta nibh. Pellentesque id
          tincidunt leo, vitae dapibus turpis. Integer vitae malesuada odio.
          Donec vel bibendum tortor. Curabitur sed aliquam augue.
        </p>
        <ArrowDown />
      </div>
    </div>
  );
}

export default Hero;
