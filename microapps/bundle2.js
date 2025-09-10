import React, {useCallback, useEffect, useState} from 'react'
import {AppRegistry, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

function BundleTwoApp() {
  const [messages, setMessages] = useState([])

  const onMessage = useCallback(payload => {
    setMessages(prev => [...prev, `From host: ${JSON.stringify(payload)}`])
  }, [])

  useEffect(() => {
    if (globalThis.setOnMessage) {
      globalThis.setOnMessage(onMessage)
    }
  }, [onMessage])

  const pingHost = () => {
    if (globalThis.postMessage) {
      globalThis.postMessage({source: 'BundleTwoApp', ts: new Date().toISOString()})
    }
  }

  return (
    <SafeAreaView style={[styles.root, {backgroundColor: '#E3F2FD'}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Bundle 2</Text>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#1E88E5'}]} onPress={pingHost}>
        <Text style={styles.buttonText}>Ping Host</Text>
      </TouchableOpacity>
      <View style={styles.logArea}>
        {messages.map((m, i) => (
          <Text key={i} style={styles.logLine}>{m}</Text>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  logArea: {
    flex: 1,
  },
  logLine: {
    fontFamily: 'Courier',
    marginBottom: 6,
  },
})

AppRegistry.registerComponent('BundleTwoApp', () => BundleTwoApp)


