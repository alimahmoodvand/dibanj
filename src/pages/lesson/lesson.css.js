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
    content: {
        flex: 0.60,
        backgroundColor: '#fff',
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        // paddingRight:10,
        // paddingLeft:10,
    },
    contentRender:{
        flex:0.9,
        // backgroundColor:'red',
        minHeight:500,
        // borderWidth:4,
        // borderColor:'black',
        // borderStyle:'solid',
        // borderRadius:5,
        // backgroundColor:'red',
    },
    closeIcon:{
        flex:0.1,
        // width:'100%',
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor:'blue'

    },logo:{
        flex:0.7,
        height:35,
        // marginTop:12,
    },
    logoContainer:{
        alignItems:'center',
        // justifyContent:'',
        flexDirection:'row',
        // marginTop:12,
        marginBottom:12,
    },
    logoCenter:{
        flex:0.9,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    }
});
