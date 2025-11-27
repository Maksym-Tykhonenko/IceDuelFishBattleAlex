import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IceDuelFishBattleGame from '../FishBattleScreens/IceDuelFishBattleGame';
import IceDuelFishBattleHistory from '../FishBattleScreens/IceDuelFishBattleHistory';
import IceDuelFishBattleStatistics from '../FishBattleScreens/IceDuelFishBattleStatistics';
import IceDuelFishBattleAbout from '../FishBattleScreens/IceDuelFishBattleAbout';

const Tab = createBottomTabNavigator();

const IceDuelFishBattleTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.fishBattleTab,
        tabBarActiveTintColor: '#E8AA00',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#F1B013', '#E5D607', '#DC5B05']}
            style={{ borderRadius: 10 }}
          >
            <LinearGradient
              colors={['#B6D0E1', '#2A8ADC']}
              style={styles.fishBattleTabGradBg}
            ></LinearGradient>
          </LinearGradient>
        ),
      }}
    >
      <Tab.Screen
        name="IceDuelFishBattleGame"
        component={IceDuelFishBattleGame}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/fishbattletabact1.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/fishbattletab1.png')}
                />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => (
            <>
              {focused && (
                <Text style={[styles.fishBattleTitle, { color: '#fff' }]}>
                  Game
                </Text>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="IceDuelFishBattleHistory"
        component={IceDuelFishBattleHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/fishbattletabac2.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/fishbattletab2.png')}
                />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => (
            <>
              {focused && (
                <Text style={[styles.fishBattleTitle, { color: '#fff' }]}>
                  History
                </Text>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="IceDuelFishBattleStatistics"
        component={IceDuelFishBattleStatistics}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/fishbattletabact3.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/fishbattletab3.png')}
                />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => (
            <>
              {focused && (
                <Text style={[styles.fishBattleTitle, { color: '#fff' }]}>
                  Leaderboard
                </Text>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="IceDuelFishBattleAbout"
        component={IceDuelFishBattleAbout}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/fishbattletabact4.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/fishbattletab4.png')}
                />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => (
            <>
              {focused && (
                <Text style={[styles.fishBattleTitle, { color: '#fff' }]}>
                  About
                </Text>
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  fishBattleTab: {
    marginHorizontal: 20,
    elevation: 0,
    paddingTop: 32,
    paddingBottom: 5,
    justifyContent: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 61 : 75,
    paddingHorizontal: 14,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
  },
  fishBattleTabGradBg: {
    height: 102,
    borderRadius: 7,
    margin: Platform.OS === 'ios' ? 0 : 5,
    padding: Platform.OS === 'ios' ? 5 : 0,
  },
  fishBattleTitle: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default IceDuelFishBattleTab;
