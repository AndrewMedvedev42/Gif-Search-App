import React, {useEffect, useState} from 'react';
import undentifiedUser from "../img/udentifiedUser.png"
import { Ionicons } from '@expo/vector-icons';
import {GIPHY_API_KEY} from "@env"
import {Text, Image, View, Platform ,SafeAreaView, ScrollView, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import {RelatedGifs} from "../components/RelatedGif"

export const Details = ({navigation, route}) => {
    //STATE TO STORE ONE REQUESTED GIF
    const [Gif, setGif] = useState(null)

    //FETCHED GIF BY ID WHICH WAS ACCEPTED FROM HOME BY PRESSING ON GIF ITEM
    useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/${route.params.id}?api_key=${GIPHY_API_KEY}`).then((res)=>{return res.json()})
                .then((data)=>{setGif(data.data)})
      },[])
    //IF STATE OF Gif IS TRUE, IT RENDER THE REQUESTED GIF
    return Gif ? (
    <View style={{backgroundColor:"#000000", flex:1}}>
    <SafeAreaView>
    {/* COMPONENT FOR ABILITY TO SCROLL THROUGH PAGE */}
    <ScrollView>
        <View style={styles.chosenGif}>
            <View style={{borderRadius:24, overflow:"hidden", position:'relative'}}>
                {/* BUTTON THAT SENDS USER BACK TO HOME PAGE */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.BackToHomeButton}>
                    <Ionicons style={styles.Icon} name="chevron-back-outline" size={19.2} color="gray" />
                </TouchableOpacity>
                {/* THE CHOSEN GIF */}
                <Image style={{width:359, height:359}} source={{uri: Gif.images.downsized_large.url}}/>
            </View>
        </View>
        {/* IF THE OBJECT, OF THE CHOSEN GIF, CONTAINS ORIGINAL PUBLISHER, IT WILL RENDER HIM/HER */}
        {Gif.user ? [
            <View style={styles.userProfile}>
                <Image style={{height:48, width:48, borderRadius:50,overflow:"hidden",  marginRight:8}} source={{uri: Gif.user.avatar_url}}/>
                <View>
                    <Text style={{color:"white", fontSize:18}}>{Gif.user.display_name}</Text>
                    <Text style={{color:"white", fontSize:12}}>@{Gif.user.username}</Text>
                </View>
            </View>
        // IF THE ORIGINAL PUBLISHER IS NOT PRESENT, IT WILL RENDER UNDEFINED USER INSTEAD
        ]:<View style={styles.userProfile}>
                <Image style={{height:48, width:48, borderRadius:50, marginRight:8}} source={undentifiedUser}/>
                <View>
                    <Text style={{color:"white", fontSize:18}}>Undefined User</Text>
                    <Text style={{color:"white", fontSize:12}}>@undefinedid</Text>
                </View>
            </View>}
        {/* COMPONENT TO RENDER SIMILAR MY NAME GIFS */}
        <RelatedGifs title={route.params.name}/>
        {/* RelatedGifs ACCEPTS PROPS WHICH WHERE GIVEN FROM HOME, WHEN PRESSING GIT ITEM */}
    </ScrollView>
    </SafeAreaView>        
    {/* REDNERS LOADING ANIMATION IF STATE OF Gif IS FALSE */}
    </View>):<View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"black"}}>
                        <ActivityIndicator size={80} color="gray" />
                    </View>}

//STYLES
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
        // overflow: "hidden",
        position: 'absolute',
        // top:0,
        // left:0,
        zIndex: 10,
        marginTop:8,
        marginLeft:8,
        width: 48,
        height: 48,
        backgroundColor:"white",
    },
    chosenGif:{
        justifyContent:"center",
        alignItems:"center",
        //GIVES DIFFERENT MARGIN TOP FOR DIFFERENT PLATFORMS
        ...Platform.select({
            ios: {
                marginTop:52-20,
            },
            android: {
                marginTop:52,
            },
            default: {
                marginTop:52,
            }
          })
    }
  });