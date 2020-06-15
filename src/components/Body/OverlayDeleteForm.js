import React, { Component } from 'react';
import CloseOverlay from './../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

import { connect } from 'react-redux';

class OverlayDeleteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			success: 0,
			spinner: 'spinner-grow',
			btnSpinner: ''
		};
	}
	componentDidMount = () => {
		fetch(this.props.url, { credentials: window.cred }).then((response) => response.text()).then((data) => {
			this.setState((state, props) => {
				return { data: data, spinner: '' };
			});
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.setState({ btnSpinner: 'spinner-border spinner-border-sm' });
		fetch(this.props.url, {
			method: 'POST',
			credentials: window.cred
		})
			.then((response) => response.text())
			.then((data) => {
				if (data.indexOf('success') != -1) {
					this.setState((state, props) => {
						return {
							data: data,
							success: 1
						};
					});
					this.props.delete();
				} else {
					this.setState((state, props) => {
						return {
							data: data
						};
					});
				}
			});
	};

	render() {
		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(event, styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				{this.state.spinner == '' ? (
					<React.Fragment>
						<h1 className="text-center mb-2">{this.props.title}</h1>
						<h2>{this.props.data}</h2>
						<h1 className="form-control alert-danger p-2" style={{ height: 'auto' }}>
							{this.state.data}
						</h1>
						{this.state.success == 0 ? (
							<button
								style={{ marginTop: '10px' }}
								className="btn btn-primary"
								id={styles.submit}
								type="submit"
								disabled={this.state.btnSpinner != ''}
								onClick={this.submitHandler}
							>
								Delete
								<span className={this.state.btnSpinner} style={{ marginLeft: '6px' }} />
							</button>
						) : (
							''
						)}
					</React.Fragment>
				) : (
					<div id={styles.spinnerCont} className="text-dark">
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
					</div>
				)}
			</div>
		);
	}
}

export default OverlayDeleteForm;
