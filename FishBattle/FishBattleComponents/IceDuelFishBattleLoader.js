import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import IceDuelFishBattleLayout from './IceDuelFishBattleLayout';

const IceDuelFishBattleLoader = () => {
  const welcomeFishBattleLoaderHTML = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=0.7" />

<style>
  body {
    margin: 0;
    background: transparent;
    overflow: hidden;
  }

  @keyframes square-animation {
    0% { left: 0; top: 0; }
    10.5% { left: 0; top: 0; }

    12.5% { left: 32px; top: 0; }
    23%   { left: 32px; top: 0; }

    25% { left: 64px; top: 0; }
    35.5% { left: 64px; top: 0; }

    37.5% { left: 64px; top: 32px; }
    48%   { left: 64px; top: 32px; }

    50% { left: 32px; top: 32px; }
    60.5% { left: 32px; top: 32px; }

    62.5% { left: 32px; top: 64px; }
    73%   { left: 32px; top: 64px; }

    75% { left: 0; top: 64px; }
    85.5% { left: 0; top: 64px; }

    87.5% { left: 0; top: 32px; }
    98%   { left: 0; top: 32px; }

    100% { left: 0; top: 0; }
  }

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 96px;
    height: 96px;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .loader-square {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: 2px;
    background: white;
    border-radius: 0px;
    animation: square-animation 10s ease-in-out infinite both;
  }

  .loader-square:nth-of-type(1) { animation-delay: 0s; }
  .loader-square:nth-of-type(2) { animation-delay: -1.4285714286s; }
  .loader-square:nth-of-type(3) { animation-delay: -2.8571428571s; }
  .loader-square:nth-of-type(4) { animation-delay: -4.2857142857s; }
  .loader-square:nth-of-type(5) { animation-delay: -5.7142857143s; }
  .loader-square:nth-of-type(6) { animation-delay: -7.1428571429s; }
  .loader-square:nth-of-type(7) { animation-delay: -8.5714285714s; }

</style>
</head>

<body>
  <div class="loader">
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
    <div class="loader-square"></div>
  </div>
</body>
</html>
  `;

  return (
    <IceDuelFishBattleLayout>
      <View style={styles.winnetagolfcont}>
        <Image
          source={require('../../assets/images/fishbattleloader.png')}
          style={{ bottom: 45 }}
        />
      </View>

      <View style={styles.winnetagolfwrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomeFishBattleLoaderHTML }}
          style={{ width: 180, height: 150, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </IceDuelFishBattleLayout>
  );
};

const styles = StyleSheet.create({
  winnetagolfwrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  winnetagolfcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 620,
  },
});

export default IceDuelFishBattleLoader;
