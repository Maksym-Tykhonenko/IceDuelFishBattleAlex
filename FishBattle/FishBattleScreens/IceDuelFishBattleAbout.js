import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
const { height: fishBattleHeight } = Dimensions.get('window');

const IceDuelFishBattleAbout = () => {
  const fishBattleShareAbout = async () => {
    await Share.share({
      message: `Ice Duel Fish Battle is a fast-paced arctic duel where three
fish with the elements of fire, electricity and water compete
for victory. Choose your fish, play together on one device and
track your stats to become a true ice battle champion.`,
    });
  };

  return (
    <IceDuelFishBattleLayout>
      <View style={fishBattleStyles.fishBattleContainer}>
        <View style={fishBattleStyles.fishBattleHeader}>
          <Text style={fishBattleStyles.fishBattleHeaderText}>
            Welcome to Ice Duel Fish Battle
          </Text>

          <Image
            source={require('../../assets/images/fishbattleheadlogo.png')}
          />
        </View>

        <View style={fishBattleStyles.fishBattleFishRow}>
          <Image
            style={fishBattleStyles.fishBattleFishIcon}
            source={require('../../assets/images/fishbattlegamefish1.png')}
          />
          <Image
            style={fishBattleStyles.fishBattleFishIcon}
            source={require('../../assets/images/fishbattlegamefish2.png')}
          />
          <Image
            style={fishBattleStyles.fishBattleFishIcon}
            source={require('../../assets/images/fishbattlegamefish3.png')}
          />
        </View>

        <LinearGradient
          colors={['#F1B013', '#E5D607', '#DC5B05']}
          style={fishBattleStyles.fishBattleTextOuter}
        >
          <LinearGradient
            colors={['#B6D0E1', '#2A8ADC']}
            style={{
              borderRadius: 10,
              padding: Platform.OS === 'ios' ? 4 : 0,
              margin: Platform.OS === 'ios' ? 0 : 4,
            }}
          >
            <View style={fishBattleStyles.fishBattleTextInner}>
              <Text style={fishBattleStyles.fishBattleAboutText}>
                Ice Duel Fish Battle is a fast-paced arctic duel where three
                fish with the elements of fire, electricity and water compete
                for victory. Choose your fish, play together on one device and
                track your stats to become a true ice battle champion.
              </Text>
            </View>
          </LinearGradient>
        </LinearGradient>

        <TouchableOpacity onPress={fishBattleShareAbout} activeOpacity={0.7}>
          <LinearGradient
            colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
            style={fishBattleStyles.fishBattleShareBtn}
          >
            <Text style={fishBattleStyles.fishBattleShareText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </IceDuelFishBattleLayout>
  );
};

const fishBattleStyles = StyleSheet.create({
  fishBattleContainer: {
    flex: 1,
    padding: 18,
    paddingTop: fishBattleHeight * 0.07,
    alignItems: 'center',
    paddingBottom: 130,
  },
  fishBattleHeader: {
    width: '100%',
    backgroundColor: '#ffffff6f',
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  fishBattleHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    width: '70%',
  },
  fishBattleFishRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 35,
    flexWrap: 'wrap',
  },
  fishBattleFishIcon: {
    width: 103,
    height: 103,
  },
  fishBattleTextOuter: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 30,
  },
  fishBattleTextInner: {
    padding: 16,
    paddingBottom: 30,
    paddingTop: 40,
  },
  fishBattleAboutText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    lineHeight: 22,
  },
  fishBattleShareBtn: {
    width: 240,
    height: 78,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleShareText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
});

export default IceDuelFishBattleAbout;
