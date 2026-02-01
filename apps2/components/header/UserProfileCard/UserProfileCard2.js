import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './UserProfileStyles';
import { connect } from 'react-redux';
import { removeUser } from '../../../actions/user';
import Svg, { Path } from 'react-native-svg';
import IncidentFormModal from '../../modals/IncidentFormModal'; // chemin vers ton modal
import Icon from 'react-native-vector-icons/FontAwesome';
const UserProfileCard2 = ({ userInfo, login, removeUser, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // Contrôle du modal

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.logoImage2}>
          <Image
            style={styles.imageMYOEDB}
            source={require('../../../image/logo-myoedb-04.png')}
          />
        </View>

        <View style={styles.profileImage}>
          <Image
            style={styles.image}
            source={require('../../../image2/profil.jpg')}
          />
        </View>

        <Text style={styles.loginInfo}>{login}</Text>

        {/* Bouton pour ouvrir le modal */}
        <TouchableOpacity
          onPress={() => 
            // setModalVisible(true)
            navigation.navigate('ChatScreen',{ id_stag: userInfo.id })
          }
            
          style={styles.incidentButton}
        >
          <Icon name="life-ring" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Bouton Logout */}
        <TouchableOpacity
            onPress={() => {
              // Appelle removeUser() pour effacer les informations utilisateur de Redux
              removeUser();

              // Utilise setTimeout pour attendre un court délai avant de naviguer
              setTimeout(() => {
                // Navigue vers l'écran de Login après la déconnexion
                navigation.navigate('Login');
              }, 300);  // Attendre 300ms avant de naviguer (ajuste si nécessaire)
            }}
          style={styles.logoutButton1}
        >
          <View>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0,0,0,1)' }}>
              <Path d="M16 13v-2H7V8l-5 4 5 4v-3z" fill="#FFF" />
              <Path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" fill="#FFF" />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal pour signaler un incident */}
      <IncidentFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        userInfo={userInfo} // <-- on passe tout l'objet
      />

    </View>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileCard2);
