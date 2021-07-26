import React, {useEffect, useState} from 'react';
import undentifiedUser from "../img/udentifiedUser.png"
import { Ionicons } from '@expo/vector-icons';
import {GIPHY_API_KEY} from "@env"
import {Text, Image, View, Platform ,SafeAreaView, ScrollView, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import {RelatedGifs} from "../components/RelatedGif"

export const Details = ({ navigation, route}) => {

    const [Gif, setGif] = useState(null)

    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/${route.params.id}?api_key=${GIPHY_API_KEY}`).then((res)=>{return res.json()})
                .then((data)=>{setGif(data.data)})
      },[])

      if(Gif){
        console.log(Gif);
      }
    return Gif ? (
    <View style={{backgroundColor:"#6ada48", flex:1}}>
    <SafeAreaView>
    <ScrollView>
        <View style={styles.chosenGif}>
            <View style={{borderRadius:24, overflow:"hidden"}}>
                <Image style={{width:359, height:359}} source={{uri: Gif.images.downsized_large.url}}/>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.BackToHomeButton}>
                    <Ionicons style={styles.Icon} name="chevron-back-outline" size={19.2} color="gray" />
                </TouchableOpacity> */}
            </View>
        </View>
        {Gif.user ? [
            <View style={styles.userProfile}>
                <Image style={{height:48, width:48, borderRadius:50, marginRight:8}} source={{uri: Gif.user.avatar_url}}/>
                <View>
                    <Text style={{color:"white", fontSize:18}}>{Gif.user.display_name}</Text>
                    <Text style={{color:"white", fontSize:12}}>@{Gif.user.username}</Text>
                </View>
            </View>
        ]:<View style={styles.userProfile}>
                <Image style={{height:48, width:48, borderRadius:50, marginRight:8}} source={undentifiedUser}/>
                <View>
                    <Text style={{color:"white", fontSize:18}}>Undefined User</Text>
                    <Text style={{color:"white", fontSize:12}}>@undefinedid</Text>
                </View>
            </View>}
        <RelatedGifs title={route.params.name}/>
    </ScrollView>
    </SafeAreaView>        
    </View>):<View style={{flex:1, alignItems:"center"}}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>}

const styles = StyleSheet.create({
    userProfile:{
        marginHorizontal:9,
        marginTop:16,
        marginBottom:17,
        display: "flex",
        flexDirection:"row",
    },
    BackToHomeButton:{
        alignItems:"center",
        justifyContent:"center",
        borderRadius:72,
        overflow: "hidden",
        zIndex: 10,
        // marginTop:-55,
        marginLeft:8,
        width: 48,
        height: 48,
        backgroundColor:"white",
    },
    chosenGif:{
        justifyContent:"center",
        alignItems:"center",
        ...Platform.select({
            ios: {
                marginTop:52-20,
            },
            android: {
                marginTop:52,
            },
            default: {
              backgroundColor: 'blue'
            }
          })
    }
  });