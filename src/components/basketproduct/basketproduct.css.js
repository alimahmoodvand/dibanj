import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        flexDirection: 'row',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        flex:0.95,
        backgroundColor: 'white',
        overflow:'visible',
        flexDirection:'row-reverse',
        borderRadius:5,
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
        color:'white'

    },
    sample: {
        position:'absolute',
        top:'10%',
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
        width:'$productImage',
        height:'$productImage',
        overflow:'hidden',
        borderBottomRightRadius:2,
        borderTopRightRadius:2,
    },
    imageLabel:{
        height:'40%',
        width:'40%',
        // backgroundColor:'#c3c3c355'
    },
    details:{
        paddingRight:10,
        paddingTop:5,
        flex:0.5,
        alignItems:'flex-end',
        justifyContent:'flex-start'
    },
    prices:{
        paddingTop:5,
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',

    },
    detalsText:{
        // color:'black',
        // fontSize:17,

        margin:2,
        textAlign:'right',
        // marginLeft:'$productBnt',
        // direction:'rtl',

    },
    price:{
        flex:0.8,
        marginLeft:30,
        marginTop:15,
        width:'100%',
        alignItems:'flex-start',
    },
    priceText:{
        color:'green',
        fontWeight:'bold',
    },
    delete:{
        flex:0.2,
        width:'100%',
        justifyContent:'flex-start',
        marginLeft:20,

        alignItems:'flex-start',
    },
});
