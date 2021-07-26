import {GIPHY_API_KEY} from "@env"
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
          View, Image, TextInput,Button,
          ScrollView, TouchableHighlight, SafeAreaView, 
          RefreshControl, ActivityIndicator, TouchableOpacity,
          Platform} from 'react-native';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Home = ({ navigation }) => {
    const [GifResults, setGifResults] = useState(null)

    const [searchRequest, setSearchRequest] = useState("")

    const [inputActivity, setInputActivity] = useState(false)

    // const [emptyInput, setEmptyInput] = useState(false)
    // const [cancelButton, setCancelButton] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      console.log(searchRequest)
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
                .then((data)=>{setGifResults(data.data)})
      setRefreshing(true);
      wait(100).then(() =>{setRefreshing(false)});
    }, [searchRequest]);

    useEffect(()=>{
      setRefreshing(true)
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setGifResults(data.data),setRefreshing(false)})
    }, [searchRequest])

    const showCloseInput = () => {
      // setEmptyInput(true)
      // setCancelButton(true)
      setInputActivity(true)
    }

    const removeCloseInput = () => {
      // setEmptyInput(false)
      // setCancelButton(false)
      setInputActivity(false)
      // setInputValue("")
      // setSearchRequest("")
    }

    const RemoveInputValue = () => {
      setInputValue("")
      setSearchRequest("")
    }

  return (
    <View style={styles.container}>
{/* NAV ELEMENTS */}
    <View style={styles.NavMenu}>
      <View style={inputActivity ? styles.inputSectionActive : styles.inputSection}>
        <Ionicons style={{marginRight:10.4}} name="search" size={19.2} color="gray" />
        <TouchableOpacity onPress={showCloseInput}>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            autoFocus={inputActivity}
            value={inputValue}
            editable={inputActivity}
            onTouchStart={showCloseInput}
            style={inputActivity ? styles.inputFieldActive : styles.inputField}
            placeholder="Placeholder"
            autocomplete="on"
            onChangeText={text => {setInputValue(text), setSearchRequest(text);}}/>
      </TouchableOpacity>
        {inputActivity && (
          <Ionicons style={{marginLeft:10.4}} name="close" size={19.2} color="gray" onPress={RemoveInputValue}/>
        )}
      </View> 
      {inputActivity && (
        <TouchableOpacity
          onPress={removeCloseInput}
          style={styles.CancelInputButton}>
            <Text>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
{/* END OF NAV ELEMENTS */}
{/* GIF RESULTS SECTION */}
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{flex:1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        {searchRequest ? (
          <View style={styles.gifcontainer}>
            {/* RENDERS A REQUESTED ARRAY OF GIFS  GifResults AND refreshing STATEMENT IS TRUE*/}
             {GifResults && !refreshing ?[   
               GifResults[0] ?[
              //MAPS AND RENDERS THE REQUESTED ARRAY OF GIFS 
                  GifResults.map((item)=>{
                    return (<TouchableHighlight key={item.id} style={styles.gifItem} onPress={() => {removeCloseInput, navigation.navigate('Details', { id: item.id, name:item.title})}}>
                              <Image key={item.id} style={styles.gif} source={{uri: item.images.downsized.url}}/>
                          </TouchableHighlight> )})
              // SHOWS "NO RESULTS" IN CASE IF GifResults IS EMPTY
               ]:<View style={{height: '100%', justifyContent:"center", alignItems:"center"}}>
                 <Text style={{color:"white"}}>No results for {(<Text style={{color:"white", fontWeight:"700"}}>{inputValue}</Text>)}</Text>
               </View>]:
             //SHOWS LOADING ANIMATION IF GITRESULTS IS NOT YET DEFINED OR STATE OF REFRESHING EQUEL TO TRUE
                <View style={styles.loadingAnimationContainer}>
                      <ActivityIndicator style={styles.loadingAnimation} size={80} color="gray" />
                </View>}
          </View>
//SETS DEFAULT SEARCH REQUEST IF STATE OF SEARCH REQUEST IS EMPTY AKA UNDENTYFIED
        ) : setSearchRequest("nature")}
      </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    NavMenu:{
      marginTop:52,
      flexDirection:"row",
      justifyContent:"center",
      marginBottom:12,
      ...Platform.select({
        ios: {
        },
        android: {
        },
        default: {
          backgroundColor: 'blue'
        }
      })
    },
    inputSection:{
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      width: 359,
      borderRadius:16,
      height: 56,
      backgroundColor:"#17181A",
      paddingHorizontal:18.4,
      borderColor:"gray",
      borderWidth : 1
    },
    inputSectionActive:{
      marginRight:8,
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      width: 264,
      borderRadius:16,
      height: 56,
      backgroundColor:"#17181A",
      paddingHorizontal:18.4,
      borderColor:"gray",
      borderWidth : 1
    },
    inputField:{
      width: 295,
      color: "white"
    },
    inputFieldActive:{
      width: 168,
      color:"white"
    },
    CancelInputButton:{
      width: 80,
      height: 56,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"white",
      borderRadius:8
    },
    gifcontainer:{
      display: "flex",
      justifyContent:"center",
      flexDirection:"row",
      flexWrap:"wrap",
    },
    gifItem:{
      margin:4,
      overflow: "hidden",
      borderRadius:16,
      overflow:"hidden" ,
    },
    gif:{
      height:176,
      width:176,
      borderRadius:16,
    },
    container: {
      flex: 1,
      backgroundColor:"#000",
      paddingTop: StatusBar.currentHeight,
    },
    loadingAnimationContainer:{
      flex:3, 
      alignItems:"center", 
      justifyContent:"center", 
    }
  });