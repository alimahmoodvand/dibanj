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
        height: '$productBnt*1.1',
        width: '$productBnt*2.2',
        borderTopRightRadius: '$productBntRaduis*1.1',
        borderTopLeftRadius: '$productBntRaduis*1.1',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderWidth:2,
        borderColor:'white',
        marginRight: 15,
        // marginTop: 15,
        marginLeft: 15,
    },
    issueContainer:{
        margin:20,
        // width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    uploadBtn: {
        backgroundColor: 'rgb(255, 200, 0)',
        width:'50%',
        margin:10,
        padding:5,
        borderRadius:5,

        justifyContent:'center',
        alignItems:'center',
    },
    doneBtn: {
        backgroundColor: 'rgb(255, 200, 0)',
        width:'80%',
        margin:10,
        padding:5,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    issueInput:{
        width:'100%'
    },

    uploadBtnText: {
        color: 'black',
        width:'100%',
        textAlign:'center'
    },buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    }
});
