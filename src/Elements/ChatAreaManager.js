import React from "react";
import { ChatAreaFunction } from "./ChatAreaSection.js";
export class ChatAreaComponent extends React.Component {
  scroll = 0;
  isSmall = true;
  scrollStart = 0;
  direction = true;
  tempMessages = [
    { message: "Hi", sent: true },
    { message: "Hello", sent: false },
    { message: "How are you?", sent: true },
    { message: "I'm fine, thanks! and you?", sent: false },
    { message: "I'm alright, nice to see you!", sent: true },
    { message: "See you later", sent: false },
    { message: "Bye bye", sent: true }
  ];

  contacts = [...Array(20)].map((_, y) =>
    Object.create({
      id: y,
      ref: React.createRef()
    })
  );
  messages = this.contacts.map((contact) =>
    Object.create({
      conversationID: contact.id,
      messages: [...Array(20)].map((_, y) =>
        Object.create({
          message: "Con: " + contact.id + " Mess: " + y,
          sent: Math.round(y / 2) === y / 2 ? true : false
        })
      )
    })
  );
  constructor(props) {
    super(props);
    this.isSmall = this.props.isSmall;
    this.messagesScroll = React.createRef();
    this.elementBottom = React.createRef();
    this.state = { contactsHeight: 60, messages: this.tempMessages };
  }
  contactScroll() {
    console.log("Is scrolling");
  }
  contactListenToClick() {
    this.contacts.forEach((contact) =>
      contact.ref.current.addEventListener("click", () => {
        console.log("Conversation: " + contact.id);
        this.setState({ messages: this.messages[contact.id].messages });
        this.elementBottom.current.scrollIntoView();
      })
    );
  }
  componentDidMount() {
    this.setState({
      contactsHeight: 60
    });
    const messagesScroll = this.messagesScroll.current;
    messagesScroll.addEventListener("scroll", (e) => {
      const scrollChange = this.scroll > messagesScroll.scrollTop;
      if (scrollChange !== this.direction) {
        this.scrollStart = messagesScroll.scrollTop;
      }
      let distance = Math.sqrt(
        Math.pow((messagesScroll.scrollTop - this.scroll) / 1, 2)
      );
      const h = this.state.contactsHeight;
      if (scrollChange && h >= 0)
        this.setState({
          contactsHeight: h - distance < 0 ? 0 : h - distance
        });
      if (!scrollChange & (h <= 60))
        this.setState({
          contactsHeight: h + distance > 60 ? 60 : h + distance
        });
      this.scroll = messagesScroll.scrollTop;
      this.direction = scrollChange;
    });
    this.contactListenToClick();
  }
  componentWillUpdate() {
    if (this.isSmall !== this.props.isSmall) {
      this.isSmall = this.props.isSmall;
      this.setState({ contactsHeight: 60 });
      this.contactListenToClick();
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
      />
    );
  }
}
