import React, { useState } from 'react';
import m from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLog } from './../../actions/logActions';
import TechSelectOptions from './../techs/TechSelectOptions';

const AddLogModel = ({ addLog }) => {
	const [ fields, setFields ] = useState({
		message: '',
		tech: '',
		attention: ''
	});
	const handleChange = (e) => {
		if (e.target.type === 'checkbox') {
			const { attention } = fields;
			return setFields({ ...fields, [e.target.name]: !attention });
		}
		setFields({ ...fields, [e.target.name]: e.target.value });
	};
	const onsubmit = () => {
		//handle submit
		if (fields.message === '' || fields.tech === '') {
			m.toast({ html: 'Please enter a message and tech' });
		} else {
			const newLog = { ...fields, date: new Date() };
			addLog(newLog);
			m.toast({ html: `Log Added by ${fields.tech} ` });
			setFields({
				message: '',
				tech: '',
				attention: ''
			});
		}
	};
	return (
		<div id="add-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Enter System Log</h4>
				<div className="row">
					<div className="input-field">
						<input type="text" name="message" value={fields.message} onChange={handleChange} />
						<label className="active" htmlFor="message">
							Log Message
						</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<select name="tech" value={fields.tech} className="browser-default" onChange={handleChange}>
							<option value="" disabled>
								Select Technician
							</option>
							<TechSelectOptions />
						</select>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<p>
							<label>
								<input
									type="checkbox"
									name="attention"
									className="filled-in"
									checked={fields.attention}
									value={fields.attention}
									onChange={handleChange}
								/>
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a href="#!" onClick={onsubmit} className="modal-close waves-effect waves-light blue btn">
					{' '}
					Enter
				</a>
			</div>
		</div>
	);
};

AddLogModel.propTypes = {
	addLog: PropTypes.func.isRequired
};

const modalStyle = {
	width: '75%',
	height: '75%'
};

export default connect(null, { addLog })(AddLogModel);
