import styles from './../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src='https://github.com/icarosuper.png' alt='Foto de perfil'/>
            <div>
                <strong>Ícaro Motta</strong>
                <p>
                    <img src='icons/level.svg' alt='level-icon'/>
                    Level 1
                </p>
            </div>
        </div>
    )
}