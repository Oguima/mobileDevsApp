//Mapa...
import React, { useEffect, useState } from 'react';
//Para estilizar
import { StyleSheet } from 'react-native';

import MapView from 'react-native-maps';
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

    return <MapView initialRegion={currentRegion} style={styles.map}/>
}

const styles = StyleSheet.create({
    map: {
        flex:1
    },
});

export default Main;