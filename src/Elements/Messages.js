import React from "react";
import { Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
const MessagesStyling = createUseStyles({
  container: {
    flexGrow: 1,
    flexBasis: 1,
    height: ({ theme }) => (theme.isSmall ? null : "100%")
  },
  lockSize: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  scrollSection: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 40,
    width: "100%",
    overflow: "scroll",
    display: "flex",
    direction: "row",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  messageContainer: {
    flexBasis: "100%",
    display: "flex"
  },

  message: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 35,
    padding: 4,
    backgroundColor: "#F4B41A"
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    display: "flex",
    backgroundColor: "#F4B41A"
  },
  inputArea: {
    flex: 1,
    margin: 5,
    zIndex: 2
  },
  customFormControl: {
    maxHeight: "100%",
    zIndex: 10
  }
});
export function Messages(props) {
  const theme = {
    isSmall: props.isSmall
  };

  const classes = MessagesStyling({ theme });
  const messages = props.messages;
  return (
    <div className={classes.container}>
      <div className={classes.lockSize}>
        <div ref={props.scrollAreaRef} className={classes.scrollSection}>
          {messages.map((currentMessage) => (
            <div
              className={classes.messageContainer}
              style={{
                justifyContent: currentMessage.sent ? "flex-start" : "flex-end"
              }}
            >
              <div
                className={classes.message}
                style={{
                  borderRadius: currentMessage.sent
                    ? "6px 6px 6px 0px"
                    : "6px 6px 0px 6px"
                }}
              >
                {currentMessage.message}
              </div>
            </div>
          ))}
          <div ref={props.elementBottom}></div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.inputArea}>
            <Form.Control
              className={classes.customFormControl}
              type="text"
              placeholder="message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
