import {GIPHY_API_KEY} from "@env"

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
          View, Image, 
          TextInput,Button,
          ScrollView, TouchableHighlight, 
          SafeAreaView, RefreshControl,
          ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Home = ({ navigation }) => {
    const [GifResults, setGifResults] = useState(null)

    const [searchRequest, setSearchRequest] = useState("")
    const [emptyInput, setEmptyInput] = useState(false)
    const [cancelButton, setCancelButton] = useState(false)
    const [inputValue, setInputValue] = useState(" ")

    const [refreshing, setRefreshing] = React.useState(false);
    // const refreshResults = () =>{
    //   fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=10&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
    //           .then((data)=>{console.log(data.data)})
    // }

    const onRefresh = React.useCallback(() => {
      console.log(searchRequest)
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
                .then((data)=>{setGifResults(data.data)})
      setRefreshing(true);
      wait(100).then(() =>{setRefreshing(false)});
    }, [searchRequest]);

    useEffect(()=>{
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setGifResults(data.data)})
    }, [searchRequest])

    const showClearInput = () => {
      setEmptyInput(true)
      setCancelButton(true)
    }

    const removeClearInput = () => {
      setEmptyInput(false)
      setCancelButton(false)
    }

    const RemoveInputValue = () => {
      setInputValue(" ")
    }

  return (
    <View style={styles.container}>
{/* INPUT_BAR AND SUBMIT BUTTON */}
    <View style={styles.NavMenu}>
      <View style={styles.inputSection}>
        <Ionicons style={styles.Icon} name="search" size={32} color="green" />
        <TextInput
          onTouchStart={showClearInput}
          style={styles.inputField}
          placeholder="Placeholder"
          autocomplete="on"
          onChangeText={text => setSearchRequest(text)}/>
        {emptyInput && (
          <Ionicons style={styles.Icon} name="close" size={32} color="blue" onPress={RemoveInputValue}/>
        )}
      </View> 
      {cancelButton && (
        <Button
        title="cancel"
        onPress={removeClearInput}/>
      )}
    </View>
{/* GIF RESULTS SECTION */}
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        {searchRequest ? (
          <View style={styles.gifcontainer}>
             {GifResults && !refreshing ?[   
               GifResults[0] ?[
                  GifResults.map((item)=>{
                    return (<TouchableHighlight style={styles.gifItem} onPress={() => navigation.navigate('Details', { id: item.id, name:item.title})}>
                              <Image key={item.id} style={{height:195, width:195}} source={{uri: item.images.downsized.url}}/>
                          </TouchableHighlight> )})
               ]:<Text>No results</Text>

             ] : <View style={{flex:1, alignItems:"center", justifyContent:"center", height:600}}>
                    <ActivityIndicator size={80} color="lightgrey" />
                </View>}
          </View>
        ) : setSearchRequest("nature")}
      </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    NavMenu:{
      flexDirection:"row",
    },
    inputSection:{
      margin:6,
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      alignSelf: 'stretch',
      borderRadius:16,
      height: 56,
      backgroundColor:"white",
      paddingHorizontal:16,
      backgroundColor:"white",
      borderColor:"grey",
      borderWidth : 1
    },
    inputField:{
      width: 200,
    },
    gifcontainer:{
      margin: 2,
      flexDirection:"row",
      flexWrap:"wrap",
    },
    gifItem:{
      margin:4, 
      borderRadius:16, 
      overflow: 'hidden'
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    }
  });