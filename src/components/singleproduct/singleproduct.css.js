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
        minHeight:200,

    },
    buy: {
        position:'absolute',
        bottom:'10%',
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
        bottom:'10%',
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
    details:{
         paddingRight: '$productBnt',
        paddingTop:5,
        flex:0.8,
        flexWrap:'wrap',
        // alignItems:'flex-end',
        // justifyContent:'flex-start'
    },
    prices:{
        paddingLeft:'$productBnt',
        // top:'25%',
        flex:0.8,
        flexDirection:'row',
        // alignItems:'center',
        justifyContent:'space-around',

    },
    detalsText:{
        // color:'black',
        // fontSize:17,
        flexWrap:'wrap',
        margin:2,
        textAlign:'right',
        // marginLeft:'$productBnt',
        // direction:'rtl',

    },
});
