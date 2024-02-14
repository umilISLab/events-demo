import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import "./WelcomeForm.css";

function WelcomeForm({ setFormType }) {
  const { ref, inView } = useInView();

  const [showed, setShowed] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!showed && inView) {
      setShowed(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="WelcomeForm">
      {showed && (
        <TypeAnimation
          triggerOnce
          sequence={[
            "Welcome! \n What type of query do you want to create?",
            () => setShowButton(true),
          ]}
          wrapper="div"
          speed={45}
          style={{
            fontSize: "60px",
            display: "inline-block",
            color: "white",
            whiteSpace: "pre-line",
          }}
          delay={5000}
        />
      )}
      {showButton && (
        <div className="ButtonsContainer">
          <div onClick={() => setFormType("simple")} className="CustomButton">
            Easy
          </div>
          <div onClick={() => setFormType("advanced")} className="CustomButton">
            Advanced
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomeForm;
