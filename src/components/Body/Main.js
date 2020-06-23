import React, { Component } from 'react';
import styles from './css/Main.module.css';
import TestSeries from './TestSeries.js';

import { connect } from 'react-redux';
import { updateMaterial } from '../../redux/actions/TestSeries.js';

class Main extends Component {
	//Fetching Dashboard data
	componentDidMount = () => {
		fetch(window.base + '/material/api/instructor-portal/testSeries/', { credentials: window.cred })
			.then((response) => response.json())
			.then((data) => this.props.updateMaterial(data))
			.catch((error) => alert(error));
	};

	render() {
		return (
			<div id={styles.main}>
				<TestSeries />
			</div>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
	return {
		updateMaterial: (data) => dispatch(updateMaterial(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
