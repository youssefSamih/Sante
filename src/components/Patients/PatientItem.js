import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import FadIn from '../../Animations/FadeIn'
import EnlargeShrink from '../../Animations/EnlargeShrink'
import { connect } from 'react-redux';
import { patientEdited } from '../../actions'
// import { CardSection, Button } from '../common'

class PatientItem extends React.Component {
    _renderImage(gendre){
        let src;
        if(gendre === 'homme'){
            src = require('../../images/avatar_patient_homme.jpg')
        } else{
            src = require('../../images/avatar_patient_femme.jpg')
        }
        return(
            <Image
                style={styles.image}
                source={src}
            />
        )
    }
    onButtonPress() {
        // const { uid } = this.props.patient
        if(this.props.patient.favorite === true || this.props.patient.favorite === undefined || this.props.patient.favorite === ''){
            this.props.patient.favorite = false
        }else{
            this.props.patient.favorite = true
        }
        const { name, nCarte, phone, maladie, date, email, gendre, favorite, uid } = this.props.patient
        // const dat = this.state.date

        this.props.patientEdited({ name, nCarte, phone, maladie, date, email, gendre, uid, favorite });
        // console.log(this.props.patient)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../../images/ic_favorite_border.png')
        var shouldEnlarge = false
        if (this.props.patient.favorite) {
          sourceImage = require('../../images/ic_favorite.png')
          shouldEnlarge = true
        }
        return (
            <TouchableOpacity
                style={styles.favorite_container}
                onPress={this.onButtonPress.bind(this)}
            >
                <EnlargeShrink
                    shouldEnlarge={shouldEnlarge}>
                    <Image
                        style={styles.favorite_image}
                        source={sourceImage}
                    />
                </EnlargeShrink>
            </TouchableOpacity>
        )
      }
    render() {
        const { patient, editPatientDetail } = this.props
        return (
            <FadIn>
                <TouchableOpacity onPress={() => editPatientDetail(patient)} style={styles.main_container}>
                    {this._renderImage(patient.gendre)}
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{patient.name}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>Carte national : {patient.nCarte}</Text>
                            <Text style={styles.description_text} numberOfLines={6}>Maladie : {patient.maladie}</Text>
                            <View style={styles.button_style}>
                                {this._displayFavoriteImage()}
                            </View>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Ajoute le {patient.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row',
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image:{
        flex: 1,
        width: null,
        height: null,
        marginRight: 5
    },
    button_style:{
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
        position: 'relative',
        marginRight: 1,
        marginTop: 5
    },
    favorite_container: {
        alignItems: 'center',
      },
  })
const mapStateToProps = (state) => {
	const { name, nCarte, phone, maladie, date, email, gendre, favorite } = state.patientForm;

	return { name, nCarte, phone, maladie, date, email, gendre, favorite };
};

export default connect(mapStateToProps, {patientEdited})(PatientItem);