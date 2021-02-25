import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from './../challenges.json';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengeData {
	level: number;
	experience: number;
	completedChallenges: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	activeChallenge: Challenge;
	resetChallenge: () => void;
	nextLvlExp: number;
	completeChallenge: () => void;
}

interface challengeProps {
	children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeData);

export const ChallengesProvider = ({children}: challengeProps) => {
	const [level, setLevel] = useState(1);
	const [experience, setExperience] = useState(0);
	const [completedChallenges, setCompletedChallenges] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);

	const nextLvlExp = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	const levelUp = () => {
		setLevel(level + 1);
	};

	const startNewChallenge = () => {
		const randomIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomIndex];
		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();
		if (Notification.permission === 'granted') {
			new Notification('Novo desafio 🤳', {
				body: `Valendo ${challenge.amount}xp!`,
			});
		}
	};

	const resetChallenge = () => {
		setActiveChallenge(null);
	};

	const completeChallenge = () => {
		if (!activeChallenge) return;

		const {amount} = activeChallenge;
		let finalExperience = experience + amount;

		if (finalExperience >= nextLvlExp) {
			finalExperience -= nextLvlExp;
			levelUp();
		}

		setExperience(finalExperience);
		setActiveChallenge(null);
		setCompletedChallenges(completedChallenges + 1);
	};

	return (
		<ChallengesContext.Provider
			value={{
				level,
				experience,
				completedChallenges,
				levelUp,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				nextLvlExp,
				completeChallenge,
			}}
		>
			{children}
		</ChallengesContext.Provider>
	);
};
