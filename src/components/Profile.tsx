import styles from './../styles/components/Profile.module.css';
import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengeContexts';

const Profile = () => {
	const {level} = useContext(ChallengesContext)

	return (
		<div className={styles.profileContainer}>
			<img src='https://github.com/icarosuper.png' alt='Foto de perfil'/>
			<div>
				<strong>Ícaro Motta</strong>
				<p>
					<img src='icons/level.svg' alt='level-icon'/>
					Level {level}
				</p>
			</div>
		</div>
	)
}

export default Profile;