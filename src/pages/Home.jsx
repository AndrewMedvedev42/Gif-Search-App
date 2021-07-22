import {GIPHY_API_KEY} from "@env"
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
          View, Image, 
          TextInput, Button, 
          ScrollView, TouchableHighlight, 
          SafeAreaView, RefreshControl} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Home = ({ navigation }) => {
    const [GifResults, setGifResults] = useState(null)

    const [searchRequest, setSearchRequest] = useState("")

    useEffect(()=>{
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=10&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setGifResults(data.data)})
    }, [searchRequest])

  return (
    <View style={styles.container}>
{/* INPUT_BAR AND SUBMIT BUTTON */}
      <View style={styles.navBar}>
        <Ionicons style={styles.Icon} name="search" size={32} color="green" />
        <TextInput
          style={styles.inputField}
          onChangeText={text => setSearchRequest(text)}/>
      </View> 

{/* GIF RESULTS SECTION */}
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {searchRequest ? (
          <View style={styles.gifcontainer}>
             {GifResults ? [   
               GifResults[0] ?[
                  GifResults.map((item)=>{
                    return (<TouchableHighlight key={item.id} onPress={() => navigation.navigate('Details', { id: item.id, name:item.title})}>
                              <Image key={item.id} style={{height:176, width:176}} source={{uri: item.images.downsized.url}}/>
                          </TouchableHighlight> )})
               ]:<Text>No results</Text>

             ] : <Text>Loading</Text>}
          </View>
        ) : setSearchRequest("nature")}
      </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    navBar:{
      margin:8,
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      alignSelf: 'stretch',
      borderRadius:16,
      height: 56,
      backgroundColor:"white",
      paddingHorizontal:16,
    },
    inputField:{
      width: 303,
    },
    container: {
      paddingTop: StatusBar.currentHeight,
    }
  });