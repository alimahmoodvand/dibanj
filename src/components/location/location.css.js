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
        flex:.9,
        // backgroundColor:'blue',
        // flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        // flexWrap:'wrap',
        padding:5,
        borderBottomColor:'black',
        borderBottomWidth:0.5
    },
    textDetail:{
        width:'100%',
        // backgroundColor:'blue',
        flexDirection:'row-reverse',
        justifyContent:'flex-start',
        alignItems:'center',
        flexWrap:'wrap',
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
        flex:1,
        // borderRadius:5,
        // marginBottom:5,
        // marginTop:5,
    },
    fieldIcon:{
        padding:5,
        flex:.2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
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
    },   offSection:{
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
})