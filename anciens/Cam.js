import React, { useEffect, useState, useRef } from 'react';
import {Platform , View, Text, StyleSheet, TouchableOpacity,Image, Modal, FlatList, TextInput } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { request,check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video'; 
import RNFS from 'react-native-fs'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'; 
import { getVideo } from './apps2/actions/videos';
import { getImages } from './apps2/actions/images';
import config from './config.json';
import Spinner from 'react-native-spinkit';
import { analyzeImage } from './apps2/utils/request';
import TextModals from './apps2/components/modals/TextModals';
import ImageTextModal from './apps2/components/modals/ImageTextModal';
import axios from 'axios';
import * as Progress from 'react-native-progress';

import Geolocation from '@react-native-community/geolocation';

const base_url = config.base_url;
const base_grp_url = config.base_grp_url;

function Cam({  route, navigation, category, getVideo, getImages  }) {
  const [location, setLocation] = useState(null); // Stocker la localisation
  const [address, setAddress] = useState(''); // Stocker l'adresse après géocodage inversé
  const [watchId, setWatchId] = useState(null); 

  const [cameraPermission, setCameraPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [path, setPath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(false);
  const [progress, setProgress] = useState(0); 
  
  const [showPreview, setShowPreview] = useState(false);
  const [cameraType, setCameraType] = useState('back'); 
  const [isPaused, setIsPaused] = useState(false); 
  const [sendvid, setSendvid] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal
  const [text, setText] = useState('');
  const [mot, setMot] = useState('');
  const [trad, setTrad] = useState('');
  const [targ_lang_id, setTarg_lang_id] = useState('');
  

  const [targTEXT, setTargTEXT] = useState('');
  const [title, setTitle] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [scaning, setScaning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const device = useCameraDevice(cameraType);
  const camera = useRef(null);

  // const dispatch = useDispatch(); 
  const { idlangue, id, PickerValueHolder, login1, nom1, prenom1, email1, tel1, adresse1, cp1, ville1, password1, id1, id_groupe, idecat, trand, userInfo } = route.params;
  const [infolangue, setInfolangue] = useState(PickerValueHolder);
  useEffect(() => {
    // Log the parameters to the console
    console.log('Parameters:', {
      idlangue,
      id,
      PickerValueHolder,
      login1,
      nom1,
      prenom1,
      email1,
      tel1,
      adresse1,
      cp1,
      ville1,
      password1,
      id1,
      id_groupe,
      idecat,
      trand,
      userInfo
    });
  }, [idlangue, id, PickerValueHolder, login1, nom1, prenom1, email1, tel1, adresse1, cp1, ville1, password1, id1, id_groupe, idecat, trand, userInfo]);
  
  useEffect(() => {
    // console.log(PickerValueHolder);
    const checkPermissions = async () => {
      try {
        const cameraStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    
        if (cameraStatus === RESULTS.GRANTED) {
          // Si la permission de la caméra est accordée, vérifier la version de l'API Android
          if (Platform.OS === 'android' && Platform.Version <= 33) {
            const storageStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            
            if (storageStatus === RESULTS.GRANTED) {
              setCameraPermission(true);
            } else {
              setCameraPermission(false);
            }
          } else {
            // Si la version est supérieure à 33, passer directement à l'étape suivante
            setCameraPermission(true);
          }
        } else {
          // Si la permission de la caméra n'est pas accordée, la demander
          const cameraRequestStatus = await request(PERMISSIONS.ANDROID.CAMERA);
          
          if (cameraRequestStatus === RESULTS.GRANTED) {
            // Refaire la vérification de la version API après avoir obtenu la permission de la caméra
            if (Platform.OS === 'android' && Platform.Version <= 33) {
              const storageStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
              
              if (storageStatus === RESULTS.GRANTED) {
                setCameraPermission(true);

              } else {
                setCameraPermission(false);
                navigation.navigate('Accueil');
              }
            } else {
              setCameraPermission(true);
            }
          } else {
            setCameraPermission(false);
            navigation.navigate('Accueil');
          }
        }








        const audioCheck = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (audioCheck !== RESULTS.GRANTED) {
          const audioRequestStatus = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
          if (audioRequestStatus !== RESULTS.GRANTED) {
            console.error("Permission pour enregistrer l'audio non accordée");
            navigation.navigate('Accueil');
          }
        }


        const locationStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (locationStatus !== RESULTS.GRANTED) {
          const locationRequestStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (locationRequestStatus !== RESULTS.GRANTED) {
            console.error("Permission de localisation non accordée");
            navigation.navigate('Accueil');
          }
        }


      } catch (error) {
        console.error('Erreur lors de la demande de permissions:', error);
        setCameraPermission(false);
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    console.log('Category:', category); // Log the category from Redux
  }, [category]);

   const requestLocationPermission = async () => {
    let permission;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.error('Permission refusée');
      }
    }
  };

  // Fonction pour récupérer la localisation actuelle
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(position.coords); // Mettre à jour la localisation
        // alert(longitude);
        reverseGeocode(latitude, longitude); // Appeler le géocodage inversé
        console.log('Position actuelle:', position);
      },
      (error) => {
        console.error('Erreur de localisation:', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      }
    );

    // Suivi de localisation en temps réel
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log('Position mise à jour:', position);
        setLocation(position.coords); // Mettre à jour la localisation
      },
      (error) => {
        console.error('Erreur de suivi de localisation:', error);
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 10, // Mise à jour toutes les 10m
        interval: 2000, // Intervalle de mise à jour de 2 secondes
      }
    );

    setWatchId(watchId); // Enregistrer l'ID du suivi
  };

  // Fonction pour géocoder les coordonnées en une adresse lisible
  const reverseGeocode = async (latitude, longitude) => {
    // alert(latitude);
    // alert(longitude);
    try {
      // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=66fb9bd676bd0210451686kgd1a2420`);
      const data = await response.json();
      const myadresse = `${data.address.suburb}, ${data.address.city}, ${data.address.country}`;
      // const myadresse = data.display_name;
      setAddress(myadresse); // Mettre à jour l'adresse
      // alert(myadresse); // Afficher l'adresse
    } catch (error) {
      console.error('Erreur de géocodage inversé:', error);
    }
  };

  // const categoryViewFilter = (id, intitule, index) => {
  //   // Replace this with your actual view logic for category items
  //   return (
  //     <View style={styles.categoryItem}>
  //       <Text style={{color:'black'}}>{intitule}</Text>
  //     </View>
  //   );
  // };

  const CategoryViewFilter = ({ id, intitule, index, selectedId, setSelectedId }) => {
    // Determine if the current item is selected
    const isSelected = id === selectedId;
  
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(id)}
      >
        <View
          style={[
            styles.categoryItem,
            {
              backgroundColor: isSelected ? '#FBF5FF' : '#0c123b',
              borderWidth: isSelected ? 0.4 : 0,
            }
          ]}
        >
          <View style={styles.categoryTextContainer}>
            <Text style={[styles.categoryText,{color: isSelected ? 'black' : 'white'}]}>
              {intitule}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Add logic to refresh data here
    // After refreshing, set refreshing to false
    setRefreshing(false);
  };

  if (cameraPermission === null) {
    return <Text>Vérification des autorisations de caméra...</Text>;
  } else if (!cameraPermission) {
    return <Text>Autorisation de caméra non accordée</Text>;
  }

  if (!device) {
    return <Text>Aucun appareil photo disponible</Text>;
  }

  const takePhoto = async () => {
    try {
      if (!camera.current) return;
      const photo = await camera.current.takePhoto();
      if (photo) {
        setCapturedMedia(`file://${photo.path}`);
        setPath(photo.path);
        setShowPreview(true);
       getCurrentLocation();
      }
    } catch (error) {
      console.error('Erreur lors de la capture de la photo:', error);
    }
  };

  const startRecording = async () => {
    try {
      if (!camera.current) return;
      await camera.current.startRecording({
        flash: 'off',
        fileType: 'mp4',
        onRecordingError: (error) => console.error('Erreur d\'enregistrement:', error),
        onRecordingFinished: (video) => {
          setCapturedMedia(`file://${video.path}`);
          setPath(`file://${video.path}`);
          setShowPreview(true);
        },
      });
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la vidéo:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!camera.current) return;
      const video = await camera.current.stopRecording();
      if (video && video.path) {
        setCapturedMedia(`file://${video.path}`);
        setShowPreview(true);
      }
      setIsRecording(false);
    } catch (error) {
      console.error('Erreur lors de l\'arrêt de l\'enregistrement vidéo:', error);
    }
  };

  const togglePauseResume = () => {
    if (isPaused) {
      camera.current.resumeRecording();
      setIsPaused(false);
    } else {
      camera.current.pauseRecording();
      setIsPaused(true);
    }
  };
  
  const toggleCameraType = () => {
    setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));
  };

  const handleConfirm = () => {
    setModalVisible(true);
  };
  const handleUpload = async () => {
    // alert("id:"+selectedId);
    // alert("title:"+title);
    // alert("path:"+path);
    try {
      await uploadImage();
      // const base64Image = await RNFS.readFile(capturedMedia, 'base64');
      // console.log('base64: ', base64Image);
      setCapturedMedia(null);
      setModalVisible(false);
      setIsPaused(false);
      setShowPreview(false);
      setTitle('');
      setSelectedId(null);
      setScanned(true);
      closeModal();
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  const uploadImage = async () => {
    // const {mot,targTEXT,path,idecat,infolangue}=this.state; 
    //PickerValueHolder infolangue
    const vrr= path.replace(/^.*(\\|\/|\:)/, '');
    const formData = new FormData();
    const ext=path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2);
    // alert(ext);
    setUploading(true);
    if (ext==='jpg'){
      setModalVisible(false);
      setIsPaused(false);
      setShowPreview(false);
      formData.append('multipart/form-data');
      formData.append('id_stag',id1);
      formData.append('idecat',selectedId);
      formData.append('mot',mot);
      formData.append('targTEXT',targTEXT);
      formData.append('text',title);
      formData.append('id_groupe',id_groupe);

      formData.append('infolangue',infolangue.substring(0, 2));
      formData.append('targetID',idlangue);
      formData.append('lieu',address);

      // alert(idlangue);

      // formData.append('multipart/form-data');
      // formData.append('id_stag',id);
      // formData.append('idecat',idecat);
      // formData.append('mot',this.state.googleVisionDetetion);
      // formData.append('targTEXT',targTEXT);
      // formData.append('text',text);
      // formData.append('id_groupe',this.state.id_groupe);
      // formData.append('infolangue',this.state.infolangue.substring(0, 2));
      // formData.append('targetID',this.state.targetID);
      // formData.append('lieu',address);
      formData.append('picture',{
        uri: capturedMedia,
        name: vrr,
        type: 'image/jpeg', 
      });
      console.log(JSON.stringify(formData));
      try {
        const urlimage = base_url + "/portail-stagiaire/upload_imageexp.php";
        console.log(urlimage);
        const response = await fetch(urlimage, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
        if(responseJson =='')
        {
          alert('no response');
          setUploading(false);
        }
        else{
          setUploading(false);
          setCapturedMedia(null);
          getImages(id1)
          .then(() => {
            alert('picture saved');
            console.log(responseJson);
          })
        }
      })
      } catch (err) {
        console.log(err)
      }
    }else{
      // // alert('id: '+id1);
      // // alert('pick'+PickerValueHolder);
      // // alert('mot'+ mot);
      // // alert('tar'+targTEXT);
      // // alert('title'+title);
      // alert('grp'+id_groupe);
      // // alert('selected'+selectedId);
      // alert('path'+path);
      setCapturedMedia(null);
      setModalVisible(false);
      setIsPaused(false);
      setShowPreview(false);
      // setTitle('');
      // setSelectedId(null);
      // setScanned(true);
      formData.append('id_stag',id1);
      formData.append('infolangue',PickerValueHolder);
      formData.append('mot',mot.toString());
      formData.append('targTEXT',targTEXT);
      formData.append('text',title);
      formData.append('id_groupe',id_groupe);
      formData.append('idecat',selectedId);
      formData.append('video',{
        uri: path,
        name: vrr,
        type: 'video/mp4',   
      });
      setUploading(true);
      try {
        const urlvideo = base_url + "/portail-stagiaire/upload_videoexp.php";
        await axios.post(urlvideo, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100; // Normaliser à une valeur entre 0 et 1
            setProgress(percentCompleted); // Mettre à jour l'état de la progression
          }
        });
      
        // Si l'envoi est réussi
        setUploading(false);
        getVideo(id1)
        .then(() => {
          alert('video saved');
          console.log(responseJson);
        })
        // alert('Your video is ready');
        navigation.navigate('Accueil');
        
      } catch (err) {
        console.log(err);
      }
      
    }
  }
  const handleScan = async () => {
    const base64Image = await RNFS.readFile(capturedMedia, 'base64');
    setScaning(true);
    const result =  await analyzeImage(base64Image);
    setScaning(false);
    setMot(result.text);
    setScanned(true);
    // alert("YOUR TEXT: "+result.text);
  }

  const closeModal = () =>{
    setScanned(false);
    // alert('close');
  }
  const save = () => {
    handleUpload();
  }
