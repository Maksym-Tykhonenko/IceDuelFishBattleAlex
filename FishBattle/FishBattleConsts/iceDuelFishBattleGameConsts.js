export const fishBattleItems = {
  fire: [
    {
      id: 'fire-fish',
      img: require('../../assets/images/fishbattlegamefish1.png'),
    },
    { id: 'fire', img: require('../../assets/images/fishbattlegamefish4.png') },
  ],
  electric: [
    {
      id: 'electric-fish',
      img: require('../../assets/images/fishbattlegamefish2.png'),
    },
    {
      id: 'electric',
      img: require('../../assets/images/fishbattlegamefish5.png'),
    },
  ],
  water: [
    {
      id: 'water-fish',
      img: require('../../assets/images/fishbattlegamefish3.png'),
    },
    {
      id: 'water',
      img: require('../../assets/images/fishbattlegamefish6.png'),
    },
  ],
};

export const fishBattleRules = {
  fire: 'electric',
  electric: 'water',
  water: 'fire',
};

export const fishBattleHistoryItems = {
  fire: [
    require('../../assets/images/fishbattlegamefish1.png'),
    require('../../assets/images/fishbattlegamefish4.png'),
  ],
  electric: [
    require('../../assets/images/fishbattlegamefish2.png'),
    require('../../assets/images/fishbattlegamefish5.png'),
  ],
  water: [
    require('../../assets/images/fishbattlegamefish3.png'),
    require('../../assets/images/fishbattlegamefish6.png'),
  ],
};
