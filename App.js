import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { time: {} }
  }
  ticker() {
    let d = new Date();
    let hours = d.getHours() % 12;
    let h = hours == 6 ? 6 : hours > 6 ? hours - 6 : hours + 6;
    let m = d.getMinutes();
    let s = d.getSeconds();
    let t = { h, m, s };
    t.display = this.getDisplay(h, m, s);
    t.text = this.getText(h, m);
    this.setState({ time: t })
  }
  getText(h, m) {
    var text = ""
    if (m == 0) {
      text = "Saawa " + this.translator(h)
    } else if (m < 40 || h == 12) {
      text = "Saawa " + this.translator(h) + " n'edakiika " + this.translator(m)
    } else {
      text = "Ebula edakiika " + this.translator(60 - m) + " okuwela sawa " + this.translator(h + 1)
    }
    return text;
  }
  translator(num) {
    let text = "";
    let tens_index = Math.floor(num / 10) - 1;
    let ones_index = (num % 10) - 1;

    let luganda = {
      ones: ["emu", "bili", "satu", "nya", "taano", "mukaaga", "musanvu", "munaana", "mwenda"],
      tens: ["kumi", "abili", "asatu", "ana", "ataano"],
      joiners: [" n'", " na ", " mw'", " mu "]
    };

    if (num < 10) {
      text += luganda.ones[num - 1];
    } else if (num % 10 == 0) {
      text += luganda.tens[tens_index]
    } else {
      text += luganda.tens[tens_index];
      if (tens_index == 0) {
        if (ones_index == 0) {
          text += luganda.joiners[0];
        } else {
          text += luganda.joiners[1];
        }
      } else {
        if (ones_index == 0) {
          text += luganda.joiners[2];
        } else {
          text += luganda.joiners[3];
        }
      }
      text += luganda.ones[ones_index]
    }

    return text;
  }
  getDisplay(h, m, s) {
    let text = "";
    h = h > 9 ? h : "0" + h
    m = m > 9 ? m : "0" + m
    s = s > 9 ? s : "0" + s
    return h + " : " + m + " : " + s
  }
  componentDidMount() {
    this.intervalId = setInterval(this.ticker.bind(this), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timeText}>{this.state.time.display}</Text>
        <Text>{this.state.time.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 50,
    fontWeight: "100",
    marginBottom: 20
  }
});
