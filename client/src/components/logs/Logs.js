import React, { useEffect, Fragment } from 'react';
import LogItem from './LogItem';
import PreLoader from './../layouts/PreLoader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs } from './../../actions/logActions';
const Logs = ({ getLogs, log: logState }) => {
	const { loading, logs } = logState;
	useEffect(
		() => {
			getLogs();
		},
		[ getLogs ]
	);
	return (
		<Fragment>
			{loading ? (
				<PreLoader />
			) : (
				<ul className="collection with-header">
					<li className="collection-header">
						<h4 className="center">System Logs</h4>
					</li>
					{!loading && !Object.values(logs).length > 0 ? (
						<p className="center">No Logs to show</p>
					) : (
						logs.map((log) => <LogItem log={log} key={log.id} />)
					)}
				</ul>
			)}
		</Fragment>
	);
};
Logs.propType = {
	log: PropTypes.object.isRequired,
	getLog: PropTypes.func.isRequired
};

const mapStateToProp = (state) => ({
	log: state.log
});

export default connect(mapStateToProp, { getLogs })(Logs);
