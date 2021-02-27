import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import {GetServerSideProps} from 'next';

import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import {CountdownProvider} from '../contexts/CountdownContext';
import {ChallengesProvider} from '../contexts/ChallengeContexts';

interface HomeProps {
	level: number;
	experience: number;
	completedChallenges: number;
}

export default function Home(props: HomeProps) {
	
	return (
		<ChallengesProvider
			level={props.level}
			experience={props.experience}
			completedChallenges={props.completedChallenges}
		>
			<div className={styles.container}>
				<Head>
					<title>Início | MoveIt!</title>
				</Head>

				<ExperienceBar />
				<CountdownProvider>
					<section>
						<div>
							<Profile />
							<CompletedChallenges />
							<Countdown />
						</div>
						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const {level, experience, completedChallenges} = ctx.req.cookies;

	return {
		props: {
			level: Number(level ?? 1),
			experience: Number(experience ?? 0),
			completedChallenges: Number(completedChallenges ?? 0),
		},
	};
};
