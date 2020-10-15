import React from "react";
import { ChatAreaFunction } from "./ChatAreaSection.js";
import {
  scrollHandler,
  contactsClickHandler,
  genrateContacts,
  genrateMessages,
  onSend
} from "./Functions.js";
export class ChatAreaComponent extends React.Component {
  scroll = 0;
  isSmall = true;
  scrollStart = 0;
  direction = true;
  contacts = genrateContacts(10);
  messages = genrateMessages(20, this.contacts);
  constructor(props) {
    super(props);
    this.isSmall = this.props.isSmall;
    this.messagesScroll = React.createRef();
    this.elementBottom = React.createRef();
    this.sendMessageButton = React.createRef();
    this.sendMessageField = React.createRef();
    this.inputBarHasListeners = false;
    this.state = {
      contactsHeight: 60,
      messages: this.messages[0].messages,
      conversation: 0
    };
    this.scrollHandler = scrollHandler.bind(this);
    this.contactsClickHandler = contactsClickHandler.bind(this);
    this.onSend = onSend.bind(this);
  }
  componentDidMount() {
    this.setState({ contactsHeight: 60 });
    this.scrollHandler();
    this.contactsClickHandler();
    this.onSend();
  }
  componentDidUpdate() {
    if (this.isSmall !== this.props.isSmall) {
      this.isSmall = this.props.isSmall;
      this.setState({ contactsHeight: 60 });
      this.contactsClickHandler();
    }
  }
  render() {
    return (
      <ChatAreaFunction
        ref={this.chatArea}
        isSmall={this.props.isSmall}
        messagesScroll={this.messagesScroll}
        contactHeight={this.state.contactsHeight}
        contacts={this.contacts}
        messages={this.state.messages}
        elementBottom={this.elementBottom}
        sendMessageButton={this.sendMessageButton}
        sendMessageField={this.sendMessageField}
      />
    );
  }
}
