import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CardSection, Input, Button } from '../common';
import { connect } from 'react-redux';
import { patientUpdate } from '../../actions'
import RadioForm from 'react-native-simple-radio-button';
// import ImagePicker from 'react-native-image-picker'
// import DatePicker from 'react-native-datepicker'

var radio_props = [
    {label: 'Femme ', value: 'femme' },
    {label: 'Homme', value: 'homme' }
  ];

class PatientForm extends Component {
    // constructor(props){
    //     super(props)
    //     this._avatarClicked = this._avatarClicked.bind(this)
    // }

    // _avatarClicked = async () => {
    //     ImagePicker.showImagePicker({}, (response) => {
    //         if (response.didCancel) {
    //             console.log('L utilisateur a annulé')
    //         }
    //         else if(response.error){
    //             console.log('Erreur : ', response.error)
    //         }
    //         else{
    //             // console.log('Photo : ', response.uri)
    //             let value = { uri: response.uri }
    //             this.props.patientUpdate({ prop: 'avatar', value })
    //         }
    //     })
    // }


    render(){
        var initial
        if(this.props.gendre === "femme"){
            initial = 0;
        }else{
            initial = 1;
        }
        return(
            <View>
				<CardSection>
						<Input
							label="Nom et Prenom"
                            placeholder="Nom et Prenom"
                            value={this.props.name}
                            onChangeText={value => this.props.patientUpdate({ prop: 'name', value })}
						/>
				</CardSection>

                <CardSection>
					<Input
						label="Carte National"
                        placeholder="BE000000"
                        value={this.props.nCarte}
                        onChangeText={value => this.props.patientUpdate({ prop: 'nCarte', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
                        label="Telephone"
                        keyboardType="numeric"
                        placeholder="06-00-00-00-00"
                        value={this.props.phone}
                        onChangeText={(value) => this.props.patientUpdate({ prop: 'phone', value })}
					/>
				</CardSection>

                <CardSection>
					<Input
						label="email"
                        placeholder="email@email.com"
                        value={this.props.email}
                        onChangeText={value => this.props.patientUpdate({ prop: 'email', value })}
					/>
				</CardSection>

                <CardSection>
					<Input
						label="Maladie"
                        placeholder="Maladie"
                        value={this.props.maladie}
                        onChangeText={value => this.props.patientUpdate({ prop: 'maladie', value })}
					/>
				</CardSection>

                <CardSection style={{ flexDirection: 'row' }}>
					<Text style={styles.labelStyle}>
                        Gendre
					</Text>
					<RadioForm
                        radio_props={radio_props}
                        initial={initial}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        styles={styles.inputStyle}
                        onPress={(value) => this.props.patientUpdate({ prop: 'gendre', value })}
                    />
				</CardSection>

                {/* <CardSection>
                    <Text style={styles.labelStyle}>
                        Image de Patient
					</Text>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={this._avatarClicked}
                    >
                        <Image style={styles.avatar} source={this.props.avatar}/>
                    </TouchableOpacity>
                    {/* <Button onPress={this._avatarClicked}>
                        Choisir une image...
                    </Button>
                </CardSection> */}
			</View>
        )
    }
}

const mapStateToProps = (state) => {
	const { name, nCarte, phone, maladie, date, email, gendre, favorite } = state.patientForm;

	return { name, nCarte, phone, maladie, date, email, gendre, favorite };
};

const styles = {
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
        flex: 2,
        width: 350 - 30
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
    },
    touchableOpacity: {
        margin: 5,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
}

export default connect(mapStateToProps, {patientUpdate})(PatientForm);