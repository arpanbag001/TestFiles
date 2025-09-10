import React, {useCallback, useEffect, useState} from 'react'
import {AppRegistry, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

function BundleOneApp() {
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
      globalThis.postMessage({source: 'BundleOneApp', ts: new Date().toISOString()})
    }
  }

  return (
    <SafeAreaView style={[styles.root, {backgroundColor: '#E8F5E9'}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Bundle 1</Text>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#43A047'}]} onPress={pingHost}>
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

AppRegistry.registerComponent('BundleOneApp', () => BundleOneApp)


