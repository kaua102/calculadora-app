import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberPress = (num) => {
    if (waitingForNewValue){
      setDisplay(String(num))
      setWaitingForNewValue (false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  }

  const handleOperatorPress = (op) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else {
      const result = calculate (previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperator(op);
  }

  const calculate = (firstValue, secondValue, operator) => {
    switch (operator){
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      default: return secondValue;
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue != null && operator){
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  }

  const handlePercentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  }

  const handleToggleSing = () => {
    setDisplay(String(parseFloat(display) * -1));
  }

  const handleDecimal = () => {
    if (waitingForNewValue){
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1){
      setDisplay(display + '.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontsize: 48}}>Hello word!</Text>
      <StatusBar style="light" />

      <View style={styles.displayConteiner}>
        <Text style={styles.displayText} numberOfLines={1}>
           {display}
        </Text>
      </View>
        {/*Linha 1*/}
      <View style={styles.row}>
        <TouchableOpacity style={styles.functionButton} onPress={handleClear}>
          <Text style={styles.functionText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.functionButton} onPress={handleToggleSing}>
          <Text style={styles.functionText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.functionButton} onPress={handlePercentage}>
          <Text style={styles.functionText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorPress('÷')}>
          <Text style={styles.operatorText}>÷</Text>
        </TouchableOpacity>
      </View>
        {/*Linha 2*/}
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(7)}>
          <Text style={styles.buttomText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(8)}>
          <Text style={styles.buttomText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(9)}>
          <Text style={styles.buttomText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorPress('x')}>
          <Text style={styles.operatorText}>X</Text>
        </TouchableOpacity>
      </View>
        {/*Linha 3*/}
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(4)}>
          <Text style={styles.buttomText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(5)}>
          <Text style={styles.buttomText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(6)}>
          <Text style={styles.buttomText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorPress('-')}>
          <Text style={styles.operatorText}>-</Text>
        </TouchableOpacity>
      </View>
        {/*Linha 4*/}
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(3)}>
          <Text style={styles.buttomText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(2)}>
          <Text style={styles.buttomText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress(1)}>
          <Text style={styles.buttomText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorPress('+')}>
          <Text style={styles.operatorText}>+</Text>
        </TouchableOpacity>
      </View>
        {/*Linha 5*/}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonNumber, styles.doubleWidthButton]} onPress={() => handleNumberPress(0)}>
          <Text style={styles.buttomText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={handleDecimal}>
          <Text style={styles.buttomText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={handleEquals}>
          <Text style={styles.operatorText}>=</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
  },
  displayConteiner: {
    flex: 2.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 72,
    fontWeight: '300',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  functionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 50,
    height: '75%',
    backgroundColor: '#A5A5A5',
  },
  functionText: {
    color: '#000',
    fontSize: 28,
  },
  operatorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 50,
    height: '75%',
    backgroundColor: '#FF9500',
  },
  operatorText: {
    color: '#fff',
    fontSize: 28,
  },
  buttonNumber: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 50,
    height: '75%',
    backgroundColor: '#333333',
  },
  buttomText: {
    color: '#fff',
    fontSize: 28,
  },
  doubleWidthButton: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 32,
  },
});