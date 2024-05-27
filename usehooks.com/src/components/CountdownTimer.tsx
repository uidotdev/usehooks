import { Fragment, useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // YYYY-MM-DD format
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(`${targetDate}T00:00:00-08:00`);
  const now = new Date();
  const difference = +target - +now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const formatNumber = (number: number) => number.toString().padStart(2, "0");

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return null;
  }

  return (
    <div className="countdown flex gap-1 justify-center text-md">
      {["days", "hours", "minutes", "seconds"].map((unit, index) => (
        <Fragment key={unit}>
          {index > 0 && <span className="h-[2rem] grid place-content-center">:</span>}
          <div className={`${unit} grid grid-cols-2 gap-x-1 gap-y-1.5`}>
            <span className="h-[2.2em] aspect-[6/7] grid place-content-center rounded-sm bg-brand-beige bg-opacity-10 font-semibold">
              {formatNumber(timeLeft[unit as keyof TimeLeft]).charAt(0)}
            </span>
            <span className="h-[2.2em] aspect-[6/7] grid place-content-center rounded-sm bg-brand-beige bg-opacity-10 font-semibold">
              {formatNumber(timeLeft[unit as keyof TimeLeft]).charAt(1)}
            </span>
            <p className="col-span-full text-xs">{unit}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Countdown;
