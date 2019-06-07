import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PatientList from './PatientList'
import { patientFetch } from '../../actions';
import _ from 'lodash';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['name', 'nCarte'];

class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
      }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    componentWillMount() {
        this.props.patientFetch()
    }

    render(){
        const filteredPatient = this.props.patient.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={styles.container}>
                <SearchInput 
                    onChangeText={(term) => { this.searchUpdated(term) }} 
                    style={styles.searchInput}
                    placeholder="Nom ou n° Carte National du Patient"
                />
                <View style={styles.container}>
                    <PatientList
                        patient={filteredPatient}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 0
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginTop:0
    },
    buttonStyle: {
        backgroundColor: 'royalblue',
        paddingVertical: 10,
        marginLeft: 5,
        marginRight: 5,
        top: 5,
        bottom: 0,
      },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    searchInput:{
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    }
});

const mapStateToProps = state => {
    const patient = _.map(state.patient, (val, uid) => {
		return { ...val, uid };
    });

	return { patient };
}

export default connect(mapStateToProps, { patientFetch })(Patients)