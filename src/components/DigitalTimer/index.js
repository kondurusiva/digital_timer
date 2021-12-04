// Write your code here
import {Component} from 'react'
import './index.css'

const initialsState = {
  isTimeRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialsState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval()

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimerElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const completeTime = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (completeTime) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrStopTimer = () => {
    const {
      isTimeRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const completeTime = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (completeTime) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimerController = () => {
    const {isTimeRunning} = this.state
    const playOrPause = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const altText = isTimeRunning ? 'play icon' : 'pause icon'

    return (
      <div className="timer-controller-container">
        <button
          className="pause"
          onClick={this.onStartOrStopTimer}
          type="button"
        >
          <img src={playOrPause} alt={altText} className="pause-img" />
          <p>{isTimeRunning ? 'Start' : 'Pause'}</p>
        </button>
        <button className="reset" onClick={this.onResetTimer} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-img"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  onClickIncrement = () => {
    const {timerLimitInMinutes} = this.state

    this.setState({timerLimitInMinutes: timerLimitInMinutes + 1})
  }

  onClickDecrement = () => {
    const {timerLimitInMinutes} = this.state

    this.setState({timerLimitInMinutes: timerLimitInMinutes - 1})
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialsState)
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <p>Set Timer limit</p>
        <div className="timer-btns">
          <button
            onClick={this.onClickDecrement}
            disabled={isButtonDisabled}
            type="button"
          >
            -
          </button>
          <div className="timer-limit-container">
            <p className="seconds">{timerLimitInMinutes}</p>
          </div>
          <button
            onClick={this.onClickIncrement}
            disabled={isButtonDisabled}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="digital-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
