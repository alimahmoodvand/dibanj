import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        flexDirection: 'row',
        marginBottom:10,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        flex:1,
    },
    content: {
        flex:0.93,
        backgroundColor: 'white',
        overflow:'hidden',
        // flexDirection:'row',
        // justifyContent:'center',
        // alignItems:'center',
        borderRadius:5,
        flexWrap:'wrap'
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
    modal: {

        justifyContent: "flex-end",
        margin: 0
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
        // height:'100%',
        minHeight:'$productImage',
        height:'$productImage',
        width:'$productImage',
        flex:.4,
        overflow:'hidden',
        // borderBottomRightRadius:2,
        // borderTopRightRadius:2,
    },
    imageLabel:{
        height:'40%',
        width:'40%',
        // backgroundColor:'#c3c3c377'
    },
    imageStickerDate:{
        height:25,
        width:"20%",
        marginLeft:'15%',
        zIndex:100,
        // backgroundColor:'#c3c3c377'
    },
    imageStickerFree:{
        height:25,
        width:"20%",
        zIndex:100,

        // marginLeft:'30%',
        // backgroundColor:'#c3c3c377'
    },
    details:{
        flexDirection:'row-reverse',
        // paddingRight:10,
        // paddingTop:15,
        flex:0.8,
        flexWrap:'wrap',

        // flexDirection:'column-reverse',
        // alignItems:'flex-end',
        // justifyContent:'flex-start',
        // alignItems:'flex-end',
        // justifyContent:'flex-start',
        // backgroundColor:'yellow'
    },
    images:{
        // height:10,
        width:'100%',
        // justifyContent:'center',
        // alignItems:'center',

        // backgroundColor:'green',
        position:'absolute',
        flexDirection:'row',
    },
    infoSide:{
      flex:0.53,
        // backgroundColor:'green',
        paddingTop:25,

        // justifyContent:'center',
    },
    priceSide:{
      flex:0.3,

        // backgroundColor:'blue',
        // justifyContent:'flex-end'
    },
    prices:{
        // marginLeft:10,
        // marginRight:10,
        // paddingTop:15,
        // width:'100%',
        // flexDirection:'row',
        alignItems:'flex-start',
        // backgroundColor:'blue',
        justifyContent:'center',
        height:'100%'
    },
    detalsText:{
        // color:'black',
        // fontSize:17,
        // width:'90%',
        flex:1,
        margin:2,
        // textAlign:'right',
        flexWrap:'wrap',
        // backgroundColor:'green',
        fontSize:14,
        fontWeight:'normal',
        // marginLeft:'$productBnt',
        // direction:'rtl',

    },
    basket:{
        // flex:0.2,
        // height:10,
        // width:10,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
    },
    filterImage:{
        width:25,
        height:25
    },
    container:{
        flexDirection:'row',
        minHeight:'$productImage',
        height:'$productImage',
        // justifyContent:'flex-end'
    },
    buyBtn:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0094cc',
    },
    btns:{
        flexWrap:'wrap',
        flexDirection:'row-reverse',
        width:'95%',
        // backgroundColor:'blue',
    },

});
