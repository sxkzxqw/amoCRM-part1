import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [remainTime, setRemainTime] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  const getTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  const hours = getTime(Math.floor(remainTime / 60 / 60))
  const minutes = getTime(Math.floor(remainTime / 60))
  const seconds = getTime(remainTime - minutes * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setRemainTime((remainTime) => (remainTime >= 0 ? remainTime + 1 : 0))
      }
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [isCounting])

  const handleStart = () => {
    setIsCounting(true)
  }
  const handleReset = () => {
    setIsCounting(false)
    setRemainTime(0)
  }
  const handleStop = () => {
    setIsCounting(false)
    setRemainTime(remainTime)
  }

  const getTextHours = () => {
    let hrsTime = ''
    let hrsText = ''
    if (hours !== '00') {
      hrsTime = hours
    } else {
      hrsTime = '00'
    }
    if (Math.floor(remainTime / 60 / 60) <= 5 || 0) {
      hrsText = 'часов'
    } else if (Math.floor(remainTime / 60 / 60) == 1) {
      hrsText = 'час'
    } else {
      hrsText = 'часа'
    }

    let mntTime = ''
    let mntText = ''
    if (minutes !== '00') {
      mntTime = minutes
    } else {
      mntTime = '00'
    }

    if (Math.floor(remainTime / 60) === 1) {
      mntText = 'минута'
    } else if (Math.floor(remainTime / 60) === 2 || 3 || 4) {
      mntText = 'минуты'
    } else if (minutes == '00') {
      mntText = 'минут'
    } else {
      mntText = 'минут'
    }

    let secTime = ''
    const secText = 'секунд'

    if (seconds !== '00') {
      secTime = seconds
    } else {
      secTime = '00'
    }

    const resultHours = `${hrsTime} ${hrsText} ${mntTime} ${mntText} ${secTime} ${secText}`
    return resultHours
  }

  return (
    <>
      <main className='App'>
        <div className='timer'>
          <div className={'timer__text'}>
            <span>{hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>
          <div className='timer__text_two'>
            <p className='text'>{getTextHours()}</p>
          </div>
          <div className='btns'>
            {isCounting
              ? <button type='button' className='btn' onClick={handleStop}>stop</button>
              : <button type='button' className='btn' onClick={handleStart}>start</button>
            }
            <button type='button' className='btn' onClick={handleReset}>reset</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
