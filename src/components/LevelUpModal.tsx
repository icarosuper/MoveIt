import styles from './../styles/components/LevelUpModal.module.css';
import {ChallengesContext} from '../contexts/ChallengeContexts';
import {useContext} from 'react';

export const LevelUpModal = () => {
	const {level, closeLvlUpModal} = useContext(ChallengesContext);

	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<header>{level}</header>
				<strong>Parabéns!</strong>
				<p>Você alcançou um novo nível.</p>
				<button type="button" onClick={closeLvlUpModal}>
					<img src="/icons/close.svg" alt="Fechar popup" />
				</button>
			</div>
		</div>
	);
};
