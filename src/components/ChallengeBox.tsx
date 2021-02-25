import styles from '../styles/components/ChallengeBox.module.css';
import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';
import {CountdownContext} from '../contexts/CountdownContext';

export function ChallengeBox() {
	const {activeChallenge, resetChallenge, completeChallenge} = useContext(
		ChallengesContext
	);
	const {resetCount} = useContext(CountdownContext);

	return (
		<div className={styles.challengeContainer}>
			{activeChallenge ? (
				<div className={styles.challengeActive}>
					<header>Ganhe {activeChallenge.amount} xp</header>
					<main>
						<img src={`icons/${activeChallenge.type}.svg`} alt="body" />
						<strong>Novo desafio</strong>
						<p>{activeChallenge.description}</p>
					</main>
					<footer>
						<button
							type="button"
							className={styles.failedBtn}
							onClick={() => {
								resetChallenge();
								resetCount();
							}}
						>
							Falhei
						</button>
						<button
							type="button"
							className={styles.successBtn}
							onClick={() => {
								completeChallenge();
								resetCount();
							}}
						>
							Consegui
						</button>
					</footer>
				</div>
			) : (
				<div className={styles.challengeNotActive}>
					<strong>Finalize um ciclo para receber um desafio</strong>
					<p>
						<img src="icons/level-up.svg" alt="Level up" />
						Avance de level completando desafios
					</p>
				</div>
			)}
		</div>
	);
}
