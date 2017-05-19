import React, { Component } from 'react';
import moment from 'moment-timezone';
import './App.css';
import Day from './Day.js';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
          now: moment(),
          weeks: [],
          dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          weekStart: "Sun",
          weekCount: 4,
          text: {}
      };
    }

    componentDidMount() {
        this.setWeeks(this.state.weekCount);
    }

    setWeeks(weeks) {
        var tempDays = [],
            tempWeeks = [];
        for ( let i=0; i < weeks * 7; i++ ) {
            tempDays[i] = moment(this.state.now).startOf('week').add( i, 'days')
        }
        for ( let i=0; i < weeks; i++ ) {
            tempWeeks[i] = tempDays.slice(i * 7, i * 7 + 7);
        }
        this.setState( { weeks: tempWeeks } );
    }

    changeText(day, text) {
        let newTextObject = Object.assign( {}, this.state.text, { [day]: text } );
        this.setState( {text: newTextObject} );
    }

    dayNames() {
        return (
          <div className="day-names">
            {this.state.dayNames.map(day => {
                return (
                  <div key={day} className="day-name">
                    { day }
                  </div>
                )
                ;
            })}
          </div>
        )
    }

    moveWeek(e) {
      this.state.weeks.forEach(week => {
        week.forEach(day => {
          day.add(e.target.value, 'week');
        })
      })

      var newStart = this.state.now.add(e.target.value, 'week');

      this.setState({ now: newStart, weeks: this.state.weeks })
    }

    numWeeks(e) {
      var newWeekCount = this.state.weekCount + Number(e.target.value)
      if ( newWeekCount < 2 ) { newWeekCount = 2 ;}
      if ( newWeekCount > 8 ) { newWeekCount = 8 ;}
      this.setWeeks(newWeekCount);
      this.setState({weekCount: newWeekCount});
    }

    showWeeks(){
      if (this.state.weeks[0]) {
        return(
          <div className="calendar">
            <Week key={this.state.weeks[0][0].dayOfYear()}
                  week={this.state.weeks[0]}
                  allText={this.state.text}
                  changeText={this.changeText.bind(this)}
                  firstWeek={1}/>
            { this.state.weeks.slice(1).map(week => {
                  return <Week key={week[0].dayOfYear()}
                              changeText={this.changeText.bind(this)}
                                allText={this.state.text}
                               week={week}/>;
              }) }
          </div>
        )
      }
    }

    monthRange() {
      var firstText, lastText, text;
      if ( this.state.weeks[0] ) {
        firstText = this.state.weeks[0][0].format("MMM YYYY");
        lastText = this.state.weeks[this.state.weekCount - 1][6].format("MMM YYYY");
      }

      if ( firstText === lastText ) {
        text = firstText
      } else {
        text = firstText + " - " + lastText
      }

      return (
        <div className="month-range">
          { text }
        </div>

      )
    }
    toggleLayout() {
      document.getElementsByClassName("super")[0].classList.toggle("rotator")
      document.getElementsByClassName("container")[0].classList.toggle("landscape")
      document.getElementsByClassName("container")[0].classList.toggle("portrait")
      document.getElementsByClassName("orientation")[0].classList.toggle("active")
      document.getElementsByClassName("orientation")[1].classList.toggle("active")
    }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <div className="buttons">
            <div className="button-group">
              <button className="btn shift" onClick={ this.moveWeek.bind(this) } value="-1">back 1 week</button>
              <button className="btn shift" onClick={ this.moveWeek.bind(this) } value="1">forward 1 week</button>
            </div>
            <div className="button-group">
              <button className="btn scale" onClick={ this.numWeeks.bind(this) } value="-1">1 less week</button>
              <button className="btn scale" onClick={ this.numWeeks.bind(this) } value="1">1 more week</button>
            </div>
            <div className="button-group">
              <button className="btn orientation active" onClick={ this.toggleLayout } >portrait</button>
              <button className="btn orientation" onClick={ this.toggleLayout } >landscape</button>
            </div>
            <div className="button-group">
                <button className="btn print" onClick={ window.print } >print</button>
            </div>
          </div>
        </div>
        <div className="super">
          <div className="container portrait">
              { this.monthRange() }
              { this.dayNames() }
              { this.showWeeks() }
              <div className="footer">supamoto.co</div>
            </div>
        </div>
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    return (
      <div className="week">
          { this.props.week.map(day => {
                let dateText = day.format();
                return <Day key={dateText}
                             day={day}
                             dayText={this.props.allText[dateText]}
                             changeText={this.props.changeText}
                             firstWeek={ this.props.firstWeek }/>;
            }) }
      </div>
    );
  }
}

export default App;
