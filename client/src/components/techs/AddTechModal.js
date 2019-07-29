import React, { useState } from 'react';
import m from 'materialize-css/dist/js/materialize.min.js';
import { addTech } from '../../actions/techAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddTechModel = ({ addTech }) => {
	const [ fields, setFields ] = useState({
		firstName: '',
		lastName: ''
	});
	const handleChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};
	const onsubmit = () => {
		//handle submit
		if (fields.firstName === '' || fields.lastName === '') {
			m.toast({ html: 'Please enter a First name and Last name' });
		} else {
			addTech(fields);
			m.toast({ html: 'New Tech Added' });
			setFields({
				firstName: '',
				lastName: ''
			});
		}
	};
	return (
		<div id="add-tech-modal" className="modal">
			<div className="modal-content">
				<h4>Add a new Technician</h4>
				<div className="row">
					<div className="input-field">
						<input type="text" name="firstName" value={fields.firstName} onChange={handleChange} />
						<label className="active" htmlFor="firstName">
							First Name
						</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<input type="text" name="lastName" value={fields.lastName} onChange={handleChange} />
						<label className="active" htmlFor="lastName">
							Last Name
						</label>
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

AddTechModel.propTypes = {
	addTech: PropTypes.func.isRequired
};

export default connect(null, { addTech })(AddTechModel);
