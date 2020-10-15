import React from "react";
export function scrollHandler() {
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
}
export function contactsClickHandler() {
  this.contacts.forEach((contact) =>
    contact.ref.current.addEventListener("click", () => {
      this.setState({
        conversation: contact.id,
        messages: this.messages[contact.id].messages
      });
      this.elementBottom.current.scrollIntoView();
      this.onSend();
    })
  );
}
export const genrateContacts = (n) =>
  [...Array(n)].map((_, y) =>
    Object.create({
      id: y,
      ref: React.createRef()
    })
  );
export const genrateMessages = (n, contacts) =>
  contacts.map((contact) =>
    Object.create({
      conversationID: contact.id,
      messages: [...Array(n)].map((_, y) =>
        Object.create({
          message: "Con: " + contact.id + " Mess: " + y,
          sent: Math.round(y / 2) === y / 2 ? true : false
        })
      )
    })
  );
function targetOnClick() {
  const inputField = this.sendMessageField.current;
  if (inputField.value && inputField.value !== "") {
    this.messages[this.state.conversation].messages.push({
      message: inputField.value,
      sent: true
    });
    this.setState({
      messages: this.messages[this.state.conversation].messages
    });
    this.elementBottom.current.scrollIntoView();
  }
  const allMessages = this.messages[this.state.conversation].messages;
  const lastMessage = allMessages[allMessages.length - 1];
  console.log(
    lastMessage.message + " | " + (lastMessage.sent ? "Sent" : "Received")
  );
  console.log(this.sendMessageField.current.value);
}
function clearNode(ref) {
  const primaryNode = ref.current;
  const replacementNode = primaryNode.cloneNode(true);
  console.log(primaryNode.parentNode);
  primaryNode.parentNode.replaceChild(replacementNode, primaryNode);
  return replacementNode;
}
export function onSend() {
  this.targetOnClick = targetOnClick.bind(this);
  this.sendMessageButton.current = clearNode(this.sendMessageButton);
  this.sendMessageField.current = clearNode(this.sendMessageField);
  this.sendMessageButton.current.addEventListener("click", this.targetOnClick);
  this.sendMessageField.current.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.targetOnClick();
    }
  });
  this.inputBarHasListeners = true;
}
