import styles from './../styles/components/CompletedChallenges.module.css';
import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';

const CompletedChallenges = () => {
	const {completedChallenges} = useContext(ChallengesContext)

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{completedChallenges}</span>
		</div>
	);
}

export default CompletedChallenges;