import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './UserProfileStyles'; // Importez les styles du fichier UserProfileStyles.js

const UserProfileCard = ({ login, onLogout }) => (
  <View style={styles.container}>
    <View style={styles.profileContainer}>
      <View style={styles.profileImage}>
        <Image
          style={styles.image}
          source={require('../../../image2/profil.jpg')}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {login.charAt(0).toUpperCase() + login.substring(1).toLowerCase()}
        </Text>
        <Text style={styles.companyName}>
          NOM SOCIETE
        </Text>
      </View>
      <TouchableOpacity
        onPress={onLogout}
        style={styles.logoutButton}
      >
        <View>
          <Icon name="log-out-outline" size={20} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default UserProfileCard;
