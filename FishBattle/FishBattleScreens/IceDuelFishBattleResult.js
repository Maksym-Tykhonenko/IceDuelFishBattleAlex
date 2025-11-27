import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fishBattleHistoryItems } from '../FishBattleConsts/iceDuelFishBattleGameConsts';

const IceDuelFishBattleResult = () => {
  const fishBattleNavigation = useNavigation();
  const fishBattleRoute = useRoute();
  const { fight: fishBattleFight } = fishBattleRoute.params;

  // исходные данные боя (если нет истории)
  const {
    player1: fishBattlePlayer1,
    player2: fishBattlePlayer2,
    player1Choice: fishBattlePlayer1Choice,
    player2Choice: fishBattlePlayer2Choice,
    winner: fishBattleWinner,
  } = fishBattleFight;

  const [fishBattleLastPairFight, setFishBattleLastPairFight] =
    React.useState(null);

  useEffect(() => {
    loadLastPairFight();
  }, []);

  const loadLastPairFight = async () => {
    const json = await AsyncStorage.getItem('ice_duel_history');
    const data = json ? JSON.parse(json) : [];

    const pair = data.filter(
      f =>
        (f.player1 === fishBattlePlayer1 && f.player2 === fishBattlePlayer2) ||
        (f.player1 === fishBattlePlayer2 && f.player2 === fishBattlePlayer1),
    );

    if (pair.length === 0) {
      setFishBattleLastPairFight(null);
      return;
    }

    let p1Wins = 0;
    let p2Wins = 0;

    pair.forEach(f => {
      if (f.winner === fishBattlePlayer1) p1Wins++;
      if (f.winner === fishBattlePlayer2) p2Wins++;
    });

    let bestPlayer = null;

    if (p1Wins > p2Wins) bestPlayer = fishBattlePlayer1;
    else if (p2Wins > p1Wins) bestPlayer = fishBattlePlayer2;
    else bestPlayer = null;

    if (!bestPlayer) {
      setFishBattleLastPairFight(null);
      return;
    }

    const lastWin = pair.find(f => f.winner === bestPlayer);

    setFishBattleLastPairFight(lastWin || null);
  };

  const fishBattleShare = async () => {
    const fightToShow = fishBattleLastPairFight || fishBattleFight;

    await Share.share({
      message: `${fightToShow.player1} chose ${fightToShow.player1Choice}.\n${fightToShow.player2} chose ${fightToShow.player2Choice}.\n\n${fightToShow.winner} wins in Ice Duel Fish Battle!`,
    });
  };

  const fishBattleDeleteFight = async () => {
    try {
      const json = await AsyncStorage.getItem('ice_duel_history');
      const arr = json ? JSON.parse(json) : [];
      const updated = arr.filter(f => f.id !== fishBattleFight.id);
      await AsyncStorage.setItem('ice_duel_history', JSON.stringify(updated));
      fishBattleNavigation.goBack();
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  const fightToShow = fishBattleLastPairFight || fishBattleFight;

  return (
    <IceDuelFishBattleLayout>
      <View style={styles.fishBattleContainer}>
        <View style={styles.fishBattleHeader}>
          <TouchableOpacity onPress={() => fishBattleNavigation.goBack()}>
            <Image
              source={require('../../assets/images/fishbattleheadback.png')}
            />
          </TouchableOpacity>

          <Text style={styles.fishBattleHeaderText}>Result</Text>

          <Image
            source={require('../../assets/images/fishbattleheadlogo.png')}
          />
        </View>

        <LinearGradient
          colors={['#F1B013', '#E5D607', '#DC5B05']}
          style={{ borderRadius: 9, marginBottom: 13 }}
        >
          <View style={styles.fishBattleResultNameTag}>
            <Text style={styles.fishBattleResultNameText}>
              {fightToShow.player1}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.fishBattleChoiceRow}>
          {fishBattleHistoryItems[fightToShow.player1Choice].map((src, idx) => (
            <Image key={idx} source={src} style={styles.fishBattleIcon} />
          ))}
        </View>

        <LinearGradient
          colors={['#F1B013', '#E5D607', '#DC5B05']}
          style={{ borderRadius: 9, marginBottom: 13 }}
        >
          <View style={styles.fishBattleResultNameTag}>
            <Text style={styles.fishBattleResultNameText}>
              {fightToShow.player2}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.fishBattleChoiceRow}>
          {fishBattleHistoryItems[fightToShow.player2Choice].map((src, idx) => (
            <Image key={idx} source={src} style={styles.fishBattleIcon} />
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
            <View style={styles.fishBattleWinnerBox}>
              <Text style={styles.fishBattleWinnerText}>
                {fightToShow.winner}{' '}
                {fightToShow.winner !== 'Draw' ? 'win' : ''}
              </Text>
            </View>
          </LinearGradient>
        </LinearGradient>

        <View style={styles.fishBattleActionRow}>
          <TouchableOpacity
            onPress={fishBattleShare}
            activeOpacity={0.7}
            style={{ flex: 1 }}
          >
            <LinearGradient
              colors={['#88c7f1ff', '#b1ddf9ff', '#1367b1ff']}
              style={styles.fishBattleShareBtn}
            >
              <Text style={styles.fishBattleShareText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={fishBattleDeleteFight} activeOpacity={0.7}>
            <Image source={require('../../assets/images/fishbattledel.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </IceDuelFishBattleLayout>
  );
};

const styles = StyleSheet.create({
  fishBattleContainer: {
    flex: 1,
    padding: 18,
    paddingTop: 60,
    alignItems: 'center',
  },
  fishBattleHeader: {
    width: '100%',
    backgroundColor: '#ffffff6f',
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  fishBattleHeaderText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Ubuntu-Medium',
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
  fishBattleChoiceRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  fishBattleIcon: {
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
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleActionRow: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  fishBattleShareBtn: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleShareText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
});

export default IceDuelFishBattleResult;
