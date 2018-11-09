import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
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
        backgroundColor:'rgba(0,0,0,0)',
    },
    products:{
        flex:1,
    },
    paymentSection:{
        // height:'20%',
        bottom:0,
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'#C1C1C1',
    },
    offSection:{
        // flex:0.45,
        flexDirection:'row',
        padding:5,
        paddingTop:10,
        paddingBottom:10,
        // borderBottomWidth:1,
        // borderBottomColor:'$mainColor',

    },
    offSectionText:{
        flex:.5,
        marginRight:10,
        alignItems:'flex-end',
        justifyContent:'center',
    },
    offText:{
    },
    offSwitch:{
        flex:.5,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    purchaseSection:{
        // flex:0.55,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'$mainColor',

    },
    purchaseBtnSection:{
        flex:.45,

        alignItems:'flex-start',
        justifyContent:'center',
    },
    purchaseBtn:{
      backgroundColor:'$mainColor',
    },
    purchaseBtnText:{
        color:'black'
    },
    priceSection:{
        flex:0.55,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    priceText:{
        color:'green',
        fontWeight:'bold',
    },
    priceSumText:{
        fontWeight:'bold',

    },
    offcodeSection: {
        flexDirection: 'row',
        margin:10,
        marginTop:10,
        marginBottom:10,
        borderRadius:5,
        borderColor:'$mainColor',
        overflow:'hidden',
        borderWidth:1,
    },
    offcodeBtn: {
        flex: 0.4,
        backgroundColor:'$mainColor',
        justifyContent:'center',
        alignItems:'center',
    },
    offcodeBtnText:{
      color:'black'
    },
    input: {
        flex: 0.6,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 0,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        textAlign:'right',
        color: '#424242',
    },
});
