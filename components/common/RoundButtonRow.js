import { useState } from 'react';
import {  Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { setNetwork } from '../../Redux/actions';
import {  useDispatch } from 'react-redux';

const ScrollableButtonRow = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('homestead'); 

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const buttons = [
    { id: 'homestead', label: 'Ethereum', image: require('../../assets/ethereum-logo.png') },
       { id: 'matic', label: 'Matic', image: require('../../assets/polygon-logo.png') },
    { id: 'optimism', label: 'Optimism', image: require('../../assets/optimism-logo.png') },
    { id: 'arbitrum', label: 'Arbitrum', image: require('../../assets/arbitrium-logo.png') },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[styles.button, activeButton === button.id && styles.activeButton]}
          onPress={() => { 
          console.log(button.id);
          dispatch(setNetwork(button.id));
          handleButtonPress(button.id);}}
        >
          <Image source={button.image} style={styles.buttonImage} />
          <Text style={[styles.buttonText, activeButton === button.id && styles.activeButtonText]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    height: 30,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3c4753',
    backgroundColor: '#fff',
  },
  activeButton: {
    backgroundColor: '#3c4753',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3c4753',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default ScrollableButtonRow;
