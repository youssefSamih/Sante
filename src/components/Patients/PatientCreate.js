import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux';
import { patientUpdate, patientCreate } from '../../actions'
import { Card, CardSection, Button } from '../common';
import PatientForm from './PatientForm';

var showError = false;
class PatientCreate extends Component {
    _renderText(){
        if(showError){
            // showError = false
            return(
                <View>
					<Text style={styles.errorTextStyle}>
                        S'il vous plait remplir tous les champs obligatoire !
					</Text>
				</View>
            )
        }
    }

    _checkInput(add){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let ph = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/
        if(this.props.name === '' || this.props.nCarte === '' || this.props.phone === '' || this.props.maladie === '' || this.props.email === undefined || ph.test(this.props.phone) === false || re.test(this.props.email) === false){
            showError = true
            console.log(ph.test(this.props.phone))
            console.log(ph.test(this.props.email))
        }
        else if(add){
            const { name, nCarte, phone, maladie, date, email, gendre, favorite } = this.props;
            var navigate = this.props.navigation
            this.props.patientCreate({ name, nCarte, phone, maladie, date, email, gendre, favorite, navigate });
        }else{
            showError = false;
        }
    }
    componentWillReceiveProps(nextProps) {
        this._checkInput(false)
        console.log(nextProps);
    }
    
    onButtonPress() {
        this._checkInput(true)
    }
    
    render() {
		return (
            <ScrollView>
                <Card>
                    <PatientForm {...this.props} />
                        <CardSection>
                            {this._renderText(showError)}
                        </CardSection>
                    <CardSection>
                        
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Ajouter
                        </Button>
                    </CardSection>
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
export default connect(mapStateToProps, {patientUpdate, patientCreate})(PatientCreate);