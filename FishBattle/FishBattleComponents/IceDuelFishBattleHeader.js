import { Image, StyleSheet, Text, View } from 'react-native';

const IceDuelFishBattleHeader = () => {
  return (
    <View style={styles.battleFishHeader}>
      <Text style={styles.battleFishHeaderText}>
        Welcome to Ice Duel Fish Battle
      </Text>
      <Image source={require('../../assets/images/fishbattleheadlogo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  battleFishHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff6f',
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 15,
  },
  battleFishHeaderText: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    color: '#fff',
    width: '70%',
  },
});

export default IceDuelFishBattleHeader;
