import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import {Text, Image, View, Button, SafeAreaView, ScrollView, ActivityIndicator,StyleSheet} from 'react-native';
import {RelatedGifs} from "../components/RelatedGif"

export const Details = ({ navigation, route}) => {

    const [GifId, setGifId] = useState()

    const [Gif, setGif] = useState(null)

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/${route.params.id}?api_key=${GIPHY_API_KEY}`).then((res)=>{return res.json()})
                .then((data)=>{setGif(data.data)})
      },[])

      if(Gif){
        console.log(Gif);
      }
    return Gif ? (
    <SafeAreaView>
    <ScrollView>
        <Button
            title="hello"
            onPress={() => navigation.navigate('Home')}/>
        <Image style={{alignSelf: 'stretch', height:400, margin:8}} source={{uri: Gif.images.downsized_large.url}}/>
        {Gif.user ? [
            <View style={styles.userProfile}>
                <Image style={{height:48, width:48}} source={{uri: Gif.user.avatar_url}}/>
                <View>
                    <Text>{Gif.user.display_name}</Text>
                    <Text>@{Gif.user.username}</Text>
                </View>
            </View>
        ]:<View style={styles.userProfile}>
                <Image style={{height:48, width:48}} source=""/>
                <View>
                    <Text>Undefined User</Text>
                    <Text>@undefinedid</Text>
                </View>
            </View>}
        <RelatedGifs title={route.params.name}/>
    </ScrollView>
    </SafeAreaView>):<View style={{flex:1, alignItems:"center"}}>
                        <ActivityIndicator size={80} color="lightgrey" />
                    </View>}

const styles = StyleSheet.create({
    userProfile:{
        display: "flex",
        flexDirection:"row",
    }
  });