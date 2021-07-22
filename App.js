import React from 'react';
import {Home} from "./src/pages/Home"
import {Details} from "./src/pages/GifDetails"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk';

// import { composeWithDevTools } from 'remote-redux-devtools';

// import rootReducers from "./src/redux/reducers/AllReducers"

// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

// const store = createStore(rootReducers, applyMiddleware(
//                                           composeWithDevTools({
//                                             port: 5678,
//                                             hostname: "localhost"
//                                           })
//                                         ))

// eslint-disable-next-line no-debugger
// debugger;

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}/>
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  )
}


