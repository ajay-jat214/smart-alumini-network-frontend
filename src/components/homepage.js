import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { connect } from "react-redux";
import { CHANGE_CHAT_SEARCH } from "./redux/constants";
import ChatList from "./chatlist";
import "./homepage.css";
import Typewriter from "typewriter-effect";
import { setChatSearch } from "./redux/actions";
import values from "./values";
import Messaging from "./messaging";
import Chat from "./chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { messageSearch,setImageArray } from "./redux/actions";
import io from "socket.io-client";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import Grid from "@material-ui/core/Grid";
import NotificationSound from "./iPhone - 1 Sec Message Sound.mp3";
let dataArray = [];
let socket;
let prof = "";
let userValuse1 = [];
let imageArray = [];
let photo = "";
let firstName = "";

var cardstyle = {
  display: "block",
  height: "470px",
};
var cardd = {
  background: "#C5C6D0",
};

var carddd = {
  boxShadow: `1px 2px 2px 2px #D3D3D3`,
};

const mapStateToProps = (state) => {
  const emailCredentials = state.emailDetails.emailCredentials;
  const email = state.searchChat.chatSearch.email;
  const userName = state.searchChat.chatSearch.userName;
  const userNameCredentials = state.userNameDetails.userNameCredentials;
  const imageArray = state.handleImageArray.imageArray;
  const x = { emailCredentials, userNameCredentials, email, userName,imageArray };
  return x;
};

const mapDispatchToProps = (dispatch) => {
  return { 
    search: (values) => dispatch(messageSearch(values)),
    handleImagesArray: (values) =>dispatch(setImageArray(values)),
   };
};

