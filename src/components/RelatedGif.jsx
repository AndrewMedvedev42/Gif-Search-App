import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import {StyleSheet, View , Text, Image, ActivityIndicator, TouchableHighlight} from "react-native"

export const RelatedGifs = ({title, slug, navigation}) => {
    const [relatedGIFs, setRelatedGIFs] = useState("")

    const gifName = title.replace('GIF',' ')

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifName}&limit=6&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setRelatedGIFs(data.data)})
    },[])

    console.log(relatedGIFs);

    return (<View>
                <Text>Related GIFs</Text>
                    <View style={styles.gifcontainer}>
                        {relatedGIFs ? (
                            
                            relatedGIFs.map((item)=>{
                                return (
                                    <TouchableHighlight key={item.id} style={styles.gifItem}  onPress={() => console.log(42)}>
                                        <Image key={item.id} style={{height:195, width:195}} source={{uri: item.images.downsized_large.url}}/>
                                    </TouchableHighlight>
                                )
                            })
                        ):<View>
                            <ActivityIndicator size={80} color="lightgrey" />
                        </View>}
                    </View>
    </View>)
}

const styles = StyleSheet.create({
    gifcontainer:{
      flexDirection:"row",
      flexWrap:"wrap",
    },
    gifItem:{
      margin:4, 
      borderRadius:16, 
      overflow: 'hidden'
    },
  });