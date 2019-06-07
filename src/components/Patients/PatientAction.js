import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import PatientList from './PatientList'
import { patientFetch } from '../../actions';

class PatientActions extends Component {
    componentWillMount() {
        this.props.patientFetch()
        // this.props.navigation.goBack()
	}
    
    render(){
        console.log(this.props.patient)
        return(
            <View style={styles.container}>
                <PatientList 
                    patient={this.props.patient}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    const patient = _.map(state.patient, (val, uid) => {
		return { ...val, uid };
    });
    // console.log(state)

	return { patient };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
});

export default connect(mapStateToProps, { patientFetch })(PatientActions)