import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    main: {
        flex: 1,
        // height:200,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    content:{
        flex:1,
        // marginBottom:50,

        backgroundColor:'rgba(0,0,0,0)',
        // marginBottom:100,
        // justifyContent:'center',
        // alignItems:'center',
    },
    filter:{
        flexDirection:'row',
        marginLeft:12,
    },
    filterIcon: {
        marginRight:15,
    },
    productsSection:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',

    },
    products:{
        flex:.95,
        backgroundColor:'red',
        // height:100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        overflow:'hidden'
    },
    childHeaderText:{
        backgroundColor:'white',
        textAlign:'right',
        padding:10,
        flex:1,
        marginTop:10,
    },
    childHeader:{
        flexDirection: 'row',
        marginTop:10,
        marginBottom:10,
        alignContent:'center',
    },
    filterExist:{
        flexDirection:'row',
        flex:0.95,
        alignContent:'flex-end',
        justifyContent:'flex-end'
    },
    slideshow:{
        margin:15,
        borderRadius:8,
        overflow:'hidden'
    },
    windowContainer:{
        flexDirection: 'row',
        marginTop:10,
        justifyContent:'center',

    },
    windowHeaderSection:{
      flex:1,
        justifyContent:'flex-end',
flexDirection:'row',
    },
    windowHeader:{
        flex:0.4,
        backgroundColor:'$mainColor',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        padding:5,
    },
    windowHeaderText:{
        color:'white',
        fontWeight:'bold'
    },
    commentsContainer:{
        marginRight:10,
        marginLeft:10,
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        marginBottom:50,
    },
    comments:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:'white',
        overflow:'hidden'
    },
    commentBtn: {
        backgroundColor: 'rgb(255, 200, 0)',
        width:'100%',
        marginBottom:30,
    },
    commentBtnText: {
        color: 'white',
        width:'100%',
        textAlign:'center'
    },
    commentInputContainer: {
        alignItems:'flex-end',
        padding:10,
        width:'100%',
        borderBottomWidth: 1,
        borderBottomColor: '$grayColor',
    },
    commentInput:{
        width:'100%',
        textAlign:'right',
    },
    headerCommentContainer:{
        flexDirection: 'row',
        marginTop:10,
        alignItems:'center',
        width:'100%',
        // backgroundColor:'white',
        justifyContent:'flex-end'
    },
    headerCommentHeaderSection:{
        flex:1,
        // width:'30%',
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    headerCommentHeader:{
        flex:0.4,
        backgroundColor:'$mainColor',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        padding:5,
    },
    headerCommentHeaderText:{
        color:'white',
        fontWeight:'bold'
    },
    commentsSection:{
        // maxHeight:100,
        width:'100%',
        backgroundColor:'white',
        marginBottom:20,
    }

});
