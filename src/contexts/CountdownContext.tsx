import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ChallengesContext} from './ChallengeContexts';

let timer: NodeJS.Timeout;
const countDownTime = 5;

interface CountdownData {
	minutes: number;
	seconds: number;
	hasFinished: boolean;
	isActive: boolean;
	startCount: () => void;
	resetCount: () => void;
}

interface CountdownProps {
	children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownData);

export const CountdownProvider = ({children}: CountdownProps) => {
	const {startNewChallenge} = useContext(ChallengesContext);

	const [time, setTime] = useState(countDownTime);
	const [isActive, setActive] = useState(false);
	const [hasFinished, setFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const startCount = () => {
		setActive(true);
	};

	const resetCount = () => {
		clearTimeout(timer);
		setActive(false);
		setTime(countDownTime);
		setFinished(false);
	};

	useEffect(() => {
		if (isActive && time > 0) {
			timer = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (time === 0) {
			setActive(false);
			setFinished(true);
			startNewChallenge();
		}
	}, [isActive, time]);

	return (
		<CountdownContext.Provider
			value={{
				minutes,
				seconds,
				hasFinished,
				isActive,
				startCount,
				resetCount,
			}}
		>
			{children}
		</CountdownContext.Provider>
	);
}
