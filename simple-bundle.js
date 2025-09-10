// Simple React Native bundle for remote loading
// This is a pre-compiled bundle that can be loaded remotely

(function(global) {
  'use strict';

  // React Native AppRegistry polyfill
  global.AppRegistry = {
    registerComponent: function(name, component) {
      global.__APP_REGISTRY__ = global.__APP_REGISTRY__ || {};
      global.__APP_REGISTRY__[name] = component;
    }
  };

  // React Native components polyfill
  global.React = {
    createElement: function(type, props, ...children) {
      return {
        type: type,
        props: props || {},
        children: children
      };
    },
    useState: function(initialValue) {
      const state = { current: initialValue };
      return [
        state.current,
        function(newValue) {
          state.current = newValue;
          // Trigger re-render (simplified)
          if (global.__RENDER_CALLBACK__) {
            global.__RENDER_CALLBACK__();
          }
        }
      ];
    },
    useEffect: function(callback, deps) {
      // Simplified useEffect - just call immediately
      callback();
    }
  };

  // React Native View components
  global.View = function(props) {
    return {
      type: 'View',
      props: props || {},
      style: props?.style || {}
    };
  };

  global.Text = function(props) {
    return {
      type: 'Text',
      props: props || {},
      style: props?.style || {}
    };
  };

  global.TouchableOpacity = function(props) {
    return {
      type: 'TouchableOpacity',
      props: props || {},
      style: props?.style || {}
    };
  };

  global.TextInput = function(props) {
    return {
      type: 'TextInput',
      props: props || {},
      style: props?.style || {}
    };
  };

  global.ScrollView = function(props) {
    return {
      type: 'ScrollView',
      props: props || {},
      style: props?.style || {}
    };
  };

  global.Alert = {
    alert: function(title, message, buttons) {
      console.log('Alert:', title, message);
      if (global.postMessage) {
        global.postMessage({
          type: 'alert',
          title: title,
          message: message,
          timestamp: new Date().toISOString()
        });
      }
    }
  };

  // StyleSheet polyfill
  global.StyleSheet = {
    create: function(styles) {
      return styles;
    }
  };

  // Main Remote App Component
  function RemoteApp(props) {
    const [counter, setCounter] = React.useState(0);
    const [messages, setMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isOnline, setIsOnline] = React.useState(true);

    const sourceName = props?.sourceName || 'Remote App';
    const backgroundColor = props?.backgroundColor || '#e8f4fd';
    const theme = props?.theme || 'light';
    const userId = props?.userId || 'unknown';

    // Simulate online status
    React.useEffect(() => {
      const interval = setInterval(() => {
        setIsOnline(Math.random() > 0.1);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    // Message handler
    React.useEffect(() => {
      const handleMessage = (payload) => {
        const message = `📨 Received: ${JSON.stringify(payload)}`;
        setMessages(prev => [...prev, message]);
      };

      if (global.setOnMessage) {
        global.setOnMessage(handleMessage);
      }
    }, []);

    const sendMessage = () => {
      const message = {
        type: 'remote_message',
        data: inputText || `Hello from ${sourceName}!`,
        timestamp: new Date().toISOString(),
        counter: counter,
        userId: userId,
        source: sourceName
      };

      if (global.postMessage) {
        global.postMessage(message);
      }
      setCounter(prev => prev + 1);
      setInputText('');
    };

    const sendRandomData = () => {
      const randomData = {
        type: 'random_data',
        randomNumber: Math.floor(Math.random() * 1000),
        timestamp: new Date().toISOString(),
        source: sourceName
      };

      if (global.postMessage) {
        global.postMessage(randomData);
      }
    };

    const showAlert = () => {
      Alert.alert(
        'Remote Bundle Alert',
        `This alert is from the remote bundle!\n\nSource: ${sourceName}\nUser: ${userId}\nCounter: ${counter}`
      );
    };

    const clearMessages = () => {
      setMessages([]);
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: backgroundColor,
        padding: 16
      },
      header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: theme === 'dark' ? '#444' : '#ddd'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme === 'dark' ? '#fff' : '#333',
        marginBottom: 8
      },
      subtitle: {
        fontSize: 16,
        color: theme === 'dark' ? '#ccc' : '#666'
      },
      statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
        backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
        borderRadius: 8
      },
      statusText: {
        fontSize: 14,
        fontWeight: '500'
      },
      onlineStatus: {
        color: isOnline ? '#4CAF50' : '#F44336'
      },
      counter: {
        color: theme === 'dark' ? '#fff' : '#333'
      },
      input: {
        borderWidth: 1,
        borderColor: theme === 'dark' ? '#555' : '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        marginBottom: 8
      },
      button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 8
      },
      buttonSecondary: {
        backgroundColor: '#34C759'
      },
      buttonDanger: {
        backgroundColor: '#FF3B30'
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
      },
      messagesContainer: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#222' : '#f9f9f9',
        borderRadius: 8,
        padding: 12
      },
      messagesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme === 'dark' ? '#fff' : '#333',
        marginBottom: 8
      },
      message: {
        fontSize: 14,
        color: theme === 'dark' ? '#ccc' : '#666',
        marginBottom: 4,
        padding: 4,
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        borderRadius: 4
      },
      emptyMessages: {
        textAlign: 'center',
        color: theme === 'dark' ? '#888' : '#999',
        fontStyle: 'italic',
        marginTop: 20
      }
    });

    return View({
      style: styles.container
    }, [
      View({
        style: styles.header
      }, [
        Text({
          style: styles.title
        }, `🌐 ${sourceName}`),
        Text({
          style: styles.subtitle
        }, 'Remote Bundle v1.0.0')
      ]),
      View({
        style: styles.statusBar
      }, [
        Text({
          style: [styles.statusText, styles.onlineStatus]
        }, isOnline ? '🟢 Online' : '🔴 Offline'),
        Text({
          style: [styles.statusText, styles.counter]
        }, `Counter: ${counter}`),
        Text({
          style: styles.statusText
        }, `User: ${userId}`)
      ]),
      TextInput({
        style: styles.input,
        placeholder: 'Enter message to send...',
        value: inputText,
        onChangeText: setInputText
      }),
      TouchableOpacity({
        style: styles.button,
        onPress: sendMessage
      }, [
        Text({
          style: styles.buttonText
        }, '📤 Send Message')
      ]),
      TouchableOpacity({
        style: [styles.button, styles.buttonSecondary],
        onPress: sendRandomData
      }, [
        Text({
          style: styles.buttonText
        }, '🎲 Send Random Data')
      ]),
      TouchableOpacity({
        style: [styles.button, styles.buttonDanger],
        onPress: showAlert
      }, [
        Text({
          style: styles.buttonText
        }, '⚠️ Show Alert')
      ]),
      TouchableOpacity({
        style: [styles.button, styles.buttonDanger],
        onPress: clearMessages
      }, [
        Text({
          style: styles.buttonText
        }, '🗑️ Clear Messages')
      ]),
      View({
        style: styles.messagesContainer
      }, [
        Text({
          style: styles.messagesTitle
        }, '📨 Received Messages'),
        ScrollView({}, messages.length === 0 ? [
          Text({
            style: styles.emptyMessages
          }, 'No messages received yet. Send a message from the host app!')
        ] : messages.map((message, index) => 
          Text({
            key: index,
            style: styles.message
          }, message)
        ))
      ])
    ]);
  }

  // Register the component
  AppRegistry.registerComponent('RemoteApp', () => RemoteApp);

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RemoteApp };
  }

})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
