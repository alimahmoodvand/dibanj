import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    container:{
        // flexDirection:'row',
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10,
        paddingTop:5,
        paddingBottom:5,
              backgroundColor:'white',
        // width:'100%',
    },
    textContainer:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    fieldText:{
        fontWeight:'bold',
        fontSize:15,
        marginLeft:4,
    },
    fieldIcon:{
        padding:5,
        flex:.3,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    modal: {

        justifyContent: "flex-end",
        margin: 0,
    },
    modalContainer:{
        backgroundColor: 'white',
        borderWidth: 1,
        padding:10,
        borderTopWidth: 3,
        borderTopColor:'rgba(0,0,0,0.2)'
    },
    modalButton: {
        margin: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modalButtonCancel:{
        backgroundColor:'white',
        borderRadius:5,
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
        borderRadius:5,
        borderColor:'white',

        borderWidth:1,
        flex:.45,
        justifyContent:'center',
        alignItems:'center',
    },
    modalButtonVerifyText:{
        color:'black'
    },
    bookmarks:{
        flexDirection:'row',
        // flex:1,
        // width:'100%',
        overflow:'visible',
        // flex:0.1,
        marginTop:10,
    },
    bookmarkText:{
        color:'#0092ff',
        marginRight:5,
    },
    tabBtn:{
        backgroundColor:'white',
        padding:10,
        paddingRight:20,
        paddingLeft:20
    },
    tabBtnContainer:{
        // margin:5,
    },
    subCatContainer:{
        width:'100%',
        flexDirection:'row-reverse',
        marginTop:10,
        flexWrap:'wrap',
        borderBottomWidth:1,
        borderBottomColor:'black',
    },
    subCatBtnText:{
      color:'black'
    },
    subCatBtn:{
       backgroundColor:'white',
       borderColor:'$grayColor',

        borderWidth:2,
        borderRadius:25,
        paddingTop:0,
        paddingBottom:0,
        paddingRight:25,
        paddingLeft:25,
        marginRight:10,
        marginTop:5,
        marginBottom:5,

    },
    selectedCatContainer:{
        width:'100%',
        flexDirection:'row-reverse',
        marginTop:10,
        flexWrap:'wrap',
        // borderBottomWidth:1,
        // borderBottomColor:'black',
    },
    selectedCatBtn:{
        backgroundColor:'white',
        borderColor:'green',
        borderWidth:2,
        borderRadius:25,
        paddingTop:0,
        paddingBottom:0,
        paddingRight:25,
        paddingLeft:25,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
    },
    limitTitle:{
      width:'100%'
    },
    selectedCatText:{
        color:'green'
    }
})