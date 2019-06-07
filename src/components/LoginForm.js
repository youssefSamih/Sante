import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar, TextInput, SafeAreaView, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Spinner } from './common'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';


class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            margTop: 230
        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onButtonPress = this.onButtonPress.bind(this)
        this._renderButton = this._renderButton.bind(this)
        this.renderError = this.renderError.bind(this)
    }

    onEmailChange(text) {
		this.props.emailChanged(text);
    }

    onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow () {
        this.setState({ margTop: 8 });
    }

    _keyboardDidHide () {
        this.setState({ margTop: 230 });
    }

    onButtonPress() {
        const { email, password } = this.props;
        const navigate = this.props.navigation;

        this.props.loginUser({ email, password, navigate });
        // navigate.navigate("Dashboard");
        // console.log(navigate)
    }
    
    renderError() {
		if (this.props.error) {
			return (
				<View>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}else{
            return(
                <Text style={ styles.title }>Informations de Compte</Text>
            )
        }
	}

    _renderButton(){
        if (this.props.loading) {
			return (
                <TouchableOpacity style={ styles.buttonContainer }>
                    <Spinner size="large"/>
                </TouchableOpacity>
            )
        }
        return (
			<TouchableOpacity style={ styles.buttonContainer } onPress={this.onButtonPress.bind(this)}>
                <Text style={ styles.buttonText }>SIGN IN</Text>
            </TouchableOpacity>
		)
    }

    render() {
        return (
            <SafeAreaView style={ styles.container }>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-170} behavior={"padding"} contentContainerStyle = {{marginTop:'500',}}>
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} >
                        <View style={ styles.logoContainer }>
                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, marginTop: this.state.margTop }}>
                                <Image style={ styles.logo } source={ require('../images/doctor.png') }>
                                </Image>
                                {this.renderError()}
                            </View>
                            <View style={ styles.infoContainer }>
                                <TextInput 
                                style={ styles.input } 
                                placeholder="Entrez votre nom d'utilisateur / email" 
                                placeholderTextColor="#5D5D5D" keyboardType="email-address" 
                                returnKeyType="next" 
                                autoCorrect={false} 
                                onChangeText={this.onEmailChange.bind(this)}
                                onSubmitEditing={() => this.refs.txtPassword.focus() }/>

                                <TextInput 
                                style={ styles.input } 
                                placeholder="Entrer le mot de passe" 
                                placeholderTextColor="#5D5D5D" 
                                returnKeyType="go" 
                                autoCorrect={false} 
                                secureTextEntry 
                                onChangeText={this.onPasswordChange.bind(this)}
                                onSubmitEditing={this.onButtonPress.bind(this) }
                                ref={"txtPassword"}/>

                                {this._renderButton()}

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fad24d',
        flexDirection: 'column'
    },
    contKey: {
        flex: 2,
        backgroundColor: '#fad24d',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 128,
        height: 98,
    },
    title: {
        color: 'rgb(32, 53, 70)',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#000',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    buttonContainer: {
        backgroundColor: 'rgb(32, 53, 70)',
        paddingVertical: 15
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    errorTextStyle: {
        fontSize: 20,
		alignSelf: 'center',
		color: 'red'
    }
})

const mapStateToProps = state => {
	const { email, password, error, loading } = state.AuthReducer;
    return { 
        email, password, error, loading
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)