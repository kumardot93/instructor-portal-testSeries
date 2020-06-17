import React, { Component } from 'react';
import styles from './css/Main.module.css';
import Sidebar from './Sidebar.js';
import Courses from './Courses';
import Blogs from './Blogs.js';
import Tests from './Tests.js';

import { connect } from 'react-redux';
import { updateMaterial } from './../../redux/actions/Material.js';

class Main extends Component {
	//Fetching Dashboard data
	componentDidMount = () => {
		fetch(window.base + '/material/api/instructor-dashboard-data/', { credentials: window.cred })
			.then((response) => response.json())
			.then((data) => this.props.updateMaterial(data))
			.catch((error) => alert(error));
	};

	render() {
		return (
			<div id={styles.main}>
				<div className="d-flex p-2 align-items-center justify-content" id={styles.cont}>
					<Courses />
					<Tests />
					<Blogs />
					<Sidebar />
				</div>
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
