import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

export default function App() {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometerSubscription, setAccelerometerSubscription] = useState(null);
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);

  const subscribeAccelerometer = () => {
    Accelerometer.setUpdateInterval(1000); // Atualiza a cada segundo
    setAccelerometerSubscription(
      Accelerometer.addListener(data => {
        setAccelerometerData(data);
      })
    );
  };

  const unsubscribeAccelerometer = () => {
    if (accelerometerSubscription) {
      accelerometerSubscription.remove();
      setAccelerometerSubscription(null);
    }
  };

  const subscribeGyroscope = () => {
    Gyroscope.setUpdateInterval(1000); // Atualiza a cada segundo
    setGyroscopeSubscription(
      Gyroscope.addListener(data => {
        setGyroscopeData(data);
      })
    );
  };

  const unsubscribeGyroscope = () => {
    if (gyroscopeSubscription) {
      gyroscopeSubscription.remove();
      setGyroscopeSubscription(null);
    }
  };

  const round = (value) => Math.round(value * 100) / 100; // Arredonda para 2 casas decimais
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leitura de Sensores</Text>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Acelerômetro</Text>
        <Text>Eixo X: {round(accelerometerData.x)}</Text>
        <Text>Eixo Y: {round(accelerometerData.y)}</Text>
        <Text>Eixo Z: {round(accelerometerData.z)}</Text>
        <Button
          onPress={accelerometerSubscription ? unsubscribeAccelerometer :
            subscribeAccelerometer}
          title={accelerometerSubscription ? "Parar Acelerômetro" : "Iniciar Acelerômetro"}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subHeader}>Giroscópio</Text>
        <Text>Eixo X: {round(gyroscopeData.x)}</Text>
        <Text>Eixo Y: {round(gyroscopeData.y)}</Text>
        <Text>Eixo Z: {round(gyroscopeData.z)}</Text>
        <Button
          onPress={gyroscopeSubscription ? unsubscribeGyroscope : subscribeGyroscope}
          title={gyroscopeSubscription ? "Parar Giroscópio" : "Iniciar Giroscópio"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 40,
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 10,
  },
});
