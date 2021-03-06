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
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
      backgroundColor:"$mainColor",
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // paddingRight:10,
        // paddingLeft:10,
    },

});
