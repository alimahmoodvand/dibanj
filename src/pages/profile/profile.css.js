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

});
