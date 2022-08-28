import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        color: '#181818',
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 72,
        marginLeft: 30,
        paddingRight: 72,
    },
    inputContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    inputText: {
        height: 70,
        width: '82%',
        paddingHorizontal: 15,
        borderWidth: 2,
        borderRadius: 25,
        marginTop: 20,
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    primaryButton: {
        width: '80%',
        height: 70,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#26E4A0',
    },
    tertiaryButton: {
        width: '80%',
        height: 70,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DE3163',
    },
    buttonText: {
        color: '#fff',
        fontSize: 21,
        paddingHorizontal: 50,
    },
    secondaryButton: {
        width: '80%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 40,
    },
    secondaryText: {
        color: '#181818',
        fontSize: 21,
        paddingHorizontal: 50,
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    filterButton: {
        width: 100,
        height: 60,
        borderWidth: 2,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#fff',
    },
    filterText: {
        color: '#181818',
        fontSize: 16,
    },
    errorText: {
        color: '#C70039',
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 15,
    },
    textContainer: {
        marginTop: 32,
        marginBottom: 72,
        marginLeft: 30
    },
    text: {
        color: '#181818',
        fontSize: 21,
        paddingTop: 20
    },
    mapContainer: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        marginTop: 30,
        alignItems: 'center',
        height: '67%'
    },
    item: {
        width: 350,
        height: 100,
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 12,
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    listText: {
        color: '#181818',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFBFE',
    },
    detailsWButtonContainer: {
        flexDirection: "row",
        marginTop: 24,
        marginRight: 32,
        justifyContent: 'space-between',
    },
    detailsImage: {
        width: '100%', 
        height: 200,
    },
    detailsTitle: {
        color: '#181818',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 6,
        marginLeft: 24,
    },
    detailsText: {
        color: '#181818',
        fontSize: 18,
        marginTop: 12,
        marginLeft: 24,
        marginRight: 24,
    },
    deleteIcon: {
        alignItems: 'right',
    },
    horizontalItem: {
        width: 250,
        height: 150,
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 12,
        marginHorizontal: 12,
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'center',
    },
    planText: {
        color: '#181818',
        fontSize: 28,
    },
    planMap: {
        width: Dimensions.get('window').width,
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWButtonContainer: {
        flexDirection: "row",
        marginTop: 72,
        marginRight: 32,
        justifyContent: 'space-between',
    },
    headerWButtonTitle: {
        color: '#181818',
        fontSize: 34,
        fontWeight: 'bold',
        marginLeft: 30,
    },
});
