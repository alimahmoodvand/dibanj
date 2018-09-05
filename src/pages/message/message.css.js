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
        // paddingRight:10,
        // paddingLeft:10,
    },
    input: {
        flex: 0.9,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'right',
        color: '#424242',
    },
    uploadBtnSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadBtn: {
        backgroundColor: 'rgb(255, 200, 0)',
        width:'100%'
    },
    uploadBtnText: {
        color: 'white',
        width:'100%',
        textAlign:'center'
    },
    practiceContainer: {
        flex: 1,
        marginTop: 5,
    },
    practiceTitle: {
        padding: 15,
        alignItems: 'flex-end',
    },
    practiceTitleText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    practiceDescContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth:1,
        borderBottomColor:'$grayColor',
        paddingBottom:10,
    },
    practiceDesc:{
        marginRight:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    practiceDescText: {
        color: '$grayColor'
    },
    circleYellow: {
        marginRight:10,
        width: '$productBnt',
        height: '$productBnt',
        borderRadius: '$productBnt',
        backgroundColor: '$mainColor',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleText: {
        color: 'white',
        textAlign: 'center',
    },
    practiceQuestionTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '$grayColor',
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:10,
    },
    practiceQuestionTitleText:{
        color: '$grayColor',
        fontSize:15,
    },
    question: {
        alignItems:'flex-end',
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: '$grayColor',
    },
    questionText:{
        fontSize:17,
        color:'black',

    },
    practiceQuestionContainer:{
        margin:20,
    },
    practiceQuestion:{

    },
    questionInput:{
        width:'100%',
        textAlign:'right',
    },
    unread:{
        backgroundColor:'$mainColor'
    }
});
