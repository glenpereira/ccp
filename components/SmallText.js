import {View, Text, StyleSheet} from 'react-native'

import Colors from '../constants/colors'

function SmallText({children}) {
  return (
    <View >
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default SmallText

const styles = StyleSheet.create({
  text: {
    color: Colors.ccpBlack,
    fontSize: 19,
  }
})