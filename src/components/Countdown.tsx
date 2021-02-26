import styles from './../styles/components/Countdown.module.css';
import {useContext} from 'react';
import {CountdownContext} from '../contexts/CountdownContext';

const Countdown = () => {
	const {
		minutes,
		seconds,
		hasFinished,
		isActive,
		resetCount,
		startCount,
	} = useContext(CountdownContext);

	const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
	const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');

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
			{hasFinished ? (
				<button disabled className={styles.countDownBtn}>
					Ciclo encerrado
				</button>
			) : (
				<>
					{isActive ? (
						<button
							type="button"
							className={`${styles.countDownBtn} ${styles.countBtnActive}`}
							onClick={resetCount}
						>
							Abandonar ciclo
						</button>
					) : (
						<button
							type="button"
							className={styles.countDownBtn}
							onClick={startCount}
						>
							Iniciar um ciclo
						</button>
					)}
				</>
			)}
		</>
	);
}

export default Countdown;