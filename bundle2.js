// Bundle 2 - Green Banner
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

  // Bundle 2 Component - Green Banner
  function Bundle2(props) {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#E8F5E8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
      banner: {
        backgroundColor: '#00AA00',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
      },
      bannerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
      }
    });

    return View({
      style: styles.container
    }, [
      View({
        style: styles.banner
      }, [
        Text({
          style: styles.bannerText
        }, 'Bundle 2 Showing')
      ])
    ]);
  }

  // Register the component
  AppRegistry.registerComponent('Bundle2', () => Bundle2);

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Bundle2 };
  }

})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);