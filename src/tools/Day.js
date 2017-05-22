import React from 'react';
import classNames from 'classnames';
import a from './App.css';

class Day extends React.Component {

    onChange( e ) {
        this.props.changeText(this.props.day.format(), e.target.value);
    }

    render() {
      var dayOfWeek = this.props.day.format("dd"),
          weekend = false,
          firstWeek = false,
          firstDay = false;
      if ( dayOfWeek === "Sa" || dayOfWeek === "Su" ) {
        weekend = a.weekend
      }
      if ( this.props.day.date() < 8 && !this.props.firstWeek) { firstWeek = a.first_week; }
      if ( this.props.day.date() === 1 && this.props.day.format("d") !== "0" ) { firstDay = a.first_day; }
      return (
          <div className={ a.day }>
            <div className={ weekend }>
              <div className={ firstWeek }>
                <div className={ firstDay }>
                  <div className={a.date}>
                      { this.props.day.format("D") }
                  </div>
                  <div className={a.textarea}>
                      <textarea value={this.props.dayText} onChange={this.onChange.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
}

export default Day;
