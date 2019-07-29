import React, { useState, useEffect } from 'react';
import m from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLog } from './../../actions/logActions';

const EditLogModel = ({ current, updateLog }) => {
	const [ fields, setFields ] = useState({
		message: '',
		tech: '',
		attention: ''
	});
	useEffect(
		() => {
			if (current) {
				const { data, ...rest } = current;
				setFields(rest);
			}
		},
		[ current ]
	);
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
			const update = { ...fields, id: current.id, date: new Date() };
			updateLog(update);
			m.toast({ html: `Log Updated ${fields.tech}` });
			setFields({
				message: '',
				tech: '',
				attention: ''
			});
		}
	};
	return (
		<div id="edit-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Edit System Log</h4>
				<div className="row">
					<div className="input-field">
						<input type="text" name="message" value={fields.message} onChange={handleChange} />
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<select name="tech" value={fields.tech} className="browser-default" onChange={handleChange}>
							<option value="" disabled>
								Select Technician
							</option>
							<option value="John Doe">John Doe</option>
							<option value="Smith John">Smith John</option>
							<option value="Serah William">Serah williams</option>
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

EditLogModel.propTypes = {
	current: PropTypes.object,
	updateLog: PropTypes.func.isRequired
};

const mapStateToProp = (state) => ({
	current: state.log.current
});

const modalStyle = {
	width: '75%',
	height: '75%'
};

export default connect(mapStateToProp, { updateLog })(EditLogModel);
