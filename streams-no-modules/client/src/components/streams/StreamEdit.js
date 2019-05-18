import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		this.props.editStream(this.props.match.params.id, formValues);
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h3>Edit a Stream</h3>
				{/* this.props.stream is an object with properties
				// named 'title' and 'description'
				// Because we want to match StreamForm's render 
				// method's <Field> names 
				// initialValues is a special Redux Form var */}
				<StreamForm 
				 initialValues={_.pick(this.props.stream, 'title', 'description')} 
				 onSubmit={this.onSubmit} 
				 />
			</div>
		);
	}
}

// ownProps refers to the props object that appears
// up in our StreamEdit component
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);