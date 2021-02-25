import styles from '../styles/components/ExperienceBar.module.css';
import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';

const ExperienceBar = () => {
	const {experience, nextLvlExp} = useContext(ChallengesContext);
	const percent = `${Math.round(experience * 100) / nextLvlExp}%`;

	return (
		<header className={styles.experienceBar}>
			<span>0 xp</span>
			<div>
				<div style={{width: percent}} />
				<span className={styles.currentExperience} style={{left: percent}}>
					{experience} xp
				</span>
			</div>
			<span>{nextLvlExp} xp</span>
		</header>
	);
};

export default ExperienceBar;
