import "./Home.css";
import Hero from "./Hero";
import "react-datepicker/dist/react-datepicker.css";
import Form from "./Form";
import { useRecoilState } from "recoil";
import { dataAtom } from "../store/atoms/dataAtom";
import Charts from "./Charts";
import Timeline from "./Timeline";
import { Container, Button, Link } from "react-floating-action-button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SearchIcon from "@mui/icons-material/Search";

function Home() {
  const [data] = useRecoilState(dataAtom);

  return (
    <div className="Home">
      <div className="HeroContainer">
        <Hero />
      </div>
      <div id="form" className="FormContainer">
        <Form />
      </div>
      {data && (
        <div className="ChartsContainer">
          <Charts data={data} />
        </div>
      )}
      {data && (
        <div id="timeline" className="TimelineContainer">
          <Timeline data={data} />
        </div>
      )}
      {data && (
        <Container className="FloatingButtonContainer">
          <Link
            href="#form"
            tooltip="Go to search"
            icon="far fa-sticky-note"
            className="FloatingButton"
          >
            <SearchIcon />
          </Link>
          <Link
            href="#timeline"
            tooltip="Go to Timeline"
            className="FloatingButton"
          >
            <EventNoteIcon />
          </Link>
          <Button rotate={true} className="FloatingButton">
            <AutoAwesomeIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
        </Container>
      )}
    </div>
  );
}

export default Home;
