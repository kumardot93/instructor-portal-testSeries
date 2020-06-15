import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Main.module.css';
import sty from './css/Tests.module.css';
import OverlayForm from './OverlayForm.js';
import OverlayDeleteTest from './OverlayDeleteForm.js';
import OverlayTestResponses from './OverlayTestResults.js';

import { connect } from 'react-redux';
import { deleteTest as dt } from './../../redux/actions/Material.js';

function newTest(event) {
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
	let el = document.getElementById('overlay');
	el.style.display = 'block';
	ReactDOM.render(<OverlayTestResponses pk={pk} />, el);
}

function deleteTest(pk, test, delMethod) {
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
							<button
								className={[ 'float-left', sty.assBtn ].join(' ')}
								onClick={(ev) => TestResponses(data.pk)}
							>
								<i className="material-icons">assignment</i>
								<span className="ml-2">{data.attempts}</span>
							</button>

							<a
								href={window.base + '/material/create-test/' + data.pk}
								className={[ 'material-icons btn p-1', sty.editBtn ].join(' ')}
							>
								edit
							</a>
							<button
								className={[ 'material-icons btn p-1', sty.deleteBtn ].join(' ')}
								onClick={(ev) =>
									deleteTest(data.pk, data.fields.title, () => {
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
	}
	return (
		<div className={[ 'bg-light m-2 mr-3 mb-4', styles.boxes ].join(' ')}>
			<h1 className={[ 'pl-4 bg-dark text-light', styles.heading ].join(' ')}>
				Tests
				<button onClick={newTest} className={[ 'material-icons m-2 p-0', styles.addBtn ].join(' ')}>
					add
				</button>
			</h1>
			<div className={[ 'pl-2 pr-2', sty.testsCont ].join(' ')}>{tests}</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		tests: state.Material.tests
	};
};

const mapDispatchFromProps = (dispatch) => {
	return {
		deleteTest: (index) => dispatch(dt(index))
	};
};

export default connect(mapStateToProps, mapDispatchFromProps)(Tests);
