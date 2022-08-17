import React from 'react';
import {
  SafeAreaView,
  Button,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image
} from 'react-native';
import { useRecoilState, useResetRecoilState } from "recoil";
import { playerOrder } from "./config/constants";
import * as states from "./recoil/atoms";

function PlayerButton({ count }) {
  const setCurrentPlayer = useRecoilState(states.currentPlayerState)[1];
  const setCurrentPlayersList = useRecoilState(
    states.currentPlayersListState
  )[1];

  const resetBlockState = useResetRecoilState(states.allBlockState);
  const resetCoinState = useResetRecoilState(states.allCoinState);
  const resetDiceState = useResetRecoilState(states.currentDiceState);

  // Event handler for button onClick.
  const handleClick = () => {
    console.log("inside", count)
    const randomNum = Math.floor(Math.random() * 2);
    const playersList =
      count === 2
        ? [playerOrder[randomNum], playerOrder[randomNum + 2]]
        : count === 3
        ? playerOrder.slice(randomNum, randomNum + 3)
        : [...playerOrder];

    // reset previous states
    resetBlockState();
    resetCoinState();
    resetDiceState();

    setCurrentPlayersList([...playersList]);
    setCurrentPlayer(playersList[0]);
  };

  return (
    <Pressable style={styles.roundButton} onPress={handleClick}>
      <Text style={styles.text}>{count}</Text>
    </Pressable>
  );
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Ludo</Text>
      <Image
            style ={styles.img}
            source={require('./img/ludo.gif')}
          />
      <Text style={styles.subtitle}>No of Players</Text>
      <View className={styles.gameSetup}>
        {[2, 3, 4].map((i) => (
          <PlayerButton
            key={i}
            count={i}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  gameSetup: {
    flex: 1,
    flexDirection: 'row'
  },
  img: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 60,
    textAlign: 'center'
  },
  subtitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
    margin: 20,
    textAlign: 'center'
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'black',
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  },
});