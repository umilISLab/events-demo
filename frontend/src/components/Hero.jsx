import ArrowDown from "./ArrowDown";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero">
      <div className="ContentContainer">
        <h1>TimeFrame</h1>
        <h2>
          Exploring 1948, <br /> one <strong>event</strong> at a time
        </h2>
        <p>
          Exploring 1948, one event at a time TimeFrame allows to explore the
          whole textual 1948 edition of Corriere della Sera (10,418 newspaper
          articles) and to visualize on a timeline over 146,000 event mentions
          and their participants. TimeFrame makes it possible to build
          event-based queries at different granularity levels.
        </p>
        <ArrowDown />
      </div>
    </div>
  );
}

export default Hero;
