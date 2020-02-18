//Mapa...
import React, { useEffect, useState } from 'react';
//Para estilizar ... em vez do Button, usamos o TouchableOpacity ...
import { StyleSheet, Image , View, Text, TextInput, TouchableOpacity } from 'react-native';

import MapView , { Marker, Callout } from 'react-native-maps';
//Pedir permissão, e pegar a posição.
import { requestPermissionsAsync, getCurrentPositionAsync  } from 'expo-location'
//Icones:
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect} from '../services/socket';
//import { setupWebsocket } from '../../../backendDevsApp/src/websocket';

//<MapView style={{ flex: 1 }}/>
function Main({ navigation }) {
    const [devs , setDevs] = useState([]);
    const [currentRegion , setCurrentRegion] = useState(null);
    const [techs , setTechs] = useState('');

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
    
    function setupWebsocket() {
        const { latitude, longitude } = currentRegion;
    
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        //para testar: techs: 'ReactJS'
        const response = await api.get('/search' , {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        console.log(response.data);

        setDevs(response.data);
        setupWebsocket();
    }

    function handleRegionChanged(region) {
        console.log(region);

        setCurrentRegion(region);
    };
    
    if (!currentRegion) {
        return null;
    }


    /*
    Editora:
        Latitude: -25,448128
        Longitude: -49,303039

    <Marker coordinate={{ latitude: -25.448128 , longitude: -49.303039}}/>

    */
    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion} 
                style={styles.map}>
                
                {devs.map(dev => (
                    <Marker 
                        key = {dev._id}
                        coordinate={{ 
                            latitude: dev.location.coordinates[1] , 
                            longitude: dev.location.coordinates[0]}}>
                    <Image style={styles.avatar} 
                    source={{uri: dev.avatar_url }} />
                    <Callout onPress={() => {
                        //navegacao: Chamar webview, com github...
                        navigation.navigate('Profile' , { github_username: dev.github_username });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
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

    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },



});

export default Main;