import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React from 'react';
import {IMAGES} from '../../constant/image';
import {styles} from './detailTransctionStyles';
import Logout from '../../components/logout/Logout';
import { useDetailTransction } from './useDetailTransction';
import { COLORS } from '../../constant/color';

export default function DetailTransction() {
  const {
    openModel,
    setOpenModel,
    fullScreenImage,
    setFullScreenImage,
    transaction,
    formattedDate,
    goToHome,
    onYesPress,
    currencyAmount,
    isExpense,
  } = useDetailTransction();

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.topcontainer,
            {backgroundColor: isExpense ? COLORS.RED : COLORS.GREEN},
          ]}>
          <View style={styles.topbar}>
            <TouchableOpacity onPress={goToHome}>
              <Image source={IMAGES.WHITEARROW} />
            </TouchableOpacity>
            <Text style={styles.topcontainerText}>Detail Transction</Text>
            <TouchableOpacity onPress={() => setOpenModel(true)}>
              <Image source={IMAGES.TRASH} />
            </TouchableOpacity>
          </View>
          <View style={styles.redcontainer}>
            <View>
              <Text style={styles.amount}>
                {currencyAmount}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>{transaction.description}</Text>
            </View>
            <View style={styles.datebox}>
              <Text style={styles.dateboxText}>{formattedDate}</Text>
              <Text style={styles.dateboxText}>{transaction.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.belowContainer}>
          <View style={styles.belowBox1}>
            <View>
              <Text style={styles.box1Text}>Type</Text>
              <Text style={styles.box1Text2}>
                {isExpense ? 'Expense' : 'Income'}
              </Text>
            </View>
            <View>
              <Text style={styles.box1Text}>Category</Text>
              <Text style={styles.box1Text2}>{transaction.category}</Text>
            </View>
            <View>
              <Text style={styles.box1Text}>Wallet</Text>
              <Text style={styles.box1Text2}>paypal</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionHead}>Description</Text>
            <Text style={styles.descriptionText}>
              {transaction.description}
            </Text>
          </View>
          <View style={styles.pictureBox}>
            <View>
              <Text style={styles.imageText}>Attachment</Text>
            </View>
            <TouchableOpacity
              style={styles.pic}
              onPress={() => setFullScreenImage(transaction.imageUri ?? null)}>
              {transaction.imageUri ? (
                <Image
                  style={styles.actualpic}
                  resizeMode="cover"
                  source={{uri: transaction.imageUri}}
                />
              ) : (
                <Text>No image available</Text>
              )}
            </TouchableOpacity>
            <Modal
              visible={!!fullScreenImage}
              transparent={true}
              animationType="fade">
              <View style={styles.modalBackground}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setFullScreenImage(null)}>
                  <Image source={IMAGES.CLOSE} style={styles.closeIcon} />
                </TouchableOpacity>

                <Image
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                  source={fullScreenImage ? {uri: fullScreenImage} : undefined}
                />
              </View>
            </Modal>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <Logout
            openModel={openModel}
            setOpenModel={setOpenModel}
            title="Remove this transaction?"
            description="Are you sure do you wanna remove this transaction?"
            text="Transaction has been Successfully Removed"
            YesPress={() => onYesPress(transaction.id)}
            navigateToHome={true}
          />
        </View>
      </View>
    </>
  );
}
