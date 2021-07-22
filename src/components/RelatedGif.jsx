import React, {useEffect, useState} from 'react';
import {GIPHY_API_KEY} from "@env"
import { View , Text, Image,SafeAreaView,ScrollView} from "react-native"

export const RelatedGifs = ({title, slug}) => {
    const [relatedGIFs, setRelatedGIFs] = useState("")

    const gifName = title.replace('GIF',' ')

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifName}&limit=6&offset=0&rating=g&lang=en`).then((res)=>{return res.json()})
              .then((data)=>{setRelatedGIFs(data.data)})
    },[])

    console.log(relatedGIFs);

    return (<View>
            <SafeAreaView>
                <ScrollView>
                    <Text>Related GIFs</Text>
                    <View>
                        {relatedGIFs ? (
                            relatedGIFs.map((item)=>{
                                return <Image key={item.id} style={{height:170, width:170}} source={{uri: item.images.downsized_large.url}}/>
                            })
                        ):<Text>Loading</Text>}
                    </View>
                </ScrollView>
            </SafeAreaView>
    </View>)
}