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
        flex:.35,
        overflow:'hidden',
        // borderBottomRightRadius:2,
        // borderTopRightRadius:2,
    },
    imageLabel:{
        height:'40%',
        width:'40%',
        // backgroundColor:'#c3c3c377'
    },
    details:{
        paddingRight:10,
        // paddingTop:15,
        flex:0.55,
        alignItems:'flex-end',
        justifyContent:'flex-start',
        // backgroundColor:'red'
    },
    prices:{
        // marginLeft:10,
        // marginRight:10,
        paddingTop:15,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',

    },
    detalsText:{
        // color:'black',
        // fontSize:17,
        width:'90%',
        margin:2,
        textAlign:'right',
        // marginLeft:'$productBnt',
        // direction:'rtl',

    },
    basket:{
        // paddingTop:5,
        // paddingBottom:5,
        // paddingLeft:10,
        // paddingRight:10,
        // borderRadius:5,
        // borderColor:'$mainColor',
        // borderWidth:1,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        // backgroundColor:'red',
    },
    filterImage:{
        width:25,
        height:25
    },
    container:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    buyBtn:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0094cc',
    }

});
