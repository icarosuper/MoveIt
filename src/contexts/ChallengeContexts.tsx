import {createContext, ReactNode, useState} from 'react';

interface ChallengeContextData {
	level: number;
	experience: number;
	compChallenges: number;
	levelUp: () => void;
	startNewChallenge: () => void;
}

interface challengeProps {
	children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export const ChallengesProvider = ({children}: challengeProps) => {
	const [level, setLevel] = useState(1);
	const [experience, setExperience] = useState(0);
	const [compChallenges, setChallenges] = useState(0);

	const levelUp = () => {
		setLevel(level + 1);
	};

	const startNewChallenge = () => {
		console.log('começou novo desafio');
	};

	return (
		<ChallengesContext.Provider
			value={{level, experience, compChallenges, levelUp, startNewChallenge}}
		>
			{children}
		</ChallengesContext.Provider>
	);
};
