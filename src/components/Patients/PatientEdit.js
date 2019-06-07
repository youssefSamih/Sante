import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Linking } from 'react-native'
import { connect } from 'react-redux';
import { patientUpdate, patientDelete, patientEdited } from '../../actions'
import { Card, CardSection, Button, Confirm } from '../common';
import PatientForm from './PatientForm';
import AntD from 'react-native-vector-icons/AntDesign'
import Ent from 'react-native-vector-icons/Entypo'
import Evil from 'react-native-vector-icons/EvilIcons'
import Communications from 'react-native-communications';
import email from 'react-native-email';

var showError = false;
class patientEdit extends Component {
    // state = { showModal: false }
    constructor(props){
        super(props)
        this.state = ({ 
            showModal: false,
            patient: []
        })
    }

    componentWillMount() {
		_.each(this.props.navigation.state.params.patient, (value, prop) => {
			this.props.patientUpdate({ prop, value });
        });
        // console.log(this.props.navigation.state.params.patient)
    }
    
    _renderText(showError){
        if(showError){
            showError = false
            return(
                <View>
					<Text style={styles.errorTextStyle}>
                        S'il vous plait remplir tous les champs obligatoire !
					</Text>
				</View>
            )
        }
    }

    onAccept() {
        const { uid } = this.props.navigation.state.params.patient;
        const navigate = this.props.navigation

		this.props.patientDelete({ uid, navigate });
	}

	onDecline() {
		this.setState({ showModal: false });
    }
    
    onTextPress() {
		const { phone, date } = this.props.navigation.state.params.patient;

		Communications.text(phone, `S'il vous plaît ne pas oublier votre rendez-vous a ${date} et merci ( Dr Boumdi Zineb)`);
    }

    onEmailPress() {
        const { date } = this.props.navigation.state.params.patient;
        const emailit = this.props.navigation.state.params.patient.email;
        const subject = 'rendez-vous avec docteur'
        const body = `S'il vous plaît ne pas oublier votre rendez-vous a ${date} et merci ( Dr Boumdi Zineb )`
        // Communications.text(phone, `S'il vous plaît ne pas oublier votre rendez-vous a ${date} et merci ( Dr Boumdi Zineb)`);
        // Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`)
        const to = [emailit]
        email(to, {
            subject: subject,
            body: body
        }).catch(console.error)
    }
    
    _checkInput(add){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let ph = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/
        if(this.props.name === '' || this.props.nCarte === '' || this.props.phone === '' || this.props.maladie === '' || this.props.email === undefined || ph.test(this.props.phone) === false || re.test(this.props.email) === false){
            showError = true
        }
        else if(add){
            const { name, nCarte, phone, maladie, date, email, gendre, favorite } = this.state.patient
            var navigate = this.props.navigation
            this.props.patientEdited({ name, nCarte, phone, maladie, date, email, gendre, favorite, uid :  this.props.navigation.state.params.patient.uid, navigate });
            // console.log({ name, nCarte, phone, maladie, date, email, gendre, favorite, uid: this.props.navigation.state.params.patient.uid });
        }else{
            showError = false;
        }
    }

    componentWillReceiveProps(nextProps) {
        this._checkInput(false)
        this.setState({ patient: nextProps })
        // console.log(nextProps)
    }
    
    onButtonPress() {
        this._checkInput(true)
    }
    
    render() {
		return (
            <ScrollView>
                <Card>
                    <PatientForm />
                        <CardSection>
                            {this._renderText(showError)}
                        </CardSection>
                    <CardSection>
                        
                        <Button onPress={this.onButtonPress.bind(this)}>
                            <AntD name="edit" size={30} />
                        </Button>

                        <Button onPress={this.onEmailPress.bind(this)}>
                            <Ent name="email" size={30} />
                        </Button>

                        <Button onPress={this.onTextPress.bind(this)}>
                            <Evil name="envelope" size={30} />
                        </Button>

                        <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                            <AntD name="delete" size={30} />
                        </Button>
                    </CardSection>

                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        Êtes-vous sûr de vouloir supprimer ceci?
                    </Confirm>
                </Card>
            </ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, nCarte, phone, maladie, date, email, gendre, favorite } = state.patientForm;

	return { name, nCarte, phone, maladie, date, email, gendre, favorite };
};
const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
		alignSelf: 'center',
		color: 'red'
    }
})

// export default PatientCreate
export default connect(mapStateToProps, {patientUpdate, patientDelete, patientEdited})(patientEdit);