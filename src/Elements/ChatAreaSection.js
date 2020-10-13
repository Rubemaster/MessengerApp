import React from "react";
import { Contacts } from "./Contacts.js";
import { Messages } from "./Messages.js";
export function ChatAreaFunction(props) {
  return (
    <>
      {props.isSmall ? null : (
        <Contacts isSmall={props.isSmall} contacts={props.contacts} />
      )}

      <Messages
        isSmall={props.isSmall}
        scrollAreaRef={props.messagesScroll}
        messages={props.messages}
        elementBottom={props.elementBottom}
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
