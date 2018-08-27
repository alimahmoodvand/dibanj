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
        backgroundColor:'rgba(0,0,0,0)'
    },
    closeIcon:{
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:10,
    },
    profileInfo:{
        alignItems:'center',
        justifyContent:'center',
        height:'$productImage',
        overflow:'visible',
        backgroundColor:'transparent'
        // paddingTop:'$productImage*0.75'

    },
    profileInfoCircle:{
        width:'$productImage*3',
        height:'$productImage*1.5',
        backgroundColor:'white',
        borderTopLeftRadius:'$productImage*1.5',
        borderTopRightRadius:'$productImage*1.5',
        alignItems:'center',
        justifyContent:'flex-start',
        overflow:'visible',
        top:'$productImage*0.25',
        position:'absolute',
    },
    profilePic:{
        width:'$productImage*0.5',
        height:'$productImage*0.5',
        borderRadius:'$productImage*0.5',
        // position:'absolute',
        // top:-20,
        // left:'center',
    },
    profilePicSection:{
        width:'$productImage*0.5',
        height:'$productImage*0.5',
        borderRadius:'$productImage*0.5',
    },
    profileTakePic:{
        position:'absolute',
        left:0,
        bottom:0,
    },
    editableInfo:{
        flex:1,
        backgroundColor:'white'
    },
    modal: {

        justifyContent: "flex-end",
        margin: 0,
    },
    modalContainer:{
        borderWidth: 1,
        padding:10,
        backgroundColor:'white',
        borderColor: 'black'
    },
    modalButton: {
        margin: 10,
        // backgroundColor:'blue',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modalButtonCancel:{
        backgroundColor:'white',
        // borderRadius:5,
        borderColor:'$mainColor',
        borderWidth:1,
        flex:.45,
        justifyContent:'center',
        alignItems:'center',
    },
    modalButtonCancelText:{
        color:'$mainColor'
    },
    modalButtonVerify:{
        backgroundColor:'$mainColor',
        // borderRadius:5,
        borderColor:'white',
        borderWidth:1,
        flex:.45,
        justifyContent:'center',
        alignItems:'center',
    },
    modalButtonVerifyText:{
        color:'white'
    },
    inputContainer:{
        // flex:.7,
        // backgroundColor:'blue',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        padding:2,
    },
    fieldText:{
        fontWeight:'bold',
        fontSize:15,
        marginLeft:4,
    },
    inputText:{
        // borderWidth:1,
        // borderColor:'black',
        padding:2,
        flex:1,
        // borderRadius:5,
        // marginBottom:5,
        // marginTop:5,
    },loginBtn:{
        margin:15,
        backgroundColor:'$mainColor'
    },
});
