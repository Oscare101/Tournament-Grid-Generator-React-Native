import { BreakingChangeType } from 'graphql'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native'

export default function Game(props) {
  // const [teams, setTeams] = useState(props.teams)
  const teams = props.teams

  const [listTeams, setListTeams] = useState([])
  const [winner, setwinner] = useState('')
  const [shuffle, setShuffle] = useState(props.shuffle)

  function MakeCouples(length) {
    let list = []
    for (let i = 0; i < length; i += 2) {
      // list.push([inputList[i], inputList[i + 1]])
      list.push([
        ['', true],
        ['', true],
      ])
    }
    listTeams.push(list)
    setListTeams([...listTeams])
    if (list.length >= 2) MakeCouples(list.length)
  }

  function RenderEveryVertical({ item, index }) {
    let indexlist = index

    if (listTeams.length - 1 == index) {
      return (
        <View
          style={{
            width: 150,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#000',
          }}
        >
          {item.map((i, index) => (
            <View style={styles.teamWinView} key={index}>
              <Text numberOfLines={1} style={styles.teamWinText}>
                {i[0]}
              </Text>
            </View>
          ))}
        </View>
      )
    }

    return (
      <View
        style={{
          width: 150,
          borderWidth: 1,
          borderColor: '#aaa',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item.map((i, index) => (
          <View
            style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}
            key={index}
          >
            <TouchableOpacity
              style={[
                styles.teamView,
                { backgroundColor: item[index][0][1] ? '#fff' : '#000' },
              ]}
              onPress={() => {
                if (listTeams[indexlist][index][1][0]) {
                  if (listTeams.length - 1 == indexlist) {
                  } else if (listTeams.length - 1 == indexlist + 1) {
                    listTeams[indexlist + 1][0] = item[index][0]
                    setwinner(item[index][0])
                    listTeams[indexlist][index][1][1] = false
                    listTeams[indexlist][index][0][1] = true
                  } else {
                    listTeams[indexlist + 1][Math.floor(index / 2)][
                      index % 2
                    ][0] = item[index][0]
                    listTeams[indexlist][index][1][1] = false
                    listTeams[indexlist][index][0][1] = true
                  }
                  setListTeams([...listTeams])
                }
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.teamText,
                    {
                      color: item[index][0][1] ? '#000' : '#666',
                    },
                  ]}
                >
                  {i[0]}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.teamView,
                { backgroundColor: item[index][1][1] ? '#fff' : '#000' },
              ]}
              onPress={() => {
                if (listTeams[indexlist][index][0][0]) {
                  if (listTeams.length - 1 == indexlist) {
                  } else if (listTeams.length - 1 == indexlist + 1) {
                    listTeams[indexlist + 1][0] = item[index][1]
                    setwinner(item[index][1])
                    listTeams[indexlist][index][0][1] = false
                    listTeams[indexlist][index][1][1] = true
                  } else {
                    listTeams[indexlist + 1][Math.floor(index / 2)][
                      index % 2
                    ][0] = item[index][1]
                    listTeams[indexlist][index][0][1] = false
                    listTeams[indexlist][index][1][1] = true
                  }

                  setListTeams([...listTeams])
                }
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.teamText,
                    {
                      color: item[index][1][1] ? '#000' : '#666',
                    },
                  ]}
                >
                  {i[1]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )
  }

  function SetFirstCol(t, index) {
    let teamsShuffle = shuffle ? t.sort((a, b) => 0.5 - Math.random()) : t
    ////////////////////
    let list = listTeams
    for (let i = 0; i < listTeams[index].length; i++) {
      list[index][i][0][0] = teamsShuffle[i * 2]
      list[index][i][1][0] = teamsShuffle[i * 2 + 1]
    }
  }

  useEffect(() => {
    MakeCouples(props.teams.length)
    listTeams.push([''])
    setListTeams([...listTeams])
    SetFirstCol(props.teams, 0)
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}></View>
      <StatusBar />
      <Text style={styles.title}>Game</Text>

      <FlatList
        horizontal={true}
        data={listTeams}
        renderItem={(item, index) => RenderEveryVertical(item, index)}
      />

      <View style={[styles.winnerView, { height: winner ? 70 : 0 }]}>
        <Text style={styles.winnerTeam}>{winner}</Text>
        <Text style={styles.winnerText}>is the winner</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onExit(teams, shuffle)}
      >
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
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
  teamView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  teamText: {
    fontSize: 20,
  },
  teamWinView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 2,
    borderRadius: 5,
  },
  teamWinText: {
    fontSize: 20,
  },
  winnerView: {
    width: '100%',
    alignItems: 'center',
  },
  winnerTeam: { fontSize: 25 },
  winnerText: { fontSize: 22 },
  button: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    letterSpacing: 1,
    fontSize: 20,
  },
})
