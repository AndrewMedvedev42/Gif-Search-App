import {GIPHY_API_KEY} from "@env"
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, 
          View, Image, 
          TextInput, Button, 
          ScrollView, TouchableHighlight, 
          SafeAreaView, RefreshControl} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function App() {
    const [GifResults, setGifResults] = useState(null)
    const [searchRequest, setSearchRequest] = useState("nature")

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);

      wait(2000).then(() => {
        setRefreshing(false)});
    }, []);

    useEffect(()=>{
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=2&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setGifResults(data.data)})
    }, [searchRequest])
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TextInput
          style={{width:300, height: 40, borderColor: 'gray', borderWidth: 0.5, paddingHorizontal:5, }}
          onChangeText={text => setSearchRequest(text)}/>
        <Button
          title="Set Text"
          color="orange"
          accessibilityLabel="Learn more about this purple button"/>
      </View> 
    <SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {searchRequest ? (
          <View style={styles.gifcontainer}>
             {GifResults ? [
               
               GifResults[0] ?[
                  GifResults.map((item)=>{
                    return (<TouchableHighlight key={item.id} onPress={() => console.log(`This is item: ${item.id}`)}>
                              <Image style={{height:170, width:170}} source={{uri: item.images.downsized.url}}/>
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
    padding: 20,
    display: "flex",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent:'center',
  },
  gifcontainer:{
    display: "flex",
    flexWrap:"wrap",
    flexDirection:"row",
    justifyContent:'center',
  },
  container: {
    margin: 20,
  }
});
