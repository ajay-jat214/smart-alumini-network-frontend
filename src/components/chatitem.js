import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import "./homepage.css";
import { setChatSearch, setClick } from "./redux/actions";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { IKImage } from 'imagekitio-react';
import { Avatar } from "antd";
var cardstyle = {
  height: "60px",
  width: "370px",
  background: "black",
  color: "white",
};

const urlEndpoint="https://ik.imagekit.io/jatajay004/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const mapStateToProps = (state) => {
  const emailCredentials = state.emailDetails.emailCredentials;
  const email = state.searchChat.chatSearch.email;
  const x = { emailCredentials };
  return x;
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (values) => dispatch(setChatSearch(values)),
    click: (values) => dispatch(setClick(values)),
  };
};
function ChatItem(props) {
  const classes = useStyles();
  
  return (
    <div>
      <div className='pt2 '>
        {props.emailCredentials !== props.values[props.id].email ? (
          <div onClick={props.click.bind(null, 1)}>
            <div
              className='flex row pl2 pb1 pt1 pointer glow:hover input-reset  bg-white black ajay '
              onClick={props.search.bind(null, props.values[props.id])}
            >
              <div>
                {props.values[props.id].photo.length ? (
                  <div className='flex row'>
                    <img
                      src={props.values[props.id].photo}
                      alt="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      onerror='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pnghttps://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                      style={{
                        minHeight: "41.67px",
                        minWidth: "41.67px",
                        maxHeight: "41.67px",
                        maxWidth: "41.67px",
                        borderRadius: "100%",
                        marginLeft: "3px",
                        marginRight: "3px",
                      }}
                      className=''
                    />
                    {/* <IKImage
                      urlEndpoint={urlEndpoint}
                      path="default-image.jpg"
                      style={{
                        minHeight: "41.67px",
                        minWidth: "41.67px",
                        maxHeight: "41.67px",
                        maxWidth: "41.67px",
                        borderRadius: "100%",
                        marginLeft: "3px",
                        marginRight: "3px",
                      }}
                    /> */}
                    <div>
                      {props.id < props.notificationLength ? (
                        <div className='notifications z-999 ' style={{position:"relative",left:"-20px"}}>
                          <Badge
                            badgeContent={1}
                            color='error'
                          >
                            <MailIcon />
                          </Badge>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className='flex row'>
                    <AccountCircleIcon
                      style={{ height: "50px", width: "50px",color:"#D3D3D3" }}
                    />
                    <div>
                      {props.id < props.notificationLength ? (
                        <div className='notifications z-999' style={{position:"relative",left:"-20px"}}>
                          <Badge
                            badgeContent={1}
                            color='error'
                          >
                            <MailIcon />
                          </Badge>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              <div className='pb3 pl4'>
                {props.values[props.id].firstName.charAt(0).toUpperCase() +
                  props.values[props.id].firstName.slice(1)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatItem);
