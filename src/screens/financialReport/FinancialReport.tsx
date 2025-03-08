import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import ProgressBar from '../../components/progressBar/ProgressBar';
import Dropdown from '../../components/dropdown/Dropdown';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import {styles} from './financialReportStyles';
import PieChart from '../../components/pieChart/PieChart';
import {useFinancialReport} from './useFinancialReport';

export default function FinancialReport() {
  const {
    selectedTab,
    setCategory,
    setSelectedMonth,
    pieData,
    toggleTab,
    handlepress,
    dataToDisplay,
    amount,
    goToTransction,
    maxAmount,
  } = useFinancialReport();
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.topcontainer}>
          <TouchableOpacity onPress={goToTransction}>
            <Image source={IMAGES.ARROW} />
          </TouchableOpacity>
          <Text style={styles.topcontainerText}>Financial Report</Text>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Dropdown
              dropdownPosition="left"
              setSelectedMonth={setSelectedMonth}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.FRAME} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <PieChart radius={88} strokeWidth={30} sections={pieData} />
          <Text style={styles.imageContainerText}>{amount}</Text>
        </View>
        <View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={selectedTab === 'Expense' ? styles.btn1 : styles.btn2}
              onPress={() => toggleTab('Expense')}>
              <Text
                style={
                  selectedTab === 'Expense' ? styles.btnText1 : styles.btnText2
                }>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selectedTab === 'Income' ? styles.btn1 : styles.btn2}
              onPress={() => toggleTab('Income')}>
              <Text
                style={
                  selectedTab === 'Income' ? styles.btnText1 : styles.btnText2
                }>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <CategoryDropdown
              dropdownPosition="left"
              type={selectedTab}
              setCategory={setCategory}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Image source={IMAGES.SORTING} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {dataToDisplay.map(item => {
            const progress = Math.min((Number(item.amount) / maxAmount) * 100);
            const categoryColors: Record<string, string> = {
              Shopping: '#FCAC12',
              Subscription: '#7F3DFF',
              Food: '#007BFF',
              Salary: '#00A86B',
              Transportation: 'black',
            };
            const progressBarColor = categoryColors[item.category] || '#BDC3C7';
            const textColor = selectedTab === 'Expense' ? '#E74C3C' : '#2ECC71';
            return (
              <ProgressBar
                key={item.id}
                categoryName={item.category}
                amount={item.amount}
                progress={progress}
                color={progressBarColor}
                textColor={textColor}
                onPress={() => handlepress(item)}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
