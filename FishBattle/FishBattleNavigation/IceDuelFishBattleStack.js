import { createStackNavigator } from '@react-navigation/stack';
import IceDuelFishBattleTab from './IceDuelFishBattleTab';
import IceDuelFishBattleOnboard from '../FishBattleScreens/IceDuelFishBattleOnboard';
import IceDuelFishBattleGameplay from '../FishBattleScreens/IceDuelFishBattleGameplay';
import IceDuelFishBattleResult from '../FishBattleScreens/IceDuelFishBattleResult';

const Stack = createStackNavigator();

const IceDuelFishBattleStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="IceDuelFishBattleOnboard"
        component={IceDuelFishBattleOnboard}
      />
      <Stack.Screen
        name="IceDuelFishBattleTab"
        component={IceDuelFishBattleTab}
      />
      <Stack.Screen
        name="IceDuelFishBattleGameplay"
        component={IceDuelFishBattleGameplay}
      />
      <Stack.Screen
        name="IceDuelFishBattleResult"
        component={IceDuelFishBattleResult}
      />
    </Stack.Navigator>
  );
};

export default IceDuelFishBattleStack;
