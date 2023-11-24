import { useState, useEffect } from 'react';

type Props = {
    initMins: number,
    initSecs: number,
    onFinish: () => void 
};

const Timer = ({ initMins, initSecs, onFinish }: Props) => {
    const [[mins, secs], setCountdown] = useState([initMins, initSecs]);

    useEffect(() => {
        let timerInterval = setInterval(() => {
            if (mins === 0 && secs === 0) {
                clearInterval(timerInterval);
                onFinish(); // Call onFinish when timer reaches zero
            } else if (secs === 0) {
                setCountdown([mins - 1, 59]);
            } else {
                setCountdown([mins, secs - 1]);
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [mins, secs, onFinish]);

    return (
        <>
            {mins === 0 && secs === 0
                ? null
                : <span> {mins}:{secs < 10 ? `0${secs}` : secs}</span>
            }
        </>
    );
}

export default Timer;
