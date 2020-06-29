import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Tests.module.css';
import OverlayForm from './OverlayForm.js';
import OverlayDeleteTest from './OverlayDeleteForm.js';

import { connect } from 'react-redux';
import { deleteTestSeries as dt } from '../../redux/actions/TestSeries.js';

function newTestSeries(event) {
	//Create new test
	event.preventDefault();
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(
		<OverlayForm title="New Test Series" url={window.base + '/material/api/newTestSeries/'} success_url="#" />,
		el
	);
}

function deleteTestSeries(pk, testSeries, delMethod) {
	//Delete a test
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(
		<OverlayDeleteTest
			title="Test Series Delete Form"
			data={testSeries}
			url={window.base + '/material/api/testS/deleteTestSeries/' + pk + '/'}
			delete={delMethod}
		/>,
		el
	);
}

function accessType(data) {
	//To determine the material icon accordingto teh access type
	let res = '';
	switch (data) {
		case 0:
			res = 'public';
			break;
		case 1:
			res = 'lock';
			break;
		case 2:
			res = 'payments';
			break;
	}
	return res;
}

function Tests(props) {
	const [ active, updateActive ] = useState(-1);
	let testSeries;
	testSeries = props.testSeries.testSeries.map((data, index) => {
		let is_active = index === active ? styles.active : ''; //style if active from use state is == index of data
		return (
			<div
				onClick={() => updateActive(index)}
				key={index}
				className={[ 'btn form-control mb-1 text-left', styles.testBtns, is_active ].join(' ')}
				style={{ backgroundColor: is_active === '' ? '' : 'rgba(0, 175, 59, 0.8)' }}
			>
				{data.fields.title}
				<span className="float-right material-icons">{accessType(data.fields.access)}</span>
				{is_active !== '' ? (
					<div className="text-right">
						<button className={[ 'float-left', styles.assBtn ].join(' ')}>
							<i className="material-icons">assignment</i>
							<span className="ml-2">{data.attempts}</span>
						</button>

						<a
							className={[ 'material-icons btn p-1', styles.editBtn ].join(' ')}
							href={window.base + '/material/create-test-series/' + data.pk}
						>
							edit
						</a>
						<button
							className={[ 'material-icons btn p-1', styles.deleteBtn ].join(' ')}
							onClick={(ev) =>
								deleteTestSeries(data.pk, data.fields.title, () => {
									//pasing a function to run when delete is successfull
									props.deleteTestSeries(index);
									updateActive(-1);
								})}
						>
							delete
						</button>
					</div>
				) : (
					''
				)}
			</div>
		);
	});

	return (
		<React.Fragment>
			<h1 className={[ 'pl-4 text-dark mt-4 ml-4', styles.heading ].join(' ')}>
				Test Series
				<button
					onClick={newTestSeries}
					className={[ 'material-icons m-2 p-0 text-success mr-4 pr-4', styles.addBtn ].join(' ')}
				>
					add
				</button>
			</h1>
			<hr className="ml-3" />
			<div className={[ 'ml-2 pr-2 form-control', styles.testsCont ].join(' ')}>{testSeries}</div>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		testSeries: state.TestSeries
	};
};

const mapDispatchFromProps = (dispatch) => {
	return {
		deleteTestSeries: (index) => dispatch(dt(index))
	};
};

export default connect(mapStateToProps, mapDispatchFromProps)(Tests);
