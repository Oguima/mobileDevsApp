import { createAppContainer } from 'react-navigation';
import { creatStackNavigator, createStackNavigator } from 'react-navigation-stack';

//Paginas.
import Main from './pages/Main';
import Profile from './pages/Profile';

//Importante, componentes devem iniciar com Maiuscula,,,
//container por fora de toda aplicacao...
const Routes = createAppContainer(
    //Passa-se um objeto com as rotas da aplicacao
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            },
        },
     }, {
            defaultNavigationOptions: {
                headerTintColor: '#FFF',
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#7d40e7'
                },
            },
        })
);

export default Routes;