const updateText = (txt, traduction, titleImage, categ, targ_lang_id, newinfolangue ) =>{
  setMot(txt);
  setTargTEXT(traduction);
  setText(titleImage);
  setSelectedId(categ);
  setTarg_lang_id(targ_lang_id);
  setInfolangue(newinfolangue);
  // alert(newinfolangue);
  // console.log(targ_lang_id);
}
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
        video={true}
        audio={true}
      />
      
      {uploading ? (
        <View style={styles.progressBar}>
          <Progress.Bar progress={progress} width={250} color="#DC4F89" />
          {/* Affichez le pourcentage si nécessaire */}
          {/* <Text>{Math.round(progress * 100)}%</Text> */}
        </View>
      ) : null}

  
      
      {showPreview && capturedMedia ? (
        <View style={styles.previewContainer}>
          {capturedMedia.endsWith('.mp4') ? (
            <View style={{
              height:500,
              width:wp('100%')
              // width:500
            }}>
              <Video
                source={{ uri: capturedMedia }}
                style={styles.previewMedia}
                controls={true}
              />
              <View style={styles.previewButtonContainer}>
                <TouchableOpacity onPress={() => setCapturedMedia(null)} style={styles.previewButton}>
                  <Icon name="replay" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm} style={styles.previewButton}>
                  <Icon name="check" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: capturedMedia }}
                style={styles.previewImage}
              />
              {scaning?(<View style={styles.animationContainer}>
                <Spinner  color={'#C9A022'} size={50} type={'WanderingCubes'} />
              </View>):null}
              <View style={styles.previewButtonContainer}>
                <TouchableOpacity onPress={() => setCapturedMedia(null)} style={styles.previewButton}>
                  <Icon name="replay" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleScan} style={[styles.previewButton, {backgroundColor:'#48A2F1'}]}>
                  <Icon name="document-scanner" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Scan Text</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm} style={[styles.previewButton,{backgroundColor:'#192356'}]}>
                  <Icon name="check" size={30} color="#fff" />
                  <Text style={styles.buttonText}>Save Only</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Accueil')} style={styles.button}>
            <Icon name="home" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.button}>
            <Icon name={isRecording ? "stop" : "videocam"} size={30} color="#fff" />
          </TouchableOpacity>
          {isRecording && (
            <TouchableOpacity onPress={togglePauseResume} style={styles.button}>
              <Icon name={isPaused ? "play-arrow" : "pause"} size={30} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
            <Icon name="flip-camera-android" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Icon name="photo-camera" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Choose theme (facultatives)</Text>
            <View style={{ height: 50 }}>
              {/* eto ndray */}
              <FlatList
                data={category} // Access category directly from props
                extraData={category}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                horizontal={true}
                onRefresh={handleRefresh}
                numColumns={1}
                enableEmptySections={true}
                renderSeparator={() => <View style={styles.separator} />}
                renderItem={({ item, index }) => (
                  <View style={styles.categoryItemContainer}>
                    <CategoryViewFilter
                    id={item.id}
                    intitule={item.intitule}
                    index={index}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                  />
                  </View>
                )}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                multiline={true}
                value={title}
                placeholder="Title here"
                placeholderTextColor="#999999"
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.AllmodalButton}>

            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor:'grey'}]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, ]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleUpload()}
            >
              <Text style={styles.modalButtonText}>Upload</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ImageTextModal
        visible={scanned}
        mot={mot}
        infolangue = {PickerValueHolder}
        category={category}
        userInfo={userInfo}
        onClose={closeModal}
        updateText ={updateText}
        save={save}
        navigation={navigation}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading:{
    color:'white',
    backgroundColor:'transparent',
    position:'absolute',
    top:hp('80%'),
    alignSelf:'center',
    fontSize:18,

  },
  progressBar:{
    position:"absolute",
    bottom:wp('50%'),
    alignSelf:'center'

  },
  camera: {
    flex: 1,
  },
  animationContainer:{
    position:'absolute',
    top:hp('50%'),
    alignSelf:'center'
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMedia: {
    width: '100%',
    height: '100%',
  },
  previewImage: {
    width: wp('90%'),
    height:hp('90%'),
    marginBottom: 20,
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    alignSelf:'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: '800',
    fontSize:10
  },
  previewButton: {
    marginBottom: 100,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    borderWidth:2,
    borderColor:'white',
    borderRadius:15,
    backgroundColor:'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    color:'black'
  },
  modalButton: {
    // backgroundColor: '#2196F3',
    backgroundColor:'#EA1E69',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  AllmodalButton:{
    flexDirection:'row',
    // backgroundColor:'red',
    width:wp('60%'),
    justifyContent:'space-around'
  },
  categoryItem: {
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 5,
    borderColor: '#C9902A',
    padding: 8,
  },
  categoryTextContainer: {
    justifyContent: 'center',
  },
  categoryText: {
    marginHorizontal: wp('3%'),
    marginVertical: hp('0.5%'),
    fontWeight: '400',
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
  },
  textInputContainer: {
    width: wp('60%'),
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'white',
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    // textAlignVertical: 'top', // For multiline input
    color:'black'
  },
});

const mapStateToProps = (state) => ({
  category: state.categ.category, // Assuming your state structure has this path
});

// Redux actions mapping
const mapDispatchToProps = (dispatch) => ({
  getVideo: (id) => dispatch(getVideo(id)),
  getImages: (id) => dispatch(getImages(id)),
});

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cam);
