import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import {Text, Image, View} from 'react-native';
import {RelatedGifs} from "../components/RelatedGif"

export const Details = ({ navigation, route }) => {

    const [Gif, setGif] = useState(null)

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/${route.params.id}?api_key=${GIPHY_API_KEY}`).then((res)=>{return res.json()})
                .then((data)=>{setGif(data.data)})
      },[])

      if(Gif){
        console.log(Gif);
      }
    return Gif ? (
    <View>
        <Image style={{alignSelf: 'stretch', height:400}} source={{uri: Gif.images.downsized_large.url}}/>
        {Gif.user && [
            <View>
                <Image style={{height:100, width:100}} source={{uri: Gif.user.avatar_url}}/>
                <View>
                    <Text>{Gif.user.display_name}</Text>
                    <Text>@{Gif.user.username}</Text>
                </View>
            </View>
        ]}
        <RelatedGifs title={route.params.name}/>
    </View>):<Text>Loading</Text>
}