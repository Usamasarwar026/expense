import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PieChart from '../../components/pieChart/PieChart'

export default function Budget() {
  return (
    <View style={Style.container}>
      <Text style={Style.text}>No Budget Found Here</Text>
      {/* <PieChart/> */}
    </View>
  )
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 90,
    color: '#555',
  }
  
})