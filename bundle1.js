// Bundle 1 - Red Banner
// This is a pre-compiled bundle that can be loaded remotely

(function(global) {
  'use strict';
  
  // React Native ErrorUtils polyfill for Hermes
  global.ErrorUtils = global.ErrorUtils || {
    setGlobalHandler: function() {},
    getGlobalHandler: function() { return function() {}; },
    reportFatalError: function(error) { console.error('Fatal Error:', error); },
    reportSoftException: function(error) { console.warn('Soft Exception:', error); },
    reportError: function(error) { console.error('Error:', error); }
  };

  // Minimal RN bridge polyfill so native can call into JS
  global.__callableModules = global.__callableModules || {};
  if (typeof global.__fbBatchedBridge === 'undefined') {
    global.__fbBatchedBridge = {
      registerCallableModule: function(name, module) {
        global.__callableModules[name] = module;
      },
      getCallableModule: function(name) {
        return global.__callableModules[name];
      },
      callFunctionReturnFlushedQueue: function() { return null; },
      flushedQueue: function() { return null; },
      invokeCallbackAndReturnFlushedQueue: function() { return null; }
    };
  }
  if (!global.__callableModules['RCTDeviceEventEmitter']) {
    global.__fbBatchedBridge.registerCallableModule('RCTDeviceEventEmitter', {
      emit: function() {},
      addListener: function() {},
      removeAllListeners: function() {},
      removeListener: function() {}
    });
  }
  // Alias older global used by RN in some versions
  if (typeof global.__registerCallableModule === 'undefined') {
    global.__registerCallableModule = function(name, module) {
      if (global.__fbBatchedBridge && global.__fbBatchedBridge.registerCallableModule) {
        global.__fbBatchedBridge.registerCallableModule(name, module);
      }
    };
  }

  // React Native native module polyfills
  global.NativeModules = global.NativeModules || {};
  global.NativeEventEmitter = global.NativeEventEmitter || function() {};
  
  // RCTDeviceEventEmitter polyfill
  global.RCTDeviceEventEmitter = global.RCTDeviceEventEmitter || {
    emit: function() {},
    addListener: function() { return { remove: function() {} }; },
    removeAllListeners: function() {},
    removeListener: function() {}
  };

  // React Native AppRegistry polyfill
  global.AppRegistry = {
    registerComponent: function(name, componentProvider) {
      global.__APP_REGISTRY__ = global.__APP_REGISTRY__ || {};
      global.__APP_REGISTRY__[name] = componentProvider;
    },
    runApplication: function(name, params) {
      try {
        var provider = global.__APP_REGISTRY__ && global.__APP_REGISTRY__[name];
        if (typeof provider === 'function') {
          var Component = provider();
          var props = (params && params.initialProps) || {};
          global.__LAST_RENDERED__ = Component(props);
        }
      } catch (e) {
        if (global.ErrorUtils && global.ErrorUtils.reportError) {
          global.ErrorUtils.reportError(e);
        } else {
          console.error(e);
        }
      }
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

  // Bundle 1 Component - Red Banner
  function Bundle1(props) {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFE8E8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
      banner: {
        backgroundColor: '#FF0000',
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
        }, 'Bundle 1 Showing')
      ])
    ]);
  }

  // Register the component
  AppRegistry.registerComponent('Bundle1', () => Bundle1);

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Bundle1 };
  }

})(typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this)));
