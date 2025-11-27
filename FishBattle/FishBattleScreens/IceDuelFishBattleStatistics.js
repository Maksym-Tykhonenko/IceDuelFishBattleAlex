import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useFocusEffect } from '@react-navigation/native';

const { height: fishBattleHeight } = Dimensions.get('window');

const fishBattleStorageKey = 'ice_duel_history';

const IceDuelFishBattleStatistics = () => {
  const [fishBattleLeaders, setFishBattleLeaders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fishBattleLoadLeaderboard();
    }, []),
  );

  const fishBattleLoadLeaderboard = async () => {
    const json = await AsyncStorage.getItem(fishBattleStorageKey);
    const fights = json ? JSON.parse(json) : [];

    const wins = {};
    const players = new Set();

    fights.forEach(fight => {
      if (fight.player1) players.add(fight.player1);
      if (fight.player2) players.add(fight.player2);
    });

    players.forEach(name => {
      wins[name] = 0;
    });

    fights.forEach(fight => {
      if (fight.winner && fight.winner !== 'Draw') {
        wins[fight.winner] = (wins[fight.winner] || 0) + 1;
      }
    });

    const result = Object.keys(wins)
      .map(name => ({
        name,
        wins: wins[name],
      }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 5);

    setFishBattleLeaders(result);
  };

  const fishBattleOnShare = async () => {
    await Share.share({
      message:
        `Ice Duel Fish Battle Leaderboard:\n\n` +
          fishBattleLeaders
            .map(
              (item, index) => `${index + 1}. ${item.name} - ${item.wins} wins`,
            )
            .join('\n') || 'No battles played yet.',
    });
  };

  const fishBattlePositions = Array.from(
    {
      length:
        fishBattleLeaders.length === 0
          ? 3
          : Math.min(5, fishBattleLeaders.length),
    },
    (_, i) => i + 1,
  );

  const fishBattleMedalImages = {
    1: require('../../assets/images/fishbattleframegold.png'),
    2: require('../../assets/images/fishbattleframesilver.png'),
    3: require('../../assets/images/fishbattleframeplat.png'),
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

        <LinearGradient
          colors={['#F1B013', '#E5D607', '#DC5B05']}
          style={fishBattleStyles.fishBattleBoardWrapper}
        >
          <View style={{ paddingTop: 10 }}>
            <View style={fishBattleStyles.fishBattleTableHeader}>
              <Text style={fishBattleStyles.fishBattleTh}>Position</Text>
              <Text style={fishBattleStyles.fishBattleTh}>Players</Text>
              <Text style={fishBattleStyles.fishBattleTh}>Wins</Text>
            </View>

            <LinearGradient
              colors={['#2A8ADC', '#6FB6E8']}
              style={{
                borderRadius: 22,
                padding: Platform.OS === 'ios' ? 8 : 0,
                margin: Platform.OS === 'ios' ? 0 : 8,
                paddingTop: Platform.OS === 'ios' ? 38 : 0,
                marginTop: Platform.OS === 'ios' ? 0 : 8,
              }}
            >
              <View style={fishBattleStyles.fishBattleBoardInner}>
                {fishBattlePositions.map((pos, index) => {
                  const item = fishBattleLeaders[index];

                  return (
                    <View key={pos} style={fishBattleStyles.fishBattleRow}>
                      <View style={fishBattleStyles.fishBattlePositionCell}>
                        {pos <= 3 ? (
                          <View style={{ width: '100%', alignItems: 'center' }}>
                            <Image
                              source={fishBattleMedalImages[pos]}
                              resizeMode="contain"
                            />
                            <Text
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: 24,
                                color: '#000',
                                fontSize: 16,
                                fontFamily: 'Ubuntu-Bold',
                              }}
                            >
                              {pos}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 63,
                              height: 29.5,
                              backgroundColor: '#1A578B',
                              borderRadius: 8.6,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={fishBattleStyles.fishBattlePositionText}
                            >
                              {pos}
                            </Text>
                          </View>
                        )}
                      </View>

                      <Text style={fishBattleStyles.fishBattlePlayerText}>
                        {item ? item.name : '---'}
                      </Text>

                      <Text style={fishBattleStyles.fishBattleWinsText}>
                        {item ? item.wins : '0'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>

        <TouchableOpacity onPress={fishBattleOnShare} activeOpacity={0.7}>
          <LinearGradient
            colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
            style={fishBattleStyles.fishBattleShareBtn}
          >
            <Text style={fishBattleStyles.fishBattleShareBtnText}>Share</Text>
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
    paddingBottom: 130,
  },
  fishBattleHeader: {
    backgroundColor: '#ffffff6f',
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  fishBattleHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    width: '70%',
  },
  fishBattleBoardWrapper: {
    borderRadius: 26,
    marginBottom: 35,
    paddingBottom: 1,
  },
  fishBattleBoardInner: {
    borderRadius: 22,
    paddingHorizontal: 17,
    alignItems: 'center',
    paddingBottom: 55,
  },
  fishBattleTableHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 46,
  },
  fishBattleTh: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Medium',
    top: 3,
  },
  fishBattleRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 40,
    alignItems: 'center',
  },
  fishBattlePositionCell: {
    width: 60,
    alignItems: 'center',
  },
  fishBattlePositionText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Ubuntu-Bold',
  },
  fishBattlePlayerText: {
    width: 120,
    textAlign: 'center',
    color: '#1A578B',
    fontSize: 15,
    fontFamily: 'Ubuntu-Medium',
    left: 10,
  },
  fishBattleWinsText: {
    width: 50,
    textAlign: 'right',
    color: '#1A578B',
    fontSize: 15,
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleShareBtn: {
    width: 240,
    height: 78,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fishBattleShareBtnText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
});

export default IceDuelFishBattleStatistics;
