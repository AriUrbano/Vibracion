import React, { useState } from 'react';
import { 
  View, 
  Button, 
  Vibration, 
  Text, 
  TextInput, 
  StyleSheet,
  Platform 
} from 'react-native';

const VibracionApp = () => {
  const [tiempoVibracion, setTiempoVibracion] = useState('500');
  const [patronVibracion, setPatronVibracion] = useState('500,200,300,100');

  const vibrarDispositivo = () => {
    const tiempo = parseInt(tiempoVibracion) || 500;
    if (tiempo > 0) {
      Vibration.vibrate(tiempo);
    }
  };

  const vibrarConPatron = () => {
    if (!patronVibracion) return;

    try {
      const patron = patronVibracion
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num) && num > 0);

      if (patron.length > 0) {
        if (Platform.OS === 'android') {
          Vibration.vibrate(patron, true);
        } else {
          Vibration.vibrate(patron);
        }
      }
    } catch (error) {
      // Sin mensajes, solo no vibra si hay error
    }
  };

  const cancelarVibracion = () => {
    Vibration.cancel();
  };

  const patronNotificacion = () => {
    Vibration.vibrate([0, 500, 200, 500]);
  };

  const patronAlerta = () => {
    Vibration.vibrate([100, 100, 100, 100, 100, 500]);
  };

  const patronSOS = () => {
    Vibration.vibrate([200, 100, 200, 100, 200, 500]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control de Vibración</Text>
      
      {/* Control de tiempo simple */}
      <View style={styles.seccion}>
        <Text style={styles.label}>Vibración simple (ms):</Text>
        <TextInput
          style={styles.input}
          value={tiempoVibracion}
          onChangeText={setTiempoVibracion}
          keyboardType="numeric"
          placeholder="Ej: 500"
        />
        <Button 
          title={`Vibrar ${tiempoVibracion}ms`} 
          onPress={vibrarDispositivo} 
        />
      </View>

      {/* Patrón personalizado */}
      <View style={styles.seccion}>
        <Text style={styles.label}>Patrón personalizado:</Text>
        <Text style={styles.ejemplo}>Formato: vibra,pausa,vibra,pausa...</Text>
        <TextInput
          style={styles.input}
          value={patronVibracion}
          onChangeText={setPatronVibracion}
          placeholder="Ej: 500,200,300,100"
        />
        <Button 
          title="Probar patrón" 
          onPress={vibrarConPatron} 
        />
      </View>

      {/* Vibraciones predefinidas */}
      <View style={styles.seccionPredefinidas}>
        <Text style={styles.label}>Patrones de prueba:</Text>
        <View style={styles.botonesPredefinidos}>
          <Button 
            title="🔔 Notificación" 
            onPress={patronNotificacion} 
            color="#2C3E50"
          />
          <View style={styles.espacioBotones} />
          <Button 
            title="🚨 Alerta" 
            onPress={patronAlerta} 
            color="#2C3E50"
          />
          <View style={styles.espacioBotones} />
          <Button 
            title="🆘 SOS" 
            onPress={patronSOS} 
            color="#2C3E50"
          />
        </View>
      </View>

      {/* Cancelar */}
      <View style={styles.seccion}>
        <Button 
          title="❌ Cancelar Vibración" 
          onPress={cancelarVibracion}
          color="#C0392B"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C3E50',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
    textShadowColor: '#E74C3C',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  seccion: {
    marginBottom: 15,
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  seccionPredefinidas: {
    marginBottom: 15,
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E74C3C',
    marginTop: 10,
  },
  botonesPredefinidos: {
    flexDirection: 'column',
  },
  espacioBotones: {
    height: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ECF0F1',
  },
  ejemplo: {
    fontSize: 12,
    color: '#E74C3C',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E74C3C',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#ECF0F1',
    color: '#2C3E50',
    fontSize: 16,
  },
  info: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default VibracionApp;