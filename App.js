import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Game from './screens/Game'
import CreateTeams from './screens/CreateTeams'

export default function App() {
  const [isGame, setIsGame] = useState(false)
  const [teams, setTeams] = useState([])
  const [shuffle, setShuffle] = useState(false)

  return isGame ? (
    <Game
      teams={teams}
      shuffle={shuffle}
      onExit={(teams, shuffle) => {
        setShuffle(shuffle)
        setIsGame(false)
        setTeams(teams)
      }}
    />
  ) : (
    <CreateTeams
      teams={teams}
      shuffle={shuffle}
      onStartGame={(teams, shuffle) => {
        setIsGame(true)
        setShuffle(shuffle)
        setTeams(teams)
      }}
    />
  )
}
