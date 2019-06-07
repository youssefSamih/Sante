import React from 'react'
import _ from 'lodash';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import FadIn from '../../Animations/FadeIn'
import { Button, Confirm } from '../common'
import { appointementDelete } from '../../actions'
import { connect } from 'react-redux';

class AppointementItem extends React.Component {
    constructor(props){
        super(props)
        this.state = ({
            showModal: false,
        })
    }
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

    onAccept() {
        const { uid } = this.props.patient
        // const appointement = _.map(patient.appointement, (val, uid) => {
        //     return { ...val, uid };
        // });
        // const { uid } = appointement;
        const navigate = this.props.navigation

		this.props.appointementDelete({ uid, navigate });
	}

	onDecline() {
		this.setState({ showModal: false });
    }

    render() {
        const { patient } = this.props
        const appointement = _.map(patient.appointement, (val, uid) => {
            return { ...val, uid };
        });

        var dateApp = ""
        appointement.map(item => {
            dateApp = item.date
        })
        // console.log(appointement)
        return (
            <FadIn>
                <TouchableOpacity style={styles.main_container}>
                    {this._renderImage(patient.gendre)}
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{patient.name}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text}>Carte national : {patient.nCarte}</Text>
                            <Text style={styles.description_text} numberOfLines={6}>Maladie : {patient.maladie}
                            </Text>
                            <View style={styles.button_style}>
                                <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                                    Supprimer
                                </Button>
                            </View>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Rendez-vous a : {dateApp}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Êtes-vous sûr de vouloir supprimer ceci?
                </Confirm>
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
// export default AppointementItem;
export default connect(mapStateToProps, {appointementDelete})(AppointementItem);