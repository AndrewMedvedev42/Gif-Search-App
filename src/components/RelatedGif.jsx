import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import {StyleSheet, View , Text, Image, ActivityIndicator, TouchableHighlight} from "react-native"

export const RelatedGifs = ({title, slug, navigation}) => {
    const [relatedGIFs, setRelatedGIFs] = useState("")

    const gifName = title.replace('GIF',' ')

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifName}&limit=10&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setRelatedGIFs(data.data)})
    },[])

    console.log(relatedGIFs);

    return (<View style={{backgroundColor:"#000"}}>
                <View style={styles.relatedGifsMessageContainer}>
                    <Text style={{fontWeight:"600", fontSize:17,color:"#FFF"}}>Related GIFs</Text>
                </View>
                    <View style={styles.gifcontainer}>
                        {relatedGIFs ? (
                            
                            relatedGIFs.map((item)=>{
                                return (
                                    <TouchableHighlight key={item.id} style={styles.gifItem}  onPress={() => console.log(42)}>
                                        <Image key={item.id} style={{height:176, width:176}} source={{uri: item.images.downsized_large.url}}/>
                                    </TouchableHighlight>
                                )
                            })
                        ):<View>
                            <ActivityIndicator size="large" color="#963d3d" />
                        </View>}
                    </View>
    </View>)
}

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