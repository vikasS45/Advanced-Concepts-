<TouchableOpacity onPress={() => this.props.navigation.navigate('SingleDoubt', { id: item.id })}>
<View style={{ alignSelf: 'flex-end', marginRight: 5, backgroundColor: '#f4f5f7', width: 120, marginTop: 5, marginBottom: 10, height: 30, borderWidth: 1, borderRadius: 15, borderColor: '#dce0e5', }}>
    <Text style={{ color: '#a2a4a6', padding: 3, marginLeft: 8, fontSize: 15, fontWeight: 'bold', }}>View Answers</Text>
</View>
</TouchableOpacity>