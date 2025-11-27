import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IceDuelFishBattleHeader from '../FishBattleComponents/IceDuelFishBattleHeader';

const { height } = Dimensions.get('window');

const IceDuelFishBattleGame = () => {
  const [fishBattlePlayer1Name, setFishBattlePlayer1Name] = useState('');
  const [fishBattlePlayer2Name, setFishBattlePlayer2Name] = useState('');
  const navigation = useNavigation();

  const startFishBattleGame = () => {
    setFishBattlePlayer1Name('');
    setFishBattlePlayer2Name('');
    if (!fishBattlePlayer1Name.trim() || !fishBattlePlayer2Name.trim()) return;
    navigation.navigate('IceDuelFishBattleGameplay', {
      player1: fishBattlePlayer1Name.trim(),
      player2: fishBattlePlayer2Name.trim(),
    });
  };

  return (
    <IceDuelFishBattleLayout>
      <View style={styles.battleFishContainer}>
        <IceDuelFishBattleHeader />

        <View style={{ paddingHorizontal: 20, width: '100%' }}>
          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={styles.battleFishPlayerContainer}
          >
            <Text
              style={[styles.battleFishGradientButtonText, { fontSize: 15 }]}
            >
              Player 1
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={styles.battleFishGradientWrap}
          >
            <LinearGradient
              colors={['#B6D0E1', '#2A8ADC']}
              style={{
                padding: Platform.OS === 'ios' ? 5 : 0,
                margin: Platform.OS === 'ios' ? 0 : 5,
                borderRadius: 7,
              }}
            >
              <View style={styles.battleFishWelcomeContainer}>
                <TextInput
                  value={fishBattlePlayer1Name}
                  onChangeText={setFishBattlePlayer1Name}
                  placeholder="Name"
                  placeholderTextColor="#000000"
                  maxLength={14}
                  style={[
                    styles.battleFishInput,
                    fishBattlePlayer1Name && {
                      fontSize: 15,
                      fontFamily: 'Ubuntu-Medium',
                    },
                  ]}
                />
              </View>
            </LinearGradient>
          </LinearGradient>

          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={styles.battleFishPlayerContainer}
          >
            <Text
              style={[styles.battleFishGradientButtonText, { fontSize: 15 }]}
            >
              Player 2
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={styles.battleFishGradientWrap}
          >
            <LinearGradient
              colors={['#B6D0E1', '#2A8ADC']}
              style={{
                padding: Platform.OS === 'ios' ? 5 : 0,
                margin: Platform.OS === 'ios' ? 0 : 5,
                borderRadius: 7,
              }}
            >
              <View style={styles.battleFishWelcomeContainer}>
                <TextInput
                  value={fishBattlePlayer2Name}
                  onChangeText={setFishBattlePlayer2Name}
                  placeholder="Name"
                  placeholderTextColor="#000000"
                  maxLength={14}
                  style={[
                    styles.battleFishInput,
                    fishBattlePlayer2Name && {
                      fontSize: 15,
                      fontFamily: 'Ubuntu-Medium',
                    },
                  ]}
                />
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => startFishBattleGame()}
        >
          <LinearGradient
            colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
            style={styles.battleFishGradientButtonWrap}
          >
            <Text style={styles.battleFishGradientButtonText}>Start</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </IceDuelFishBattleLayout>
  );
};

const styles = StyleSheet.create({
  battleFishContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    paddingTop: height * 0.06,
    paddingBottom: 130,
  },
  battleFishInput: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 13,
    fontFamily: 'Ubuntu-Regular',
    minHeight: 45,
  },
  battleFishWelcomeContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingRight: 25,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  battleFishGradientWrap: {
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 22,
  },
  battleFishWelcomeText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Medium',
    lineHeight: 25,
  },
  battleFishWelcomeSubText: {
    marginTop: 18,
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 22,
  },
  battleFishGradientButtonWrap: {
    width: 240,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 78,
  },
  battleFishPlayerContainer: {
    width: 131,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    alignSelf: 'flex-start',
  },
  battleFishGradientButtonText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Medium',
  },
  battleFishWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  battleFishRowWrapper: { alignItems: 'center', flexDirection: 'row', gap: 30 },
});

export default IceDuelFishBattleGame;
