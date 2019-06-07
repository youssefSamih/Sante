import React, { Component } from 'react'
import _ from 'lodash';
import { View, Text, Picker, Dimensions } from 'react-native';
import { CardSection, ActivityIndicator } from '../common';
import { connect } from 'react-redux';
import { appointementUpdate } from '../../actions'
import DatePicker from 'react-native-datepicker'
import { patientFetch } from '../../actions'

var width = Dimensions.get('window').width - 25;

class AppointementForm extends Component {
    constructor(props){
        super(props)
        this.state = ({ 
            patient: []
        })
    }
    componentWillMount() {
        this.props.patientFetch()
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({ patient: nextProps.patient })
        // this._renderValuePicker.bind(this)
    }

    _renderValuePicker(){
        console.log(this.state.patient)
        return(
            this.state.patient.map(patient => {
                <Picker.Item label={patient.name} value={patient.uid} />
            })
        )
    }


    render(){
        if(this.state.patient.length < 0){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
        return(
            <View>
                <CardSection>
                        <Text style={styles.pickerTextStyle}>
                            Patient
                        </Text>
                </CardSection>
                <CardSection>
                    <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.props.uid}
                            onValueChange={(value) => this.props.appointementUpdate({ prop: 'uid', value })}
                            value={this.props.uid}
                        >
                            {this.state.patient.map(item => (
                                <Picker.Item label={item.name + ' ' + item.nCarte} value={item.uid} />
                            ))}
					</Picker>
                </CardSection>
                <CardSection>
                    <Text style={styles.pickerTextStyle}>
                        Rendez vous En :
					</Text>
                </CardSection>
				<CardSection>
                    <DatePicker
                        style={{ width:width, alignSelf: 'stretch', alignItems: 'center' }}
                        date={this.props.date}
                        mode="datetime"
                        placeholder="Select date"
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="Confirmer"
                        cancelBtnText="Annuler"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        }}
                        onDateChange={(value) => this.props.appointementUpdate({ prop: 'date', value })}
                    />
				</CardSection>
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

const styles = {
	pickerTextStyle: {
		fontSize: 18,
		paddingLeft: 20
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
}

export default connect(mapStateToProps, {appointementUpdate, patientFetch})(AppointementForm);