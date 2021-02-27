import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from './../challenges.json';
import Cookies from 'js-cookie';
import {LevelUpModal} from '../components/LevelUpModal';

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
	closeLvlUpModal: () => void;
}

interface challengeProps {
	children: ReactNode;
	level: number;
	experience: number;
	completedChallenges: number;
}

export const ChallengesContext = createContext({} as ChallengeData);

export const ChallengesProvider = ({children, ...user}: challengeProps) => {
	const [level, setLevel] = useState(user.level);
	const [experience, setExperience] = useState(user.experience);
	const [completedChallenges, setCompletedChallenges] = useState(
		user.completedChallenges
	);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [isLvlUpModalOpen, setIsLvlUpModalOpen] = useState(false);

	const nextLvlExp = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookies.set('level', String(level));
		Cookies.set('experience', String(experience));
		Cookies.set('completedChallenges', String(completedChallenges));
	}, [level, experience, completedChallenges]);

	const levelUp = () => {
		setLevel(level + 1);
		setIsLvlUpModalOpen(true);
	};

	const closeLvlUpModal = () => setIsLvlUpModalOpen(false);

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
				closeLvlUpModal,
			}}
		>
			{children}
			{isLvlUpModalOpen && <LevelUpModal />}
		</ChallengesContext.Provider>
	);
};
