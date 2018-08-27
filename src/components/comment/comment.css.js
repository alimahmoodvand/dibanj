import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        // flexDirection: 'row',
        // marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        flex:1,
        // width:'50%',
    },
    content: {
        flex:0.8,
        padding:10,
        // flexDirection:'row',
        overflow:'hidden',
        backgroundColor:'#c3c3c3',
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginBottom:15,
        // flexDirection:'row-reverse',
    },
    commentTitle:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        marginBottom:2,
    },
    userImage:{
        width:50,
        height:50,
    },
    infoContainer:{

    },
    nameContainer:{
        alignItems:'flex-end',
        flex:0.5
    },
    otherContainer:{
        flex:0.5,
        flexDirection:'row'
    },
    commentContainer:{
        paddingRight:10,
        paddingLeft:60,
        paddingBottom:15,
        borderBottomColor:'#929292',
        borderBottomWidth:0.2,
        alignItems:'flex-end'
    },
    name:{
        fontWeight:'bold'
    }
});
