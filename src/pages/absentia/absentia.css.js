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
    content: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    filter: {
        flexDirection: 'row',
        marginLeft: 12,
        overflow:'visible',
    },
    filterIcon: {
        marginRight: 15,
    },
    products: {},
    halfCircleContainer: {
        width: '60%',
        position: 'absolute',
        right: 0,
        // top: -20,
        overflow: 'visible',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    ddlistContainer:{
        position:'absolute',
        left:0,
        zIndex:100,
        top:2,
        backgroundColor:'white',
        overflow:'visible',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        // borderColor:'rgba(0,0,0,0.2)',
        // borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
        elevation:20,
    },
    ddlist:{
        backgroundColor:'white',
        padding:10,
        paddingLeft:25,
        paddingRight:25,
        borderTopColor:'rgba(0,0,0,0.2)',
        borderTopWidth:1,
        width:'100%',
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        elevation:0,
    },
    collapseContainer:{
        width:'120%',
        position:'relative',
        height:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    menuIcon:{
        width:'80%',
        height:'80%',
    },
    filterImage:{
        width:20,
        height:20
    },
    filterImageContainer:{
        marginRight: 15,
        justifyContent:'center',
        alignItems:'center',

    }
});
