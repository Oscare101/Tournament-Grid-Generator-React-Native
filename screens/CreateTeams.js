import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const BigTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={1000}
    />
  )
}

export default function CreateTeams(props) {
  let teamsList = []
  for (let i = 0; i < props.teams.length; i++) {
    teamsList.push(props.teams[i])
  }

  const [input, setInput] = useState(teamsList.join('\n'))
  const [teams, setTeams] = useState(props.teams)
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')
  const [shuffle, setShuffle] = useState(props.shuffle)

  function CheckUnic() {
    if (input.toString().split('\n').length < 2) {
      setError('Must be at least 2 teams')
    } else {
      let list = input
        .toString()
        .split('\n')
        .filter(Boolean)
        .filter((x, i, a) => a.indexOf(x) == i)

      if (list.length == input.toString().split('\n').filter(Boolean).length) {
        for (let n = 1; n < list.length; n++) {
          if (2 ** n == list.length) {
            setTeams(list)
            setChecked(true)
            setError('You are ready to play!')
            break
          } else {
            setError(
              'Wrong amount of teams. Must be 2**n teams (2, 4, 8, 16 ...)'
            )
          }
        }
      } else {
        setError('All teams must have unique names')
      }
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>Create Teams</Text>

        <BigTextInput
          multiline
          numberOfLines={4}
          onChangeText={(text) => {
            setInput(text)
            setChecked(false)
            setError('')
          }}
          value={input}
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShuffle(!shuffle)}
          style={styles.suffleView}
        >
          <View style={styles.iconBlock}>
            <FontAwesome5
              name="check"
              size={20}
              color={shuffle ? '#000' : '#fff'}
            />
          </View>
          <Text style={styles.shuffleText}>Shuffle teams</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            checked ? props.onStartGame(teams, shuffle) : CheckUnic()
          }
          style={[
            styles.button,
            { backgroundColor: checked ? '#000' : '#fff' },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: checked ? '#fff' : '#000' }]}
          >
            {checked ? 'Start game' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.errorText, { color: checked ? '#329D00' : '#870000' }]}
        >
          {error}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  suffleView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconBlock: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  shuffleText: {
    fontSize: 20,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
    marginVertical: 10,
  },
  buttonText: {
    letterSpacing: 1,
    fontSize: 20,
  },
  errorText: {
    fontSize: 18,
    alignSelf: 'center',
  },
})
