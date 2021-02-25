import styles from './../styles/components/CompletedChallenges.module.css';
import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';

export function CompletedChallenges() {
	const {completedChallenges} = useContext(ChallengesContext)

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{completedChallenges}</span>
		</div>
	);
}
