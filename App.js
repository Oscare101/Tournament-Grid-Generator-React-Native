import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Game from './screens/Game'
import CreateTeams from './screens/CreateTeams'

export default function App() {
  const [isGame, setIsGame] = useState(false)
  const [teams, setTeams] = useState([])

  return isGame ? (
    <Game
      teams={teams}
      onExit={(teams) => {
        setIsGame(false)
        setTeams(teams)
      }}
    />
  ) : (
    <CreateTeams
      teams={teams}
      onStartGame={(teams) => {
        setIsGame(true)
        setTeams(teams)
      }}
    />
  )
}
