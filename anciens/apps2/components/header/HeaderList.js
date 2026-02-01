import React, { useEffect } from 'react';
import { View } from 'react-native';
import BoxConsultation from '../buttons/BoxConsultation';
import BoxConsultation2 from '../buttons/BoxConsultation2';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const HeaderList = ({ navigation , id_groupe, firstElToggle ,videoToggle, expressionToggle, imageToggle, audioToggle,videoColor, expressionColor, imageColor, audioColor }) => {
  useEffect(() => {
    // Appeler la fonction de permutation initiale (par exemple, videoToggle)
    firstElToggle();
  }, [firstElToggle]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width:wp('70%'), alignSelf:'center', zIndex:0, marginTop:hp('1%') }}>
      {/* <BoxConsultation2
        label={''}
        iconName="slideshow"
        iconsProvider="MaterialIcons"
        boxColor={videoColor}
        before={() => {
            videoToggle();
            navigation.navigate('Recordings',{'id_groupe':id_groupe}); // Appeler la fonction locale
          }}
      /> */}
      <BoxConsultation2
        label=""
        iconName="document-text"
        iconsProvider="ion"
        boxColor={expressionColor}
        before={()=>{
            expressionToggle();
            navigation.navigate('ExpressionList',{'id_groupe':id_groupe}); }
        }
      />
      <BoxConsultation2
        label={""}
        iconName="image-outline"
        iconsProvider="ion"
        boxColor={imageColor}
        before={()=>{
            imageToggle();
            navigation.navigate('Images',{'id_groupe':id_groupe});
        }}
      />
      <BoxConsultation2
        label={""}
        iconName="musical-notes"
        iconsProvider="ion"
        boxColor={audioColor}
        before={audioToggle}
      />
    </View>
  );
};

export default HeaderList;
