import styles from './../styles/components/Countdown.module.css';
import {useContext, useEffect, useState} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';

let timer: NodeJS.Timeout;
const countDownTime = 5;

export function Countdown() {
	const {startNewChallenge} = useContext(ChallengesContext);

	const [time, setTime] = useState(countDownTime);
	const [isActive, setActive] = useState(false);
	const [finished, setFinished] = useState(false);

	const [minLeft, minRight] = String(Math.floor(time / 60))
		.padStart(2, '0')
		.split('');
	const [secLeft, secRight] = String(time % 60)
		.padStart(2, '0')
		.split('');

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
		<>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minLeft}</span>
					<span>{minRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secLeft}</span>
					<span>{secRight}</span>
				</div>
			</div>
			{finished ? (
				<button disabled className={styles.countDownBtn}>
					Ciclo encerrado
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type="button"
							className={`${styles.countDownBtn} ${styles.countBtnActive}`}
							onClick={() => {
								clearTimeout(timer);
								setActive(false);
							}}
						>
							Abandonar ciclo
						</button>
					) : (
						<button
							type="button"
							className={styles.countDownBtn}
							onClick={() => {
								setActive(true);
								setFinished(false);
								setTime(countDownTime);
							}}
						>
							Iniciar um ciclo
						</button>
					)}
				</>
			)}
		</>
	);
}
