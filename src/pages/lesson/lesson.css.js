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
        flex: 1,
        backgroundColor: '#fff',
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight:10,
        // paddingLeft:10,
    },
    contentRender:{
        flex:1,
        // backgroundColor:'red',
        height:500
    }

});
