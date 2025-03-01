import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// SHOW PRODUCT
const products = [
    { id: '1', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Dây đeo Labubu Size R Đen', price: '500.000đ', oldPrice: '800.000đ', rating: '4.5/5', image: 'https://via.placeholder.com/100' },
];

export default function HomeScreen() {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Navigation Bar */}
            <View style={styles.navbar}>
                <View style={styles.navItems}>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Home</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Product</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Exchange Service</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Request</Text></TouchableOpacity>
                </View>
                <View style={styles.authButtons}>
                    <TouchableOpacity style={styles.loginButton}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>
                </View>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Discover, Trade, and Collect Your Unique Accessories</Text>
                <Text style={styles.subHeaderText}>Unlock a world of surprises with our exclusive blind boxes.</Text>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchBar} placeholder="search blindbox type e.g" />
                    <TouchableOpacity style={styles.searchButton}><Text style={styles.buttonText}>🔍</Text></TouchableOpacity>
                </View>
            </View>
            {/* Bộ lọc Filter */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(!showFilter)}>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>

                {/* Hiển thị filterBox ngay bên dưới nút Filter */}
                {showFilter && (
                    <View style={styles.filterBox}>
                        <TouchableOpacity style={styles.filterOption} onPress={() => setShowFilter(false)}>
                            <Text style={styles.filterText}>Giá: Thấp → Cao</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterOption} onPress={() => setShowFilter(false)}>
                            <Text style={styles.filterText}>Giá: Cao → Thấp</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Featured Products */}
            <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.productList}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <Text style={styles.rating}>{item.rating} ⭐</Text>
                        <TouchableOpacity style={styles.buyButton}><Text style={styles.buttonText}>Mua ngay</Text></TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Công ty TNHH XYZ</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FF69B4',
        padding: 15,
    },
    navItems: {
        flexDirection: 'row',
    },
    navButton: {
        padding: 10,
    },
    navText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    authButtons: {
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    signupButton: {
        backgroundColor: '#C71585',
        padding: 10,
        borderRadius: 5,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFE4E1',
        borderRadius: 10,
        marginVertical: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subHeaderText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
    },
    filterText: {
        fontSize: 16, fontWeight: 'bold'
    },
    filterContainer: { alignSelf: 'flex-end', marginBottom: 10 },
    searchButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    productList: {
        alignItems: 'center',
    },
    productCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        elevation: 3,
        width: '45%',
        borderWidth: 2,
        borderColor: '#000',
    },

    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF1493',
    },
    rating: {
        fontSize: 14,
        color: '#FFA500',
        marginBottom: 5,
    },
    buyButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FF69B4',
        padding: 15,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    filterBox: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        elevation: 5,
    },
    filterOption: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

});