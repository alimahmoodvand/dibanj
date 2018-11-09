import EStyleSheet from 'react-native-extended-stylesheet';
export default styles = EStyleSheet.create({
    main: {
        flex:1,backgroundColor:'rgba(0,0,0,0)'
    },
    container:{
        flex:1,backgroundColor:'rgba(0,0,0,0)',
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
        color:'white'
    },
    signupForm:{
        margin:50,
        // marginTop:0,
        marginBottom:0,
    },
    loginBtn:{
        marginTop:15,
        marginBottom:10,
        backgroundColor:'$mainColor'
    },
    logo:{
        flex:1,
        height:50,
    },
    logoContainer:{
        alignItems:'flex-end',
        justifyContent:'center',
        flexDirection:'row'
    },
    inputText:{
    color:'$mainColor'
    },
    btnText:{
        fontSize:20,
        color:'black'
    },
})