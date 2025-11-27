import React, { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import IceDuelFishBattleLayout from '../FishBattleComponents/IceDuelFishBattleLayout';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
const fishBattleStorageKey = 'ice_duel_history';

const { height: fishBattleHeight } = Dimensions.get('window');

const IceDuelFishBattleHistory = () => {
  const [fishBattleHistory, setFishBattleHistory] = useState([]);
  const fishBattleNavigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fishBattleLoadHistory();
    }, []),
  );

  const fishBattleLoadHistory = async () => {
    const json = await AsyncStorage.getItem(fishBattleStorageKey);
    const data = json ? JSON.parse(json) : [];

    const fightsOnly = data.filter(
      item =>
        item.id &&
        item.player1 &&
        item.player2 &&
        item.player1Choice &&
        item.player2Choice &&
        typeof item.winner !== 'undefined',
    );

    setFishBattleHistory(fightsOnly);
  };

  const fishBattleFormatDate = iso => {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
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

        {fishBattleHistory.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: fishBattleHeight * 0.22,
            }}
          >
            <Text style={fishBattleStyles.fishBattleNoDataText}>
              You haven't had any fights yet.
            </Text>
          </View>
        )}

        {fishBattleHistory.length > 0 && (
          <View>
            {fishBattleHistory.map(item => (
              <LinearGradient
                key={item.id}
                colors={['#F1B013', '#E5D607', '#DC5B05']}
                style={fishBattleStyles.fishBattleCardWrapper}
              >
                <LinearGradient
                  colors={['#B6D0E1', '#2A8ADC']}
                  style={{
                    borderRadius: 14,
                    padding: Platform.OS === 'ios' ? 4 : 0,
                    margin: Platform.OS === 'ios' ? 0 : 4,
                  }}
                >
                  <View style={fishBattleStyles.fishBattleCardInner}>
                    <Text style={fishBattleStyles.fishBattleDateText}>
                      {fishBattleFormatDate(item.date)}
                    </Text>

                    <View style={fishBattleStyles.fishBattleVsRow}>
                      <View style={fishBattleStyles.fishBattleNameButton}>
                        <Text style={fishBattleStyles.fishBattleNameText}>
                          {item.player1}
                        </Text>
                      </View>

                      <Text style={fishBattleStyles.fishBattleVsText}>VS</Text>

                      <View style={fishBattleStyles.fishBattleNameButton}>
                        <Text style={fishBattleStyles.fishBattleNameText}>
                          {item.player2}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        fishBattleNavigation.navigate(
                          'IceDuelFishBattleResult',
                          {
                            fight: item,
                          },
                        )
                      }
                    >
                      <LinearGradient
                        colors={['#F1B013', '#E5D607', '#DC5B05']}
                        style={fishBattleStyles.fishBattleMoreBtn}
                      >
                        <Text style={fishBattleStyles.fishBattleMoreBtnText}>
                          More
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </LinearGradient>
            ))}
          </View>
        )}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  fishBattleHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    width: '70%',
  },
  fishBattleNoDataText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
  },
  fishBattleCardWrapper: {
    borderRadius: 14,
    marginBottom: 25,
  },
  fishBattleCardInner: {
    borderRadius: 14,
    padding: 15,
    paddingBottom: 24,
    alignItems: 'center',
  },
  fishBattleDateText: {
    color: '#514E4E',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
  },
  fishBattleVsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 30,
    marginTop: 34,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  fishBattleNameButton: {
    borderRadius: 10,
    width: '35%',
    minHeight: 46,
    padding: 6,
    borderWidth: 2,
    borderColor: '#F1B013',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fishBattleNameText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },
  fishBattleVsText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Ubuntu-Bold',
  },
  fishBattleMoreBtn: {
    width: 122,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fishBattleMoreBtnText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
  },
});

export default IceDuelFishBattleHistory;
