import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTech } from './../../actions/techAction';
import m from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech }) => {
	const onDelete = () => {
		deleteTech(tech.id);
		m.toast({ html: 'Technician deleted' });
	};
	return (
		<li className="collection-item">
			<div>
				{tech.lastName} {tech.firstName}
				<a onClick={onDelete} href="#!" className="secondary-content">
					<i className="material-icons gray">delete</i>
				</a>
			</div>
		</li>
	);
};

TechItem.propTypes = {
	tech: PropTypes.object.isRequired,
	deleteTech: PropTypes.func.isRequired
};

export default connect(null, { deleteTech })(TechItem);
