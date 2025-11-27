import { ImageBackground, ScrollView } from 'react-native';

const IceDuelFishBattleLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/fishbattleback.png')}
      style={{ flex: 1 }}
      blurRadius={2}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default IceDuelFishBattleLayout;
