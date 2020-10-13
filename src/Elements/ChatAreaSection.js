import React from "react";
import { createUseStyles } from "react-jss";
import { Contacts } from "./Contacts.js";
import { Messages } from "./Messages.js";
const ChatAreaStyling = createUseStyles({
  break: {
    flexBasis: "100%",
    height: 0,
    backgroundColor: "white"
  }
});
export function ChatAreaFunction(props) {
  const theme = {
    isSmall: props.isSmall
  };
  const classes = ChatAreaStyling({ theme });
  return (
    <>
      {props.isSmall ? null : (
        <Contacts isSmall={props.isSmall} contacts={props.contacts} />
      )}

      <Messages
        isSmall={props.isSmall}
        style={classes.messages}
        scrollAreaRef={props.messagesScroll}
        messages={props.messages}
      />
      {props.isSmall ? (
        <Contacts
          isSmall={props.isSmall}
          height={props.contactHeight}
          contacts={props.contacts}
        />
      ) : null}
    </>
  );
}
