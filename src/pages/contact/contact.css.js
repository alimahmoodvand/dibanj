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
        height:200,
        backgroundColor: '#fff',
        marginRight: 15,
        // marginTop: 15,
        marginLeft: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // paddingRight:10,
        // paddingLeft:10,
    },
    headerContainer:{
        flexDirection:'row-reverse',
    },
    header:{
        backgroundColor: '$mainColor',
        height: '$productBnt',
        width: '$productBnt*2',
        borderTopRightRadius: '$productBntRaduis',
        borderTopLeftRadius: '$productBntRaduis',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
        marginRight: 15,
        // marginTop: 15,
        marginLeft: 15,
    },
    aboutContainer:{
        margin:20,
        justifyContent:'center',
        alignItems:'center',
    },
    contactContainer:{
        alignItems:'flex-end',
        width:'100%',
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
    },
    contactInfo:{
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        // marginRight: 15,
        // marginTop: 15,
        // marginLeft: 15,
    },
    contactIconContainer:{
        width:40,
        height:40,
        backgroundColor:'rgb(255, 200, 0)',
        marginLeft:5,
        borderRadius:20,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
    },contactIcon:{
        width:40,
        height:40,
        // margin:5,
        backgroundColor:'rgb(255, 200, 0)',
        // marginLeft:10,
        borderRadius:20,
        overflow:'hidden'
    }

});
