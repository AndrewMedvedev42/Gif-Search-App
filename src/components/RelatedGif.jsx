import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import {StyleSheet, View , Text, Image, ActivityIndicator, TouchableHighlight} from "react-native"

export const RelatedGifs = ({title}) => {
    const [relatedGIFs, setRelatedGIFs] = useState("")
    //SLICES "GIF" FROM GIVEN TITLE THROUGH PROP WHICH WAS GIVEN IN GifDeatails.jsx COMPONENT
    //THIS METHOD WAS USED BECAUSE WITH THIS MODIFIED TITLE, RESULTS WILL BE MORE ACCURATE
    const gifName = title.replace('GIF',' ')

    //REQUESTS LIST OF GIF RELATED TO THE gifNmae WE GAVE IT
    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifName}&limit=10&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setRelatedGIFs(data.data)})
    },[])

    return (<View style={{backgroundColor:"#000"}}>
            {/* HEADING  Related GIFs*/}
                <View style={styles.relatedGifsMessageContainer}>
                    <Text style={{fontWeight:"600", fontSize:17,color:"#FFF"}}>Related GIFs</Text>
                </View>
                    <View style={styles.gifcontainer}>
                        {relatedGIFs ? (
                            relatedGIFs.length ? [
                                relatedGIFs.map((item)=>{
                                    return (
                                        <TouchableHighlight key={item.id} style={styles.gifItem}>
                                            <Image style={{height:176, width:176}} source={{uri: item.images.downsized_large.url}}/>
                                        </TouchableHighlight>
                                    )
                                })
                            //SHOWS "Sorry, no related GIFs were found" IN CASE IF relatedGIFs IS EMPTY 
                            ]:<View><Text style={{color:"#ffffff7b"}}>Sorry, no related GIFs were found</Text></View>
                        //SHOWS LOADING ANIMATION IF STATE OF Gif IS UNDEFINED
                        ):<View>
                            <ActivityIndicator size="large" color="gray" />
                        </View>}
                    </View>
    </View>)
}

//STYLES
const styles = StyleSheet.create({
    relatedGifsMessageContainer:{
        padding: 8,
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
  });