import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const IceDuelFishBattleOnboard = () => {
  const [currentFishBattleWelcomeIndex, setCurrentFishBattleWelcomeIndex] =
    useState(0);
  const navigation = useNavigation();

  return (
    <IceDuelFishBattleLayout>
      <View style={styles.battleFishContainer}>
        {currentFishBattleWelcomeIndex === 0 ? (
          <Image
            source={require('../../assets/images/fishbattleon1.png')}
            style={{ top: 34 }}
          />
        ) : currentFishBattleWelcomeIndex === 1 ? (
          <View style={{ gap: 15, marginBottom: 12 }}>
            <View style={styles.battleFishRowWrapper}>
              <Image
                source={require('../../assets/images/fishbattleon2.png')}
                style={{}}
              />

              <View style={styles.battleFishWrapper}>
                <Image
                  source={require('../../assets/images/fishbattleline1.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline2.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline3.png')}
                />
              </View>

              <Image
                source={require('../../assets/images/fishbattleon3.png')}
                style={{}}
              />
            </View>
            <View style={styles.battleFishRowWrapper}>
              <Image
                source={require('../../assets/images/fishbattleon4.png')}
                style={{}}
              />

              <View style={styles.battleFishWrapper}>
                <Image
                  source={require('../../assets/images/fishbattleline1.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline2.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline3.png')}
                />
              </View>

              <Image
                source={require('../../assets/images/fishbattleon5.png')}
                style={{}}
              />
            </View>
            <View style={styles.battleFishRowWrapper}>
              <Image
                source={require('../../assets/images/fishbattleon6.png')}
                style={{}}
              />

              <View style={styles.battleFishWrapper}>
                <Image
                  source={require('../../assets/images/fishbattleline1.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline2.png')}
                />
                <Image
                  source={require('../../assets/images/fishbattleline3.png')}
                />
              </View>

              <Image
                source={require('../../assets/images/fishbattleon7.png')}
                style={{}}
              />
            </View>
          </View>
        ) : (
          <Image
            source={require('../../assets/images/fishbattleon8.png')}
            style={{ top: 35 }}
          />
        )}
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
              <Text style={styles.battleFishWelcomeText}>
                {currentFishBattleWelcomeIndex === 0
                  ? 'Hello! I’m Adam, your guide in the world of duels.'
                  : currentFishBattleWelcomeIndex === 1
                  ? 'Red is fire, yellow is electricity, blue is water.'
                  : 'You choose a fish in turn, and I’ll immediately show you who won.'}
              </Text>
              <Text style={styles.battleFishWelcomeSubText}>
                {currentFishBattleWelcomeIndex === 0
                  ? 'It’s simple: choose a fish and fight for victory. Ready to test your intuition?'
                  : currentFishBattleWelcomeIndex === 1
                  ? 'Each fish has its own advantages. Make the right choice and victory is yours.'
                  : 'Check out the statistics, climb the leaderboard and become the champion of the Arctic.'}
              </Text>
            </View>
          </LinearGradient>
        </LinearGradient>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            currentFishBattleWelcomeIndex === 2
              ? navigation.replace('IceDuelFishBattleTab')
              : setCurrentFishBattleWelcomeIndex(
                  currentFishBattleWelcomeIndex + 1,
                )
          }
        >
          <LinearGradient
            colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
            style={styles.battleFishGradientButtonWrap}
          >
            <Text style={styles.battleFishGradientButtonText}>
              {currentFishBattleWelcomeIndex === 0
                ? 'Next'
                : currentFishBattleWelcomeIndex === 1
                ? 'Okay'
                : 'Start'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </IceDuelFishBattleLayout>
  );
};

const styles = StyleSheet.create({
  battleFishContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  battleFishWelcomeContainer: {
    paddingVertical: 50,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  battleFishGradientWrap: {
    marginTop: 20,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 50,
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
    marginBottom: height * 0.07,
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

export default IceDuelFishBattleOnboard;
