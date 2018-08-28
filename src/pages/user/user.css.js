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
    },
    windowHeaderText:{
        color:'white',
        fontWeight:'bold'
    },
    userInfo:{
        flexDirection:'row',
        // flex:1,
        marginBottom:20,
    },
    userImageContainer:{
        flex:0.4,
    },
    userImage:{
        width:'$productBntRaduis',
        height:'$productBntRaduis',
        borderRadius:'$productBntRaduis',
    },
    userInfoContainer:{
        paddingRight:20,
        justifyContent:'space-around',
        alignItems:'flex-end',
        flex:0.6,
    },
    userInfoText:{
        color:'white',
        fontSize:15,
    },
    bookmarkContainer:{
        borderBottomWidth:1,
        borderBottomColor:'black',
        alignItems:'flex-end',
        flexWrap:'wrap',
        paddingBottom:10,
    },
    bookmarkTitle:{
        color:'black',
        fontWeight:'bold',
        fontSize:15,
        padding:5,
    },
    bookmarks:{
        flexDirection:'row-reverse',
        flex:1,
        flexWrap:'wrap'
    },
    bookmarkText:{
        color:'#0092ff',
        marginRight:2,
    },
    courseInfo:{
        paddingRight:15,
        paddingLeft:15,
        backgroundColor:'white',
    },
    commentsContainer:{
        // flex:1,
        padding:5,
        borderBottomWidth:1,
        borderBottomColor:'black',


    },
    commentsTitle:{
        backgroundColor:'white',
        alignItems:'flex-end',
        width:'100%',
        padding:10,
    },
    commentsTitleText:{
        color:'black',
        fontSize:15,
    },
    ratingContainer:{
        flex:1,
    },
    comments:{
        flex:1,
        flexDirection:'row',
        marginTop:10,
    },
    cemmentContainer:{
        flex:.5,
        alignItems:'flex-end'
    },
    commentText:{
        color:'$grayColor',
        fontSize:15,
    },
    rateContainer:{
        flex:.5,
        alignItems:'flex-start'
    },
    masterProduct:{
        flex:1,
        // backgroundColor:'red'
    }
});
