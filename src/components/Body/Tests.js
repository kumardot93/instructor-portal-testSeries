import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Tests.module.css';
import OverlayForm from './OverlayForm.js';
import OverlayDeleteTest from './OverlayDeleteForm.js';
import OverlayTestResponses from './OverlayTestResults.js';

import { connect } from 'react-redux';
import { deleteTest as dt } from '../../redux/actions/Tests.js';

function newTest(event) {
	//Create new test
	event.preventDefault();
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(
		<OverlayForm
			title="New Test"
			url={window.base + '/material/api/newTest/'}
			success_url={window.base + '/material/create-test/'}
		/>,
		el
	);
}

function TestResponses(pk) {
	//List of response on a test
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(<OverlayTestResponses pk={pk} />, el);
}

function deleteTest(pk, test, delMethod) {
	//Delete a test
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(
		<OverlayDeleteTest
			title="Test Delete Form"
			data={test}
			url={window.base + '/material/api/test/deleteTest/' + pk + '/'}
			delete={delMethod}
		/>,
		el
	);
}

function Tests(props) {
	const [ active, updateActive ] = useState(-1);
	let tests;
	tests = props.tests.tests.map((data, index) => {
		let is_active = index === active ? styles.active : ''; //style if active from use state is == index of data

		return (
			<button
				onClick={() => updateActive(index)}
				key={index}
				className={[ 'btn form-control mb-1 text-left', styles.testBtns, is_active ].join(' ')}
				style={{ backgroundColor: is_active === '' ? '' : 'rgba(0, 175, 59, 0.8)' }}
			>
				{data.fields.title}
				{is_active !== '' ? (
					<div className="text-right">
						<button
							className={[ 'float-left', styles.assBtn ].join(' ')}
							onClick={(ev) => TestResponses(data.pk)}
						>
							<i className="material-icons">assignment</i>
							<span className="ml-2">{data.attempts}</span>
						</button>

						<a
							href={window.base + '/material/create-test/' + data.pk} //Link to create test
							className={[ 'material-icons btn p-1', styles.editBtn ].join(' ')}
						>
							edit
						</a>
						<button
							className={[ 'material-icons btn p-1', styles.deleteBtn ].join(' ')}
							onClick={(ev) =>
								deleteTest(data.pk, data.fields.title, () => {
									//pasing a function to run when delete is successfull
									props.deleteTest(index);
									updateActive(-1);
								})}
						>
							delete
						</button>
					</div>
				) : (
					''
				)}
			</button>
		);
	});

	return (
		<React.Fragment>
			<h1 className={[ 'pl-4 text-dark mt-4 ml-4', styles.heading ].join(' ')}>
				Tests
				<button
					onClick={newTest}
					className={[ 'material-icons m-2 p-0 text-success mr-4 pr-4', styles.addBtn ].join(' ')}
				>
					add
				</button>
			</h1>
			<hr className="ml-3" />
			<div className={[ 'ml-2 pr-2 form-control', styles.testsCont ].join(' ')}>{tests}</div>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		tests: state.Tests
	};
};

const mapDispatchFromProps = (dispatch) => {
	return {
		deleteTest: (index) => dispatch(dt(index))
	};
};

export default connect(mapStateToProps, mapDispatchFromProps)(Tests);
