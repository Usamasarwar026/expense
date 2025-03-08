import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {IMAGES} from '../../constant/image';
import TransctionModel from '../../components/transctionModel/TransctionModel';
import Dropdown from '../../components/dropdown/Dropdown';
import {styles} from './transctionScreenStyles';
import {CombinedData} from '../../types/types';
import Transction from '../../components/transction/Transction';
import moment from 'moment';
import useTransctionScreen from './useTransctionScreen';

export default function TransctionScreen() {
  const {
    handlepress,
    setSelectedMonth,
    openModel,
    setOpenModel,
    goToFinancialReport,
    combinedData,
    applyFilters,
    resetFilters,
    setFilters,
    filters,
  } = useTransctionScreen();

  const renderTransactionItem = ({item}: {item: CombinedData[number]}) => {
    return item.type === 'header' ? (
      <View style={styles.periodHeader}>
        <Text style={styles.periodText}>{item.title}</Text>
      </View>
    ) : (
      <Transction
        title={item.data.category}
        subtitle={item.data.description}
        amount={item.data.amount}
        time={moment(item.data.timestamp).format('hh:mm A')}
        image={{uri: item.data.imageUri}}
        type={item.data.type}
        onPress={() => {
          handlepress(item.data);
        }}
      />
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Dropdown
              dropdownPosition="left"
              setSelectedMonth={month => setSelectedMonth(month)}
            />
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.MENU} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={goToFinancialReport}>
            <View style={styles.financialBox}>
              <Text style={styles.financialBoxText}>
                See your financial report
              </Text>
              <Image source={IMAGES.RIGHT_ARROW} />
            </View>
          </TouchableOpacity>
          <View>
            <FlatList
              data={combinedData}
              keyExtractor={(item, index) =>
                item.type === 'header'
                  ? `header-${item.title}`
                  : item.data.id.toString()
              }
              renderItem={renderTransactionItem}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </View>

      <TransctionModel
        visible={openModel}
        onClose={() => setOpenModel(false)}
        filters={filters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        setFilters={setFilters}
      />
    </>
  );
}
