import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBand } from '../actions/index';
import { bindActionsCreators } from 'redux';



class BandList extends Component{
	renderList(){
		return this.props.bands.map((bands) => {
			return (
				<li key={bands.name} className="list-group-item">{bands.name}</li>
				);
			});		
		}

	render(){
		return(
			<ul className="list-group col-sm-4">
			{this.renderList()}
			</ul>
		);
	}
}

// takes app state as arg.
// whatever gets returned will show up as props inside of band list

function mapStateToProps(state){
	return{
		bands: state.bands
	};
}


//All things returned from this function will end up as props on the BandList Container
//We need this so we can call the selectBand function above through this.props.selectBand
// That will start the action >> reducer >> state change process

function mapDispatchToProps(dispatch){
	// Whenever selectBand is called, this will pass the result to ALL of our reducers
	return bindActionsCreators({ selectBand: selectBand }, dispatch);
	
}

//export
export default connect(mapStateToProps)(BandList);