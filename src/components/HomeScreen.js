import React from 'react'
import { View, Text, Touchable, TouchableOpacity } from 'react-native'

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}><Text>Cringe</Text></TouchableOpacity>
    </View>
  )
}
