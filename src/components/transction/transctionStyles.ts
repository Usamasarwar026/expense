import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    TransctionContainer:{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent:'space-between',
        height: 89,
    },
    leftContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainerImage:{
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#FCEED4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImage:{
        width: 40,
        height: 40,
        borderRadius: 10,
        resizeMode: 'contain',
    },
  
    text1:{
        fontSize: 16,
        fontWeight: '500',
    },
    text2:{
        fontSize: 13,
        fontWeight: '500',
        color: '#91919F',
    },
    rightContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        alignItems: 'center',
        width: '78%',
    },
    text3:{
        // color: '#FD3C4A',
        fontSize: 16,
        fontWeight: '600',
    },
    red:{
       color: '#FD3C4A',
    },
    green:{
       color: '#10B981',
    }

})