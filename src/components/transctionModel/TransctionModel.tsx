import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../constant/image';
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';

export default function TransctionModel({
  visible,
  onClose,
  filters,
  setFilters,
  applyFilters,
  setCategory
}: any) {
 
  
  
 
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={style.overlay} />
      </TouchableWithoutFeedback>

      <View style={style.modelView}>
        <View style={style.modelLine}></View>

        {/* Filter Header */}
        <View style={style.firstBox}>
          <Text style={style.firstBoxText}>Filter Transaction</Text>
          <TouchableOpacity
            onPress={() =>
            {
              setFilters({type: null, sortBy: 'Highest', category: "choose Category"})
            }
            }>
            <Text style={style.firstBoxText1}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Filter by Type */}
        <View style={style.secondBox}>
          <Text style={style.Text}>Filter By</Text>
          <View style={style.secondBoxText2}>
            <TouchableOpacity
              onPress={() => setFilters({...filters, type: 'income'})}>
              <Text
                style={[
                  style.text1,
                  filters.type === 'income' && style.activeText,
                ]}>
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilters({...filters, type: 'expense'})}>
              <Text
                style={[
                  style.text1,
                  filters.type === 'expense' && style.activeText,
                ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sort By */}
        <View style={style.secondBox}>
          <Text style={style.Text}>Sort By</Text>
          <View style={style.secondBoxText2}>
            {['Highest', 'Lowest', 'Newest', 'Oldest'].map(sortOption => (
              <TouchableOpacity
                key={sortOption}
                onPress={() => setFilters({...filters, sortBy: sortOption})}>
                <Text
                  style={[
                    style.text1,
                    filters.sortBy === sortOption && style.activeText,
                  ]}>
                  {sortOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Selection */}
        <View style={style.secondBox}>
          <Text style={style.Text}>Category</Text>
          <TouchableOpacity
            style={style.chooseBox}
            onPress={() => {
              /* Implement category selection modal */
            }}>
            <CategoryDropdown
              dropdownPosition="above"
              style="AllExpense"
              type="All"
              setCategory={filters.category}
              
            />
          </TouchableOpacity>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={style.Touchbtn} onPress={applyFilters}>
          <Text style={style.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '67%',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    elevation: 5,
  },
  modelLine: {
    borderTopColor: '#D3BDFF',
    borderTopWidth: 3,
    width: '10%',
    height: 2,
    marginBottom: 15,
  },
  firstBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  firstBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  firstBoxText1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F3DFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 40,
    backgroundColor: '#EEE5FF',
  },
  secondBox: {
    width: '100%',
  },
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secondBoxText2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    paddingHorizontal: 16,
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 24,
    backgroundColor: '#E3E5E5',
    marginRight: 8,
    marginBottom: 8,
  },
  text2: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 24,
    color: '#7F3DFF',
    backgroundColor: '#E3E5E5',
    marginLeft: 8,
    marginBottom: 8,
  },
  chooseBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  innerchooseBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
  },
  secondBoxText: {
    fontSize: 16,
    fontWeight: '500',
  },
  innerchooseBoxText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  Touchbtn: {
    backgroundColor: '#7F3DFF',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  activeText: {
    backgroundColor: '#7F3DFF',
    color: 'white',
  },
});

// <Modal visible={visible} animationType="slide" transparent={true}>
//   <TouchableWithoutFeedback onPress={onClose}>
//     <Animated.View style={style.overlay} />
//   </TouchableWithoutFeedback>
//   <View style={style.modelView}>
//     <View style={style.modelLine}></View>
//     <View style={style.firstBox}>
//       <Text style={style.firstBoxText}>Filter Transaction</Text>
//       <Text style={style.firstBoxText1}>Reset</Text>
//     </View>
//     <View style={style.secondBox}>
//       <View>
//         <Text style={style.Text}>Filter By</Text>
//       </View>
//       <View style={style.secondBoxText2}>
//         <Text style={style.text1}>Income</Text>
//         <Text style={style.text2}>Expense</Text>
//       </View>
//     </View>
//     <View style={style.secondBox}>
//       <View>
//         <Text style={style.Text}>Sort By</Text>
//       </View>
//       <View style={style.secondBoxText2}>
//         <Text style={style.text1}>Highest</Text>
//         <Text style={style.text1}>Lowest</Text>
//         <Text style={style.text1}>Newest</Text>
//         <Text style={style.text1}>Oldest</Text>
//       </View>
//     </View>
//     <View style={style.secondBox}>
//       <View>
//         <Text style={style.Text}>Category</Text>
//       </View>
//       <View style={style.chooseBox}>
//         <View>
//           <Text style={style.secondBoxText}>Choose Category</Text>
//         </View>
//         <View style={style.innerchooseBox}>
//           <Text style={style.innerchooseBoxText}>0 Selected</Text>
//           <Image source={IMAGES.RIGHT_ARROW} />
//         </View>
//       </View>
//     </View>
//     <TouchableOpacity style={style.Touchbtn}>
//       <Text style={style.buttonText}>Apply</Text>
//     </TouchableOpacity>
//   </View>
// </Modal>
