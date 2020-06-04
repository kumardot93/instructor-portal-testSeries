import React from 'react';
import styles from './css/Main.module.css';

function Blogs() {
	return (
		<div className={[ 'bg-light m-2 mr-3 mb-4', styles.boxes ].join(' ')}>
			<h1 className={[ 'pl-4 bg-dark text-light', styles.heading ].join(' ')}>
				Blogs
				<a href="#" className={[ 'material-icons m-2 p-0', styles.addBtn ].join(' ')}>
					add
				</a>
			</h1>
		</div>
	);
}

export default Blogs;
