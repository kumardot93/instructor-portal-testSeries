import React from 'react';
import styles from './css/Sidebar.module.css';
function Sidebar(props) {
	return (
		<div className={[ 'bg-light ml-auto m-2 mb-4', styles.sidebar ].join(' ')}>
			<div className="d-flex" id={styles.sideCont}>
				<button className={[ 'flex-fill btn btn-dark m-1', styles.btnFont ].join(' ')}>
					<sub className={[ 'material-icons mr-2', styles.mi ].join(' ')}>account_balance_wallet</sub>Earnings
				</button>
				<button className={[ 'flex-fill btn btn-dark m-1', styles.btnFont ].join(' ')}>
					<sub className={[ 'material-icons mr-2', styles.mi ].join(' ')}>description</sub>Reports
				</button>
				<button className={[ 'flex-fill btn btn-dark m-1', styles.btnFont ].join(' ')}>
					<sub className={[ 'material-icons mr-2', styles.mi ].join(' ')}>pageview</sub>Actives
				</button>
				<button className={[ 'flex-fill btn btn-dark m-1', styles.btnFont ].join(' ')}>
					<sub className={[ 'material-icons mr-2', styles.mi ].join(' ')}>assessment</sub>Trending
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
