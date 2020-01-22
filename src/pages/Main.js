//Mapa...
import React, { useEffect, useState } from 'react';
//Para estilizar
import { StyleSheet, Image , View, Text} from 'react-native';

import MapView , { Marker, Callout } from 'react-native-maps';
//Pedir permissão, e pegar a posição.
import { requestPermissionsAsync, getCurrentPositionAsync  } from 'expo-location'

//<MapView style={{ flex: 1 }}/>
function Main() {
    const [currentRegion , setCurrentRegion] = useState(null);

    //Executa uma única vez...
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted)
            {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    /*
    Editora:
        Latitude: -25,448128
        Longitude: -49,303039

    */
    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -25.448128 , longitude: -49.303039}}/>
            <Marker coordinate={{ latitude: -25.4533147 , longitude: -49.3033759}}>
                <Image style={styles.avatar} source={{uri: 'https://avatars3.githubusercontent.com/u/2325202?s=460&v=4' }} />
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Rafael Guimarães</Text>
                        <Text style={styles.devBio}>Desenvolvedor Mobile, amante de interatividades e jogos.</Text>
                        <Text style={styles.devTechs}>Reactjs, React Native, Node.js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex:1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: "bold",
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

});

export default Main;