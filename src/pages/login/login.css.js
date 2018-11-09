import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        flex:1,backgroundColor:'rgba(0,0,0,0)'
    },
    container:{
        flex:1,backgroundColor:'rgba(0,0,0,0)',
        padding:50,
        justifyContent:'center',
    },
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    labelText:{
        color:'white',
    },
    loginBtn:{
        marginTop:15,
        backgroundColor:'$mainColor'
    },
    logo:{
        flex:1,
        height:50,
    },
    btnText:{
    fontSize:20,
        color:'black',
    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    inputText:{
        color:'$mainColor'
    }
})