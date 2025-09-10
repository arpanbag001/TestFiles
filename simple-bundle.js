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

  // StyleSheet polyfill
  global.StyleSheet = {
    create: function(styles) {
      return styles;
    }
  };

  // Main Remote App Component - Simple version
  function RemoteApp(props) {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props?.backgroundColor || '#f0f0f0',
        padding: 20
      },
      text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF0000', // Red color
        textAlign: 'center'
      }
    });

    return View({
      style: styles.container
    }, [
      Text({
        style: styles.text
      }, 'Hi from remote')
    ]);
  }

  // Register the component
  AppRegistry.registerComponent('RemoteApp', () => RemoteApp);

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RemoteApp };
  }

})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
