import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    main: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        overflow:'visible',

    },
    content:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)',
        alignItems:'flex-end',
        marginTop:10,
        overflow:'visible',

    },
    halfCircleContainer:{
        width:'60%',
        position:'absolute',
        right:0,
        top:0,
        overflow:'visible',
        backgroundColor:'transparent',
        borderColor:'white',
        borderWidth:2,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    menuIcon:{
        width:'70%',
        height:'70%',
    }
});
