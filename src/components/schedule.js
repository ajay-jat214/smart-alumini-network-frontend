import React from "react";
import Calendar_Components from "./calendar/calendar_components.js";
import { connect } from "react-redux";
import { INITIAL_EVENTS, createEventId } from "./calendar/event-utils";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { calendarEvents } from "./redux/actions";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

const mapStateToProps = (state) => {
  const EVENTS_LOAD = state.calendarList.EVENTS_LOAD;
  const email = state.emailDetails.emailCredentials;
  const x = { email, EVENTS_LOAD };
  return x;
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (values) => dispatch(calendarEvents(values)),
  };
};

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      EVENTS_LOAD: [],
      show: false,
      show1: false,
    };
  }
  componentDidMount =  () => {
    fetch(`http://localhost:3001/fetchEvents?token=${localStorage.getItem('token')}`, {
      method: "post",
      headers: { 
        Authentication: "Content-Type:application/json", 
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: this.props.email,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        let k = [];

        if (!user.length) this.setState({ show: true });
        for (let i = 0; i < user.length; i++) {
          var option = {};
          const options = new Date(user[i].startDate).toLocaleTimeString(
            [],
            option
          );

          k.push({
            title: user[i].title,
            start: user[i].startDate,
            backgroundColor: user[i].backgroundColor,
            id: user[i]._id,
            end: user[i].endDate,
            time: options,
          });
        }
        if (k.length) this.setState({ show: true });
        if (!k.length) this.setState({ show1: true });
        else this.setState({ show1: false });
        this.setState({ EVENTS_LOAD: k });
        if (k.length) this.props.search(k);
      })
      .catch((err) => console.log(err));
  };

  call_back = async () => {
    await fetch(`http://localhost:3001/fetchEvents?token=${localStorage.getItem('token')}`, {
      method: "post",
      headers: { 
        Authentication: "Content-Type:application/json", 
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: this.props.email,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (!user.length) this.setState({ show: true });
        let k = [];
        for (let i = 0; i < user.length; i++) {
          var option = {};
          const options = new Date(user[i].startDate).toLocaleTimeString(
            [],
            option
          );

          k.push({
            title: user[i].title,
            start: user[i].startDate,
            backgroundColor: user[i].backgroundColor,
            id: user[i]._id,
            end: user[i].endDate,
            time: options,
          });
        }
        if (k.length) this.setState({ show: true });
        if (!k.length) this.setState({ show1: true });
        else this.setState({ show1: false });
        this.setState({ EVENTS_LOAD: k });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.show && (
          <Calendar_Components
            show={this.state.show1}
            EVENTS_LOAD={this.state.EVENTS_LOAD}
            call_back={this.call_back}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
