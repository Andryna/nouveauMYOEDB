import React, { useRef } from 'react';
import { Animated, Image } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ZoomableImage = ({ uri, onZoomStart, onZoomEnd }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // Désactiver le défilement lors du début du zoom
      onZoomStart && onZoomStart();
    } else if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      // Réinitialiser le zoom et réactiver le défilement
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        onZoomEnd && onZoomEnd();
      });
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={onPinchStateChange}
    >
      <Animated.Image
        style={{
          width: wp('93%'),
          height: hp('70%'),
          transform: [{ scale }]
        }}
        source={{ uri }}
        resizeMode="contain"
      />
    </PinchGestureHandler>
  );
};

export default ZoomableImage;
