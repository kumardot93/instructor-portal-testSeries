import React, { Component } from 'react';
import styles from './css/Main.module.css';
import Tests from './Tests.js';

import { connect } from 'react-redux';
import { updateMaterial } from '../../redux/actions/Tests.js';

class Main extends Component {
	//Fetching Dashboard data
	componentDidMount = () => {
		fetch(window.base + '/material/api/instructor-portal/test/', { credentials: window.cred })
			.then((response) => response.json())
			.then((data) => this.props.updateMaterial(data))
			.catch((error) => alert(error));
	};

	render() {
		return (
			<div id={styles.main}>
				<Tests />
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
