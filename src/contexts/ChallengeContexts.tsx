import {createContext, ReactNode, useState} from 'react';
import challenges from './../challenges.json';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengeContextData {
	level: number;
	experience: number;
	completedChallenges: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	activeChallenge: Challenge;
	resetChallenge: () => void;
	nextLvlExp: number;
}

interface challengeProps {
	children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export const ChallengesProvider = ({children}: challengeProps) => {
	const [level, setLevel] = useState(1);
	const [experience, setExperience] = useState(0);
	const [completedChallenges, setCompletedChallenges] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);

	const nextLvlExp = Math.pow((level + 1) * 4, 2);

	const levelUp = () => {
		setLevel(level + 1);
	};

	const startNewChallenge = () => {
		const randomIndex = Math.floor(Math.random() * challenges.length);
		setActiveChallenge(challenges[randomIndex]);
	};

	const resetChallenge = () => {
		setActiveChallenge(null);
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
			}}
		>
			{children}
		</ChallengesContext.Provider>
	);
};
