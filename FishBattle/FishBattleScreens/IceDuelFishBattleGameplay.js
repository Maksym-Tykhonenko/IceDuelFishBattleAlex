import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Share,
} from 'react-native';
const { height: fishBattleHeight } = Dimensions.get('window');
import {
  fishBattleItems,
  fishBattleRules,
} from '../FishBattleConsts/iceDuelFishBattleGameConsts';

const fishBattleStorageKey = 'ice_duel_history';

const IceDuelFishBattleGameplay = () => {
  const fishBattleNavigation = useNavigation();
  const route = useRoute();
  const { player1, player2, isNewGame = true } = route.params;
  const [fishBattleMode, setFishBattleMode] = useState('choose');
  const [fishBattleTurn, setFishBattleTurn] = useState(1);
  const [fishBattleSelected, setFishBattleSelected] = useState(null);
  const [fishBattleFirstPick, setFishBattleFirstPick] = useState(null);
  const [fishBattleWinner, setFishBattleWinner] = useState('');
  const [fishBattleChoice1, setFishBattleChoice1] = useState(null);
  const [fishBattleChoice2, setFishBattleChoice2] = useState(null);
  const [fishBattleAlreadySaved, setFishBattleAlreadySaved] = useState(false);
  const fishBattleCurrentPlayer = fishBattleTurn === 1 ? player1 : player2;
  const [fishBattleSessionId] = useState(Date.now());

  const fishBattleUpdateWins = async name => {
    if (!name || name === 'Draw') return;

    const json = await AsyncStorage.getItem(fishBattleStorageKey);
    const fights = json ? JSON.parse(json) : [];

    await AsyncStorage.setItem(fishBattleStorageKey, JSON.stringify(fights));
  };

  const fishBattleSaveFight = async fight => {
    const json = await AsyncStorage.getItem(fishBattleStorageKey);
    let data = json ? JSON.parse(json) : [];

    const existingIndex = data.findIndex(
      item => item.sessionId === fight.sessionId,
    );

    if (existingIndex !== -1) {
      data[existingIndex] = { ...data[existingIndex], ...fight };
    } else {
      data.unshift(fight);
    }

    await AsyncStorage.setItem(fishBattleStorageKey, JSON.stringify(data));
  };

  const fishBattleSelectElement = element => setFishBattleSelected(element);

  const fishBattleConfirm = async () => {
    if (fishBattleTurn === 1) {
      setFishBattleFirstPick(fishBattleSelected);
      setFishBattleChoice1(fishBattleSelected);

      setFishBattleTurn(2);
      setFishBattleSelected(null);
      setFishBattleMode('choose');
    } else {
      setFishBattleChoice2(fishBattleSelected);

      let finalWinner = '';

      if (fishBattleRules[fishBattleFirstPick] === fishBattleSelected) {
        finalWinner = player1;
      } else if (fishBattleRules[fishBattleSelected] === fishBattleFirstPick) {
        finalWinner = player2;
      } else {
        finalWinner = 'Draw';
      }

      setFishBattleWinner(finalWinner);
      setFishBattleMode('result');

      await fishBattleUpdateWins(finalWinner);

      const fight = {
        id: fishBattleSessionId,
        sessionId: fishBattleSessionId,
        date: new Date().toISOString(),
        player1,
        player2,
        player1Choice: fishBattleFirstPick,
        player2Choice: fishBattleSelected,
        winner: finalWinner,
      };

      await fishBattleSaveFight(fight);
    }
  };

  const fishBattleRestart = () => {
    setFishBattleMode('choose');
    setFishBattleTurn(1);
    setFishBattleSelected(null);
    setFishBattleFirstPick(null);
    setFishBattleWinner('');
    setFishBattleChoice1(null);
    setFishBattleChoice2(null);

    setFishBattleAlreadySaved(false);
  };

  const fishBattleShare = () => {
    Share.share({
      message: `${player1} chose ${fishBattleChoice1}.
${player2} chose ${fishBattleChoice2}.

${fishBattleWinner} ${fishBattleWinner !== 'Draw' ? 'win!' : ''}`,
    });
  };

  return (
    <IceDuelFishBattleLayout>
      <View style={fishBattleStyles.fishBattleContainer}>
        <View style={fishBattleStyles.fishBattleHeader}>
          <TouchableOpacity onPress={() => fishBattleNavigation.goBack()}>
            <Image
              source={require('../../assets/images/fishbattleheadback.png')}
            />
          </TouchableOpacity>

          <Text style={fishBattleStyles.fishBattleHeaderTitle}>
            {fishBattleMode === 'result' ? 'Result' : 'Game'}
          </Text>

          <Image
            source={require('../../assets/images/fishbattleheadlogo.png')}
          />
        </View>

        {fishBattleMode !== 'result' && fishBattleMode !== 'more' && (
          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={fishBattleStyles.fishBattlePlayerWrap}
          >
            <View style={fishBattleStyles.fishBattlePlayerTag}>
              <Text style={fishBattleStyles.fishBattlePlayerText}>
                Choose, {fishBattleCurrentPlayer}
              </Text>
            </View>
          </LinearGradient>
        )}

        {fishBattleMode === 'choose' && (
          <>
            <View style={fishBattleStyles.fishBattleGrid}>
              {['fire', 'electric', 'water'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => fishBattleSelectElement(type)}
                  style={[
                    fishBattleStyles.fishBattleGroupWrap,
                    fishBattleSelected === type &&
                      fishBattleStyles.fishBattleGroupActive,
                  ]}
                >
                  {fishBattleItems[type].map(img => (
                    <Image
                      key={img.id}
                      source={img.img}
                      style={fishBattleStyles.fishBattleGroupItem}
                    />
                  ))}
                </TouchableOpacity>
              ))}
            </View>

            {fishBattleSelected && (
              <TouchableOpacity onPress={() => setFishBattleMode('more')}>
                <LinearGradient
                  colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
                  style={fishBattleStyles.fishBattleMoreBtn}
                >
                  <Text style={fishBattleStyles.fishBattleMoreBtnText}>
                    More
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}

        {fishBattleMode === 'more' && (
          <View style={fishBattleStyles.fishBattleMoreContainer}>
            <View style={fishBattleStyles.fishBattleGroupWrap}>
              {fishBattleItems[fishBattleSelected].map(img => (
                <Image
                  key={img.id}
                  source={img.img}
                  style={fishBattleStyles.fishBattleMoreImage}
                />
              ))}
            </View>

            <LinearGradient
              colors={['#F1B013', '#E5D607', '#DC5B05']}
              style={{ borderRadius: 10, width: '95%' }}
            >
              <LinearGradient
                colors={['#B6D0E1', '#2A8ADC']}
                style={{
                  padding: Platform.OS === 'ios' ? 5 : 0,
                  margin: Platform.OS === 'ios' ? 0 : 5,
                  borderRadius: 7,
                }}
              >
                <View style={fishBattleStyles.fishBattleMoreDesc}>
                  <Text style={fishBattleStyles.fishBattleMoreTitle}>
                    {fishBattleSelected === 'electric' && 'Electric fish'}
                    {fishBattleSelected === 'water' && 'Aquatic fish'}
                    {fishBattleSelected === 'fire' && 'Fire fish'}
                  </Text>

                  <Text style={fishBattleStyles.fishBattleMoreText}>
                    {fishBattleSelected === 'electric' &&
                      'The yellow fish is charged with electricity and can defeat the blue fish in a flash, as water conducts electric shocks. However, its weak point is the red fire fish, which can easily neutralize all electric shocks.'}
                    {fishBattleSelected === 'water' &&
                      'The blue fish controls the power of water, so it is stronger than the red fish and can easily extinguish any fire attacks. However, it loses against the yellow fish, as water conducts electricity and becomes its greatest vulnerability.'}
                    {fishBattleSelected === 'fire' &&
                      'The red fish has the power of fire, so it easily defeats the yellow electric fish by burning its pulses. But be careful - it is practically defenseless against the blue water fish, as the water completely extinguishes its power.'}
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>

            <TouchableOpacity onPress={fishBattleConfirm}>
              <LinearGradient
                colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
                style={fishBattleStyles.fishBattleChooseBtn}
              >
                <Text style={fishBattleStyles.fishBattleChooseBtnText}>
                  Choose
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {fishBattleMode === 'result' && (
          <View style={fishBattleStyles.fishBattleResultContainer}>
            <LinearGradient
              colors={['#F1B013', '#E5D607', '#DC5B05']}
              style={{ borderRadius: 9 }}
            >
              <View style={fishBattleStyles.fishBattleResultNameTag}>
                <Text style={fishBattleStyles.fishBattleResultNameText}>
                  {player1}
                </Text>
              </View>
            </LinearGradient>

            <View style={fishBattleStyles.fishBattleResultGroup}>
              {fishBattleItems[fishBattleChoice1].map(i => (
                <Image
                  key={i.id}
                  source={i.img}
                  style={fishBattleStyles.fishBattleResultItem}
                />
              ))}
            </View>

            <LinearGradient
              colors={['#F1B013', '#E5D607', '#DC5B05']}
              style={{ borderRadius: 9 }}
            >
              <View style={fishBattleStyles.fishBattleResultNameTag}>
                <Text style={fishBattleStyles.fishBattleResultNameText}>
                  {player2}
                </Text>
              </View>
            </LinearGradient>

            <View style={fishBattleStyles.fishBattleResultGroup}>
              {fishBattleItems[fishBattleChoice2].map(i => (
                <Image
                  key={i.id}
                  source={i.img}
                  style={fishBattleStyles.fishBattleResultItem}
                />
              ))}
            </View>

            <LinearGradient
              colors={['#F1B013', '#E5D607', '#DC5B05']}
              style={{ borderRadius: 10, width: '90%' }}
            >
              <LinearGradient
                colors={['#B6D0E1', '#2A8ADC']}
                style={{
                  padding: Platform.OS === 'ios' ? 5 : 0,
                  margin: Platform.OS === 'ios' ? 0 : 5,
                  borderRadius: 7,
                }}
              >
                <View style={fishBattleStyles.fishBattleWinnerBox}>
                  <Text style={fishBattleStyles.fishBattleWinnerText}>
                    {fishBattleWinner}{' '}
                    {fishBattleWinner !== 'Draw' ? 'win' : ''}
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>

            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                marginTop: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={fishBattleShare}>
                <LinearGradient
                  colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
                  style={fishBattleStyles.fishBattleShareBtn}
                >
                  <Text style={fishBattleStyles.fishBattleShareText}>
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={fishBattleRestart}>
                <LinearGradient
                  colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
                  style={fishBattleStyles.fishBattleRestartBtn}
                >
                  <Text style={fishBattleStyles.fishBattleRestartText}>
                    Restart
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </IceDuelFishBattleLayout>
  );
};

const fishBattleStyles = StyleSheet.create({
  fishBattleContainer: {
    flex: 1,
    padding: 12,
    paddingTop: fishBattleHeight * 0.06,
    paddingBottom: 30,
  },
  fishBattleHeader: {
    width: '100%',
    backgroundColor: '#ffffff6f',
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  fishBattleHeaderTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattlePlayerWrap: {
    borderRadius: 12,
    width: '58%',
    alignSelf: 'center',
    marginBottom: 24,
  },
  fishBattlePlayerTag: {
    paddingVertical: 16,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fishBattlePlayerText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleGrid: {
    width: '100%',
    alignItems: 'center',
    gap: 5,
    marginBottom: 30,
  },
  fishBattleGroupWrap: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 14,
  },
  fishBattleGroupActive: {
    borderWidth: 4,
    borderColor: '#FF9900',
  },
  fishBattleGroupItem: {
    width: 130,
    height: 130,
  },
  fishBattleMoreContainer: {
    alignItems: 'center',
    gap: 25,
    marginTop: 20,
  },
  fishBattleMoreImage: {
    width: 150,
    height: 150,
  },
  fishBattleMoreDesc: {
    width: '95%',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    paddingBottom: 30,
  },
  fishBattleMoreTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 17,
  },
  fishBattleMoreText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 22,
    textAlign: 'center',
  },
  fishBattleMoreBtn: {
    width: 200,
    height: 68,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fishBattleMoreBtnText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleChooseBtn: {
    width: 210,
    height: 68,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleChooseBtnText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleResultContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    gap: 14,
  },
  fishBattleResultNameTag: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fishBattleResultNameText: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleResultGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  fishBattleResultItem: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  fishBattleWinnerBox: {
    paddingVertical: 30,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  fishBattleWinnerText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleShareBtn: {
    width: 150,
    height: 62,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleShareText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleRestartBtn: {
    width: 150,
    height: 62,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleRestartText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
});

export default IceDuelFishBattleGameplay;