function HomePage(props) {
  const [chatSearch, setChatSearch] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [sentMessage, setSentMessage] = useState("");
  const [array, setArray] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [select, setSelect] = useState(-1);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [demo, setDemo] = useState("");
  const [value, setValue] = useState([]);
  const [mess, setMess] = useState([]);
  const [sessionMessages, setSessionMessages] = useState([]);
  const ENDPOINT = "http://localhost:3001/";
  const scrollToBottom = useScrollToBottom();
  
  const audioPlayer = React.useRef(null);

  function playAudio() {
    if(audioPlayer.current)
      audioPlayer.current.play();
  }

  useEffect(() => {
    socket = io(ENDPOINT);

    const email = props.email;
    const name = props.firstName;
    const userNameCredentials = props.userNameCredentials;

    socket.emit("join", { email: props.emailCredentials, name: name });

    // return()=>{
    //  socket.emit('disconnect');
    //  socket.off();
    // }
  }, [ENDPOINT, props]);

  useEffect(() => {
    fetch("http://localhost:3001/messaging", {
      method: "post",
      headers: { 
        Authentication: "Content-Type:application/json", 
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        emailCredentials: props.emailCredentials,
        email: props.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) 
            setMessageList(data[0].message);
      })
      .catch((err) => {
        setMessageList([]);
      });
  }, [ENDPOINT, props, props.email]);

  useEffect(() => {
    fetch("http://localhost:3001/getImage", {
      method: "get",
      headers: { 
        Authentication: "Content-Type:multipart/form-data", 
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data1) => {
        // for (let j = 0; j < data1.values.length; j++) {
        //   prof = data1.values[j].image;
        //   prof = prof.substring(15, prof.length);
        //   prof = "http://localhost:3001/uploads/" + prof;
        //   imageArray = [
        //     ...imageArray,
        //     { email: data1.values[j].email, photo: prof },
        //   ];
        // }
        props.handleImagesArray(data1.values);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // socket.on("message", (message) => {
    //   console.log("called message");
    //   setMessages([...messages, message]);
    // });
    
    socket.on("recieveMessage", ({ emailCredentials, email, message }) => {
      playAudio();
      // setDemo("dkflasdf");
      // setMess([...mess, { email: emailCredentials, message: message }]);
      if(props.emailCredentials===email){
        setArray([]);
        specialFunction1(email, emailCredentials, message);
        setMessages([...messages, { emailCredentials, message }]);
        setArray([...array,{email,emailCredentials,message}]);
      }
      // setFrom(emailCredentials);
      // setTo(email);
      // setSentMessage(message);
      // setSessionMessages([
      //   ...sessionMessages,
      //   { emailCredentials: emailCredentials, email: email, message: message },
      // ]);
      // props.search({ from: emailCredentials, message: message });
    });

    specialFunction1(props.email,props.emailCredentials, sentMessage);

    // if (sentMessage.length && props.email===to){
    //   setArray([
    //     ...dataArray,
    //     {
    //       emailCredentials: props.emailCredentials,
    //       email: props.email,
    //       message: sentMessage,
    //     },
    //   ]);
    // }
    // setSentMessage("");
  }, [ENDPOINT, props.email]);

  const specialFunction1 =async (email,emailCredentials, message) => {
    // fetch("http://localhost:3001/messaging", {
    //   method: "post",
    //   headers: { Authentication: "Content-Type:application/json" },
    //   body: JSON.stringify({
    //     emailCredentials: emailCredentials,
    //     email: email,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.length) {
    //       dataArray = data[0].message;
    //       setArray([data[0].message,{email,emailCredentials,message}]);
    //     } else setArray([]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });


      await fetch("http://localhost:3001/messaging", {
        method: "post",
        headers: { 
          Authentication: "Content-Type:application/json", 
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          emailCredentials: emailCredentials,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            dataArray = data[0].message;
            setArray([...data[0].message,{email:email,emailCredentials:emailCredentials,message:message},]);
          } else setArray([]);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const sendMessage = (event) => {
    // setDemo("kdfjl");
    if (message.length) {
      event.preventDefault();
      // setSentMessage(message);
      if (message) {
        const email = props.email;
        const userName = props.userName;
        const userNameCredentials = props.userNameCredentials;
        const emailCredentials = props.emailCredentials;
        localStorage.setItem("email", email);
        socket.emit(
          "sendMessage",
          { email, message, userName, emailCredentials, userNameCredentials },
          () =>{ setArray([...array, {email,emailCredentials,message}]);}
        );
        setMessage("");
      }
      //specialFunction1(props.emailCredentials, props.email, message);
    }
  };

  const chatt = values.filter((values, i) => {
    return values.name.toLowerCase().includes(chatSearch.toLowerCase());
  });
 
  for (let i = 0; i < props.imageArray.length; i++) {
    
    if (props.imageArray[i].email === props.email) {
      photo = props.imageArray[i].image;
      break;
    } 
    else 
        photo = "";
  }
  
  return (
    <div style={{ marginTop: "30px"}}>
      <audio ref={audioPlayer} src={NotificationSound} />
      <div className='courier f2 lh-copy rok ' style={{ color: "#F75990" }}>
        <Typewriter
          options={{
            strings: ["CHAT"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        justify="center"
      >        

          <Grid item xs={3} sm={4} md={2} lg={2} xl={2}>
{/* Search someone bar */}
            <Grid>
              <input
                className='h2 glow:hover input-reset b--white hover-bg-white hover-black  black'
                placeholder='    search'
                style={{ width: "100%",height:"44px",background:"#D3D3D3" }}
                onChange={(event) => setChatSearch(event.target.value)}
              />
            </Grid>
{/* Profile section  */}
            <Grid>
              <ChatList
                demo={demo}
                chatSearch={chatSearch}
                array={messageList}
                emailCredentials={props.emailCredentials}
                email={props.email}
              />
            </Grid>
          </Grid>


          <Grid
            item
            container
            direction='column'
            xl={4}
            lg={5}
            md={6}
            sm={8}
            xs={9}
          >

{/* Profile on top of Someone's chat         */}
            <Grid >
              {photo.length ? (
                <Card style={cardd} className='flex row w-100'>
                  <img
                    src={photo}
                    height='50px'
                    width='50px'
                    className='br-pill ml2'
                  />
                  <div className='white pl2 h-100-ns f3 measure-wide ml2 mt2'>
                    {props.userName.charAt(0).toUpperCase() +
                      props.userName.slice(1)}
                  </div>
                </Card>
              ) : (
                <Card style={cardd} className='white flex row'>
                  <AccountCircleIcon
                    style={{ height: "50px", width: "50px",color:"white",background:"F75990" }}
                  />
                  <div className='white pl2 h-100-ns f3 measure-wide ml2 mt2'>
                    {props.userName.charAt(0).toUpperCase() +
                        props.userName.slice(1)}
                  </div>
                </Card>
              )}
            </Grid>

{/* MessageBox */}

            <Grid>
              <div className='scroll'>
                <Card >
                  {array.length ? (
                    <div className="rotate">
                        <Messaging
                          array={array}
                          messages={messageList}
                          from={from}
                          to={to}
                          emailCredentials={props.emailCredentials}
                          email={props.email}
                        />
                    </div>
                  ) : (
                    <div className='wall white b pl2 pt2' style={{height:"442.27px"}}>
                      Hey, Welcome tInput message o the Chat!!
                    </div>
                  )}
                </Card>
              </div>
            </Grid>

{/* Input message  */}

            <Grid>
              <div className='w-100 ajay'>
                <Card style={carddd}>
                  <input
                    placeholder='type message...'
                    style={{ height: "20px", width: "100%" }}
                    className='pa2 ma2 ba b--near-white'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) =>
                      event.key === "Enter" ? sendMessage(event) : null
                    }
                  />
                </Card>
              </div>
            </Grid>

          </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
