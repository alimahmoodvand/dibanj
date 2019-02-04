import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10,
        paddingTop:5,
        paddingBottom:5,
    },
    textContainer:{
        flex:.7,
        // backgroundColor:'blue',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        padding:5,
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
        // borderRadius:5,
        // marginBottom:5,
        // marginTop:5,
    },
    fieldIcon:{
        padding:5,
        flex:.3,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'flex-start',
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
        color:'black'
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
        color:'black'
    }
})