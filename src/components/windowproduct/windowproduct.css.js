import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        // flexDirection: 'row',
        // marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        flex:0.5,
        // width:'50%',
    },
    content: {
        flex:0.8,
        padding:10,
        // flexDirection:'row',
        backgroundColor: 'white',
        overflow:'hidden',
        // flexDirection:'row-reverse',
    },
    buy: {
        position:'absolute',
        top:'10%',
        left:0,
        backgroundColor: '$mainColor',
        height: '$productBntRaduis',
        width: '$productBnt',
        borderBottomRightRadius: '$productBntRaduis',
        borderTopRightRadius: '$productBntRaduis',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
        zIndex:100,
    },
    proBtnText:{
        color:'white',
        fontSize:15,
        textAlign:'center'
    },
    sample: {
        position:'absolute',
        top:'10',
        right:0,
        backgroundColor: '$mainColor',
        height: '$productBntRaduis',
        width: '$productBnt',
        borderBottomLeftRadius: '$productBntRaduis',
        borderTopLeftRadius: '$productBntRaduis',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
    },
    image:{
        // width:'100%',
        // flex:0.5,
        // width:'50%',

        height:'$productImage',
        width:'$productImage',
        overflow:'hidden',
        borderBottomRightRadius:2,
        borderTopRightRadius:2,
    },
    details:{
        paddingRight:10,
        paddingTop:5,
        flex:0.5,
        alignItems:'flex-end',
        justifyContent:'flex-start'
    },
    prices:{
        paddingLeft:10,
        paddingTop:5,
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',

    },
    windowHeader:{
        width:'50%',
        backgroundColor:'$mainColor',
    },
    detailsText:{
        // width:'50%',
        // flex:0.5,
        width:'$productImage',

    }
});
