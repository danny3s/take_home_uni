

import { View, Text, FlatList, StyleSheet } from 'react-native';
import useNetworkData from '../../hook/useNetworkData'; 

const TokenList = () => {
  const dataToDisplay = useNetworkData();

  const formatBalance = (hex, decimals) => {
    const balance = parseInt(hex, 16) / Math.pow(10, decimals);
    return balance.toFixed(4);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbolText}>{item.symbol.slice(0, 3)}</Text>
      </View>
      <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.balanceText}>{formatBalance(item.balance, item.decimals)}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      {dataToDisplay && dataToDisplay.data && dataToDisplay.data.length > 0 ? (
        <FlatList
          data={dataToDisplay.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>No tokens available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 330,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.1,
    borderBottomColor: '#ccc',
  },
  symbolContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000', 
  },
  symbolText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nameText: {
    flex: 1,
    fontSize: 16,
  },
  balanceText: {
    fontSize: 16,
    textAlign: 'right',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#777',
  },
});

export default TokenList;
