//MPOERTED MATERIALS
import {GIPHY_API_KEY} from "@env"
import { StatusBar } from 'expo-status-bar';
//FOR ICONS
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
//REACT
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
          View, Image, TextInput,
          ScrollView, TouchableHighlight, SafeAreaView, 
          RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';

//WAIT FUNCTION FOR OnRefresh FUNCTION Line: 33
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//MAIN COMPONENT
export const Home = ({ navigation }) => {
  //STATE TO STORE FETCHED DATA FROM REQUEST FOR GIFS
    const [GifResults, setGifResults] = useState(null)

  //STORES STATE OF INPUT VALUE FOR REQUEST LINK TO FIND THE DATA
    const [searchRequest, setSearchRequest] = useState("")

  //STATE RESPONSIBLE FOR APPLYING DIFFERENT DISPLAY AND STYLES FOR INPUT SECTION 
    const [inputActivity, setInputActivity] = useState(false)

  //STATE FOR CLEARING OF THE <TEXT INPUT>
    const [inputValue, setInputValue] = useState("")

  //STATE THAT IDENTIFIES IF SOMETHING REFREHSING OR NOT
    const [refreshing, setRefreshing] = React.useState(false);

  //FUNCTION THAT REFRESHES CURRENT gitResults FOR NEW ONE
    const onRefresh = React.useCallback(() => {
  //WHEN refreshing IS TRUE, CONDITIONAL RENDERING METHOD AT Line: 111, WILL SET LOADING ANIMATION 
      setRefreshing(true)
  //THIS REQUEST SETS IT'S FETCHED ARRAY OF OBJECTS WITH GIFS FOR 
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
                .then((data)=>{setGifResults(data.data)})
      wait(100).then(() =>{setRefreshing(false)});
    }, [searchRequest]);

  //DEFAULT REQUEST AND WILL UPDATE WHEN searchRequest IS CHANGED
    useEffect(()=>{
      setRefreshing(true)
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=20&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setGifResults(data.data),setRefreshing(false)})
    }, [searchRequest])

  //FUNCTION TO SHOW CANCEL BUTTON TO DISABLE INPUT FIELD AND BUTTON TO CLEAR THE INPUT FIELD
    const showCloseInput = () => {
      setInputActivity(true)
    }
  //FUNCTION TO HIDE CANCEL BUTTON TO DISABLE INPUT FIELD AND BUTTON TO CLEAR THE INPUT FIELD
    const removeCloseInput = () => {
      setInputActivity(false)
      
    }
  //FUNCTION FOR BUTTON TO CLEAR INPUT VALUE IN <TEXT_INPUT> AND SET NEW SEARCH REQUEST
    const RemoveInputValue = () => {
      setInputValue("")
      setSearchRequest("")
    }

  return ( 
    <View style={styles.container}>
{/*START OF NAV */}
    <View style={styles.NavMenu}>
    {/* CHECKS WHEN <TEXT INPUT> IS ACTIVE BY CHEKCING inputActivity STATE FOR APPLYING STYLES TO THE INPUT SECTION*/}
      <View style={inputActivity ? styles.inputSectionActive : styles.inputSection}>
        <Ionicons style={{marginRight:10.4}} name="search" size={19.2} color="gray" />
        <TouchableOpacity onPress={showCloseInput}>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
        //AUTO FOCUS ON TEXT INPUT WHEN inputActivity IS TRUE
            autoFocus={inputActivity}
        //VALUE ATTRIBUTE WITH STATE OF inputValue
            value={inputValue}
        //ENABLES TEXT INPUT WHEN inputActivity IS TRUE
            editable={inputActivity}
        //ON TOUCH RUN showCloseInput TO SHOW CANCEL BUTTON TO DISABLE INPUT FIELD AND BUTTON TO CLEAR THE INPUT FIELD
            onTouchStart={showCloseInput}
        //WHEN STATE OF inputActivity IS TRUE, IT APPLIES inputFieldActive STYLE TO SHIRK <INPUT TEXT> INPUT
            style={inputActivity ? styles.inputFieldActive : styles.inputField}
            placeholder="Placeholder"
            autocomplete="on"
        //SETS NEW STATE FOR inputValue AND searchRequest WHEN USER IS TYPING
            onChangeText={text => {setInputValue(text), setSearchRequest(text);}}/>
      </TouchableOpacity>
      {/* WHEN STATE OF inputActivity IS TRUE, IT RENDERS BUTTON TO CLEAR INPUT VALUE OF TEXT INPUT */}
        {inputActivity && (
          <AntDesign style={{marginLeft:10.4}} name="closecircle" size={19.2} color="gray" onPress={RemoveInputValue}/>
        )}
      </View> 
      {/* WHEN STATE OF inputActivity IS TRUE, IT RENDERS BUTTON TO DISABLE TEXT INPUT, AND HIDE ITSELF WITH CLEAR BUTTON*/}
      {inputActivity && (
        <TouchableOpacity
          onPress={removeCloseInput}
          style={styles.CancelInputButton}>
            <Text>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
{/* END OF NAV */}
{/* GIF RESULTS SECTION */}
        {searchRequest ? (
          <View style={styles.gifcontainer}>
            {/* RENDERS A REQUESTED ARRAY OF GIFS  GifResults AND refreshing STATEMENT IS TRUE*/}
             {GifResults && !refreshing ?[   
               //CHECKD IF GifResults IS EMPTY AKA IF GifResults ARRAY IS EMPTY, IT SHOULD RENDER MESSAGE THAT NO RESULTS FOUND FOR THIS KEYWORD AT Line:134-136 
               GifResults.length ?[
              //MAPS AND RENDERS THE REQUESTED ARRAY OF GIFS 
              <SafeAreaView>
                {/* COMPONENT FOR ABILITY TO SCROLL THROUGH FLAT LIST */}
                <ScrollView
                //REFRESH COMPONENT TO TRIGGER FUNCTION onRefresh
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>
                  <View style={{display: "flex", justifyContent:"center", flexDirection:"row", flexWrap:"wrap",}}>
                  {
                  //MAPS THROUGH STATE OF GifResults TO RENDER ARRAY OF FETCHED GIF ITEM IN FORM OF OBJECTS
                  GifResults.map((item)=>{
                    //WHEN GIF ITEM WAS PRESSESD, IT WILL NAVIGATE TO DETAILS WITH GifDetails.jsx COMPONENT WITH GIF ID TO FETCH THE PRESSED GIF
                    return (<TouchableHighlight key={item.id} style={styles.gifItem} onPress={() => {navigation.navigate('Details', { id: item.id, name:item.title})}}>
                              <Image style={styles.gif} source={{uri: item.images.downsized.url}}/>
                          </TouchableHighlight> )})
                  }
                  </View>
                </ScrollView>
                </SafeAreaView>
              // SHOWS "NO RESULTS" IN CASE IF GifResults IS EMPTY AKA REQUEST CAN'T FIND REQUESTED DATA
               ]:<View style={{height: '100%', justifyContent:"center", alignItems:"center"}}>
                 <Text style={{color:"white"}}>No results for {(<Text style={{color:"white", fontWeight:"700"}}>{inputValue}</Text>)}</Text>
               </View>]:
             //SHOWS LOADING ANIMATION IF GITRESULTS IS NOT YET DEFINED OR STATE OF REFRESHING EQUAL TO TRUE
                <View style={styles.loadingAnimationContainer}>
                      <ActivityIndicator style={styles.loadingAnimation} size={80} color="gray" />
                </View>}
          </View>
//SETS DEFAULT SEARCH REQUEST IF STATE OF SEARCH REQUEST IS EMPTY AKA UNDENTYFIED SO THE SCREEN WITH RESULTS ISN'T EMPTY
        ) : setSearchRequest("nature")}
      <StatusBar style="auto" />
    </View>
  );
}

//STYLES
const styles = StyleSheet.create({
    NavMenu:{
      marginTop:52,
      flexDirection:"row",
      justifyContent:"center",
      marginBottom:12,
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
      height: 24,
      color: "white"
    },

    inputFieldActive:{
      width: 168,
      height: 24,
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
      flex: 1,
    },

    gifItem:{
      margin:4,
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