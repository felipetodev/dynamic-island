import { ReactNode, useState, useMemo, CSSProperties } from 'react'
import { motion } from 'framer-motion'

type IDType = 'default' | 'music' | 'airpods' | 'charging' | 'call';

type IslandProps = {
  id: IDType;
  island: ReactNode;
};

type defaultState = {
  [_ in IDType]: IslandProps;
};

const DEFAULT_STATE: defaultState = {
	charging: {
		id: 'charging',
		island: (
			<motion.div animate={{ width: '350px' }}>
				<motion.div
					className="flex justify-between items-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<div>Charging</div>
					<div>⚡️ 98%</div>
				</motion.div>
			</motion.div>
		)
	},
	music: {
		id: 'music',
		island: (
			<motion.div
				style={{ height: '100%' }}
				animate={{ width: '320px' }}
				transition={{ ease: 'easeInOut' }}
			>
				<motion.div
					className="flex flex-col"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<div className="flex justify-between items-center p-2">
						<div>Music</div>
						<div className="shadow-white animate-bounce">🎵</div>
					</div>
					<div className="flex justify-center items-center w-100 aspect-video overflow">
						<iframe
							className="w-100 h-100"
							src="https://www.youtube.com/embed/Y8LXkDiCsnM?controls=0"
							title="Dynamic island demo"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</motion.div>
			</motion.div>
		)
	},
	airpods: {
		id: 'airpods',
		island: (
			<motion.div animate={{ width: '350px' }}>
				<motion.div
					className="flex justify-between items-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<div className="shadow-white text-white animate-bounce">
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
							<path
								d="M7 3.50001C7 1.60628 5.34025 0.141084 3.46115 0.375972L3.14071 0.416027C2.59386 0.484383 2.07432 0.694263 1.63344 1.02492L0 2.25001V4.75001L1.63344 5.97509C2.07432 6.30575 2.59386 6.51563 3.14071 6.58399L3.46115 6.62404C3.64326 6.64681 3.82332 6.6536 4 6.64559V15H7V3.50001ZM4 4H2V3H4V4Z"
								fill="currentColor"
							></path>
							<path
								d="M8 3.50001C8 1.60628 9.65975 0.141084 11.5389 0.375972L11.8593 0.416027C12.4061 0.484383 12.9257 0.694263 13.3666 1.02492L15 2.25001V4.75001L13.3666 5.97509C12.9257 6.30575 12.4061 6.51563 11.8593 6.58399L11.5389 6.62404C11.3567 6.64681 11.1767 6.6536 11 6.64559V15H8V3.50001ZM11 4H13V3H11V4Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					<div>Connected</div>
				</motion.div>
			</motion.div>
		)
	},
	call: {
		id: 'call',
		island: (
			<motion.div animate={{ width: '350px', padding: '18px 10px' }}>
				<motion.div
					className="flex justify-between items-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<div className="flex px-2 items-center">
						<div className="rounded-full overflow-hidden mr-2">
							<img
								height={50}
								width={50}
								src="https://unavatar.io/github/felipetodev"
								alt="iphone-avatar"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-xs text-gray-400">iPhone</span>
							<span>Felipe Ossandon</span>
						</div>
					</div>
					<div>
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
					</div>
				</motion.div>
			</motion.div>
		)
	},
	default: {
		id: 'default',
		island: (
			<motion.div
				initial={{ width: '150px' }}
				animate="visible"
				exit={{ width: '150px' }}
			></motion.div>
		)
	}
}

export default function DynamicIsland () {
	const [islandComponent, setComponent] = useState<IslandProps>(DEFAULT_STATE.default)

	const handleIsland = (selection: IslandProps) => {
		setComponent(selection)
		if (selection.id === 'music') return null
		const island = setTimeout(() => {
			setComponent(DEFAULT_STATE.default)
		}, 2000)
		return () => clearInterval(island)
	}

	const mainContainer = useMemo<CSSProperties>(() => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1f1f1f',
		minHeight: '50px',
		padding: '6px 12px',
		...(islandComponent.id === 'music'
			? { borderRadius: '22px', height: '250px' }
			: { borderRadius: '9999px' }),
		color: 'white'
	}), [islandComponent])

	return (
		<div className="flex flex-col h-screen items-center justify-between py-20">
			{/* Island */}
			<motion.div style={mainContainer}>{DEFAULT_STATE.call.island}</motion.div>

			{/* Controls */}
			<div className="bg-gray-300 flex justify-between items-center gap-10 py-4 px-8 rounded-full">
				<button onClick={() => handleIsland(DEFAULT_STATE.airpods)}>
          AirPods
				</button>
				<button onClick={() => handleIsland(DEFAULT_STATE.charging)}>
          Charging
				</button>
				<button onClick={() => handleIsland(DEFAULT_STATE.music)}>Music</button>
				<button onClick={() => handleIsland(DEFAULT_STATE.call)}>Call</button>
			</div>
		</div>
	)
}
