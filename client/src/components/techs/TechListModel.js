import React, { useEffect } from 'react';
import TechItem from './TechItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from './../../actions/techAction';

const TechListModal = ({ tech: techState, getTechs }) => {
	useEffect(
		() => {
			getTechs();
		},
		[ getTechs ]
	);
	const { loading, techs } = techState;
	return (
		<div id="tech-list-modal" className="modal">
			<div className="modal-content">
				<h4>Technician list</h4>
				<ul className="collection">
					{!loading && techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
				</ul>
			</div>
		</div>
	);
};

TechListModal.propTypes = {
	tech: PropTypes.object.isRequired,
	getTechs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
