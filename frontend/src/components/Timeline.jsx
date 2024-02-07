import { useState } from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Chip from "@mui/joy/Chip";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import "./Timeline.css";
import HorizontalTimeline from "./HorizontalTimeline";
import ArticleModal from "./ArticleModal";

function Timeline({ data }) {
  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <div className="Timeline">
      <h1>
        And a <strong>timeline</strong>, please choose a topic
      </h1>
      <div className="ButtonsContainer">
        <div className="LargeLayout">
          <ButtonGroup
            // orientation={window.innerWidth > 700 ? "vertical" : "horizontal"}
            sx={{ mt: 7 }}
            color="primary"
            variant="soft"
            size="lg"
          >
            {data.unit.map((el) => (
              <Button
                variant="soft"
                key={el.event}
                onClick={() => setEvent(el.results)}
              >
                {el.event}
              </Button>
            ))}
            <Button variant="soft" onClick={() => setEvent(data.group.results)}>
              ALL
            </Button>
          </ButtonGroup>
        </div>
        <div className="SmallLayout">
          {data.unit.map((el) => (
            <Button
              sx={{ mt: 2, mr: 2 }}
              variant="soft"
              key={el.event}
              onClick={() => setEvent(el.results)}
            >
              {el.event}
            </Button>
          ))}
          <Button
            sx={{ mt: 2 }}
            variant="soft"
            onClick={() => setEvent(data.group.results)}
          >
            ALL
          </Button>
        </div>
      </div>
      {event && (
        <>
          <HorizontalTimeline data={event} />
          <VerticalTimeline>
            {event.map((e, i) => {
              const chips = [];

              e.roles.forEach((role) => {
                if (role.location === "title") {
                  chips.push({
                    name: role.label,
                    values: role.value,
                  });
                }
              });

              const eventsChips = [];

              e.events.forEach((event) => {
                if (event.location === "title") {
                  eventsChips.push({
                    name: event.label,
                  });
                }
              });

              return (
                <VerticalTimelineElement
                  key={e.date + i}
                  className="vertical-timeline-element--work"
                  dateClassName="TimelineDate"
                  date={new Date(e.date).toLocaleDateString()}
                  iconStyle={{
                    background: "white",
                    color: "black",
                  }}
                  icon={<NewspaperIcon />}
                  id={new Date(e.date).toLocaleDateString()}
                >
                  <div className="ChipsContainer">
                    {eventsChips &&
                      eventsChips.map((eChip) => (
                        <Chip
                          sx={{ mr: 2, mb: 1 }}
                          variant="soft"
                          size="sm"
                          color="danger"
                          key={eChip.name}
                        >
                          <small>{eChip.name}</small>
                        </Chip>
                      ))}
                  </div>
                  <span>{e.title.tokens.join(" ")}</span>
                  <div className="ChipsContainer">
                    {chips &&
                      chips.map((chip) => (
                        <Chip
                          sx={{ mr: 2, mb: 1, textWrap: "wrap" }}
                          variant="soft"
                          size="sm"
                          color="primary"
                          key={chip.name}
                        >
                          <small>
                            {chip.name}: {chip.values.join(" ")}
                          </small>
                        </Chip>
                      ))}
                  </div>
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalData(e);
                    }}
                  >
                    Open article
                  </Button>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
          {modalData && (
            <ArticleModal
              isOpen={isModalOpen}
              data={modalData}
              close={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Timeline;
