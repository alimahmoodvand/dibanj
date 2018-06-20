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
        backgroundColor: 'rgba(0,0,0,0)'
    },
    content:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)'
    },
    filter:{
        flexDirection:'row',
        marginLeft:12,
    },
    filterIcon: {
        marginRight:15,
    },
    products:{

    },
    filterExist:{
        flexDirection:'row',
        flex:0.95,
        alignContent:'flex-start',
        justifyContent:'flex-start'
    },
    halfCircleContainer: {
        width: '60%',
        position: 'absolute',
        right: 0,
        top: 0,
        overflow: 'visible',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    filterImage:{
        width:20,
        height:20
    },
    filterImageContainer:{
        marginRight: 15,
        justifyContent:'center',
        alignItems:'center',
    },
    menuIcon:{
        width:'80%',
        height:'80%',
    },
    filterExistText:{
        color:'white',
        marginRight:10,
    }
});
