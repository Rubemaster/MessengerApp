import React from "react";
import { createUseStyles } from "react-jss";
const ChatAreaStyling = createUseStyles({
  break: {
    flexBasis: "100%",
    height: 0,
    backgroundColor: "white"
  }
});
const ContactsStyling = createUseStyles({
  container: {
    flexBasis: ({ theme }) => (theme.isSmall ? theme.height : 200),
    height: ({ theme }) => (theme.isSmall ? null : "100%"),
    width: ({ theme }) => (theme.isSmall ? "100%": null),
    backgroundColor: "green",
    overflow: "scroll"
  },
  containerBlue:{
    composes: '$container',
    flexBasis: ({ theme }) => (theme.isSmall ? theme.height : 200),
    width: ({ theme }) => (theme.isSmall ? "100%": null),
    backgroundColor: "blue",
    overflow: "scroll"
  }
});
const MessagesStyling = createUseStyles({
  container: {
    flexGrow: 1,
    flexBasis: 1,
    height: ({ theme }) => (theme.isSmall ? null : "100%"),
    backgroundColor: "purple"
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
    height: "100%",
    width: "100%",
    overflow: "scroll",
    paddingBottom: ({ theme }) => (theme.isSmall ? 0 : 0)
  }
});
function Contacts(props) {
  const theme = { isSmall: props.isSmall, height: props.isSmall?props.height:false };
  const classes = ContactsStyling({ theme });
  
  return (
    <div className={classes.container}>
      _{[...Array(200)].map((x) => (props.isSmall ? "_" : <br />))}
      hey
    </div>
  );
}
function Messages(props) {
  const theme = {
    isSmall: props.isSmall
  };
  const classes = MessagesStyling({ theme });
  return (
    <div className={classes.container}>
      <div className={classes.lockSize}>
        <div ref={props.scrollAreaRef} className={classes.scrollSection}>
          _
          {[...Array(1000)].map((x) => (
            <br />
          ))}
          hey
        </div>
      </div>
    </div>
  );
}
export function ChatArea(props) {
  const theme = {
    isSmall: props.isSmall
  };
  const classes = ChatAreaStyling({ theme });
  return (
    <>
      {props.isSmall ? null : (
        <Contacts isSmall={props.isSmall} style={classes.contacts}/>
      )}

      <Messages isSmall={props.isSmall} style={classes.messages} scrollAreaRef={props.messagesScroll} />
      {props.isSmall ? (
        <Contacts isSmall={props.isSmall} height={props.contactHeight} style={classes.contacts}/>
      ) : null}
    </>
  );
}
export class ChatAreaComponent extends React.Component {
  scroll=0;
  isSmall=true;
  scrollStart=0;
  direction= true;
  constructor(props) {
    super(props);
    this.isSmall=this.props.isSmall;
    this.messagesScroll = React.createRef();
    this.state = {contactsHeight: 60};
  }
  contactScroll(){
    console.log("Is scrolling");
  }
  componentDidMount(){
    this.setState({
      contactsHeight:60});
    const messagesScroll=this.messagesScroll.current;
    messagesScroll.addEventListener("scroll",(e)=>{
      const scrollChange=this.scroll>messagesScroll.scrollTop;
      if(scrollChange!==this.direction){
        this.scrollStart=messagesScroll.scrollTop;
        
      }
      let distance=Math.sqrt(Math.pow((messagesScroll.scrollTop-this.scroll)/10,2));
      const h=this.state.contactsHeight
      if(scrollChange&&h>=10)
        this.setState({
          contactsHeight: h - distance < 10? 10 : h - distance })
      if(!scrollChange&h<=60)
        this.setState({
          contactsHeight: h + distance > 60 ? 60 : h + distance })
      this.scroll = messagesScroll.scrollTop;
      this.direction =scrollChange;});
  }
  componentWillUpdate(){
    if(this.isSmall!==this.props.isSmall){
      this.isSmall=this.props.isSmall;
      this.setState({contactsHeight: 60})
    }
  }
  render() {
      return ( <ChatArea ref={this.chatArea} isSmall={this.props.isSmall} messagesScroll={this.messagesScroll} contactHeight={this.state.contactsHeight}/>
      );
  }
}