import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Chip from "@mui/joy/Chip";

function countedEvents(events) {
  console.log(events, events);
  const _events = {};
  events.forEach((event) => {
    const eventLabel = event.label;
    _events[eventLabel] = _events[eventLabel] ? (_events[eventLabel] += 1) : 1;
  });
  const highEvents = [];
  const lowEvents = [];

  for (const event in _events) {
    if (_events[event] > 1) {
      highEvents.push(event);
    } else {
      lowEvents.push(event);
    }
  }

  return { highEvents, lowEvents };
}

function ArticleModal({ isOpen, data, close }) {
  const bodyArray = data.body.map((el) => el.tokens);
  const completeBody = bodyArray.flat(1);

  const { highEvents, lowEvents } = countedEvents(data.events);

  return (
    <div className="ArticleModal">
      <Modal
        sx={{
          display: "flex",
          flexDirection: "center",
          alignItems: "center",
        }}
        open={isOpen}
        onClose={close}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: "70%",
            maxHeight: "80%",
            overflow: "auto",
            borderRadius: "md",
            p: 5,
            boxShadow: "lg",
            margin: "0 auto",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} onClick={close} />
          <Typography
            component="h1"
            id="modal-title"
            level="h1"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {data.title.tokens.join(" ")}
          </Typography>
          <Typography
            component="h6"
            level="h4"
            textColor="inherit"
            // fontWeight="lg"
            mb={1}
            mt={3}
          >
            Events:
          </Typography>
          {data.events &&
            highEvents.map((event) => (
              <Chip
                sx={{ mr: 2, mb: 1 }}
                variant="soft"
                size="sm"
                color="danger"
              >
                <small>{event}</small>
              </Chip>
            ))}
          {data.events &&
            lowEvents.map((event) => (
              <Chip
                sx={{ mr: 2, mb: 1 }}
                variant="soft"
                size="sm"
                color="neutral"
              >
                <small>{event}</small>
              </Chip>
            ))}
          {/* <Typography
            component="h6"
            level="h4"
            textColor="inherit"
            // fontWeight="lg"
            mb={1}
          >
            Roles:
          </Typography>
          {data.roles &&
            data.roles.map((role) => (
              <Chip
                sx={{ mr: 2, mb: 1, textWrap: "wrap" }}
                variant="soft"
                size="sm"
                color="primary"
              >
                <small>{role.label}: </small> {role.value.join(" ")}
              </Chip>
            ))} */}
          <Typography sx={{ mt: 4 }} id="modal-desc" textColor="text.tertiary">
            {completeBody.join(" ")}
          </Typography>
        </Sheet>
      </Modal>
    </div>
  );
}

export default ArticleModal;
