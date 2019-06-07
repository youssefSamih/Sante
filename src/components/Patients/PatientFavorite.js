import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import PatientList from './PatientList'
import { patientFetch } from '../../actions';

class PatientFavorite extends Component {
    constructor(props){
        super(props)
        this.state = {
            patient: []
         }
    }

    componentWillMount() {
        this.props.patientFetch()
    }
    
    render(){
        return(
            <View style={styles.container}>
                <PatientList
                    isfavoritePatient={(this.props.patient.findIndex(item => item.favorite !== false) > -1 ? true : false)}
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

	return { patient };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
});

export default connect(mapStateToProps, { patientFetch })(PatientFavorite)