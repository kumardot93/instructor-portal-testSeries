import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Main.module.css';
import sty from './css/Tests.module.css';
import OverlayForm from './OverlayForm.js';

import { connect } from 'react-redux';

function newTest(event) {
	event.preventDefault();
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(
		<OverlayForm title="New Test" url={window.base + '/material/api/newTest/'} success_url={window.base + '/'} />,
		el
	);
}

function Tests(props) {
	const [ active, updateActive ] = useState(-1);
	let tests = '';
	if (props.tests != undefined) {
		tests = props.tests.map((data, index) => {
			let is_active = index == active ? sty.active : '';
			let btnClass = is_active == '' ? 'btn-secondary' : 'btn-info';
			return (
				<button
					onClick={() => updateActive(index)}
					key={index}
					className={[ 'btn form-control mb-1', sty.testBtns, is_active, btnClass ].join(' ')}
				>
					{data.fields.title}
					{is_active != '' ? (
						<div className="text-right">
							<sub className="material-icons float-left" style={{ fontSize: 'x-large' }}>
								visibility
							</sub>
							<span className="float-left ml-2">0</span>
							<a href="#" className={[ 'material-icons btn p-1', sty.editBtn ].join(' ')}>
								edit
							</a>
							<a href="#" className={[ 'material-icons btn p-1', sty.deleteBtn ].join(' ')}>
								delete
							</a>
						</div>
					) : (
						''
					)}
				</button>
			);
		});
	}
	return (
		<div className={[ 'bg-light m-2 mr-3 mb-4', styles.boxes ].join(' ')}>
			<h1 className={[ 'pl-4 bg-dark text-light', styles.heading ].join(' ')}>
				Tests
				<button onClick={newTest} className={[ 'material-icons m-2 p-0', styles.addBtn ].join(' ')}>
					add
				</button>
			</h1>
			<div class={[ 'pl-2 pr-2', sty.testsCont ].join(' ')}>{tests}</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		tests: state.Material != undefined ? state.Material.tests : []
	};
};

export default connect(mapStateToProps)(Tests);
