import React, {useState, useEffect} from 'react';
import {Shadow, Neomorph} from 'react-native-neomorph-shadows';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
const App = () => {
  const indiaStates = {
    AN: 'Andaman and Nicobar Islands',
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CH: 'Chandigarh',
    CT: 'Chhattisgarh',
    DN: 'Dadra and Nagar Haveli and Daman and Diu',
    DL: 'Delhi',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JK: 'Jammu and Kashmir',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PY: 'Puducherry',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UP: 'Uttar Pradesh',
    UT: 'Uttarakhand',
    WB: 'West Bengal',
  };

  const data = [
    {key: 'ST', section: true, label: 'States'},
    {key: 'TT', label: 'Total'},
  ];

  // {key: 'bh', label: 'Red Apples'},
  // {key: index++, label: 'Cherries'},
  // {
  //   key: index++,
  //   label: 'Cranberries',
  //   accessibilityLabel: 'Tap here for cranberries',
  // },
  // // etc...
  // // Can also add additional custom keys which are passed to the onChange callback
  // {key: index++, label: 'Vegetable', customKey: 'Not a fruit'},

  const [confirmed, setConfirmed] = useState(null);
  const [active, setActive] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [deceased, setDeceased] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [chooseStates, setChooseStates] = useState('TT');
  const [rawData, setRawData] = useState([]);
  const [deltaDeaths, setDeltaDeaths] = useState(null);
  const [deltaConfirmed, setDeltaConfirmed] = useState(null);
  const [deltaRecovered, setDeltaRecovered] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [quotes, setQuotes] = useState('CM CHANDAN');

  for (let [key, value] of Object.entries(indiaStates)) {
    // console.log(key, value);
    data.push({key: key, label: value});
  }
  const setData = st => {};

  useEffect(async () => {
    try {
      const res = await fetch('https://api.covid19india.org/data.json');
      const res2 = await fetch('https://zenquotes.io/api/random');
      const actualData = await res.json();
      const quote = await res2.json();
      setQuotes(quote[0].q);
      console.log(actualData);
      if (chooseStates === 'TT') {
        if (
          actualData.statewise[0].deltaconfirmed === '0' ||
          actualData.statewise[0].deltarecovered === '0' ||
          actualData.statewise[0].deltadeaths === '0'
        ) {
          console.log(
            actualData.cases_time_series[
              actualData.cases_time_series.length - 1
            ],
          );
          setDeltaConfirmed(
            actualData.cases_time_series[
              actualData.cases_time_series.length - 1
            ].dailyconfirmed,
          );
          setDeltaDeaths(
            actualData.cases_time_series[
              actualData.cases_time_series.length - 1
            ].dailydeceased,
          );
          setDeltaRecovered(
            actualData.cases_time_series[
              actualData.cases_time_series.length - 1
            ].dailyrecovered,
          );
        }
      } else {
        setDeltaConfirmed(actualData.statewise[0].deltaconfirmed);
        setDeltaDeaths(actualData.statewise[0].deltadeaths);
        setDeltaRecovered(actualData.statewise[0].deltarecovered);
      }
      setRawData(actualData.statewise);
      setConfirmed(actualData.statewise[0].confirmed);
      setRecovered(actualData.statewise[0].recovered);
      setActive(actualData.statewise[0].active);
      setDeceased(actualData.statewise[0].deaths);

      setLastUpdateTime(actualData.statewise[0].lastupdatedtime);
      setPlaceName(actualData.statewise[0].state);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const selectedStates = st => {
    var i;
    for (i = 0; i < rawData.length; i++) {
      // console.log(rawData.statewise[i].statecode);
      if (rawData[i].statecode === st) {
        console.log(st);
        setConfirmed(rawData[i].confirmed);
        setRecovered(rawData[i].recovered);
        setActive(rawData[i].active);
        setDeceased(rawData[i].deaths);
        setDeltaConfirmed(rawData[i].deltaconfirmed);
        setDeltaDeaths(rawData[i].deltadeaths);
        setDeltaRecovered(rawData[i].deltarecovered);
        setLastUpdateTime(rawData[i].lastupdatedtime);
        setPlaceName(rawData[i].state);
      }
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#ecf0f2', padding: 0}}>
      <View style={{}}>
        <View style={[styles.container, styles.header]}>
          <View style={{flex: 2}}>
            <Neomorph
              darkShadowColor="black"
              lightShadowColor="white"
              style={styles.logo}>
              <Image
                source={require('./images/cm.jpg')}
                style={{width: 50, height: 50, borderRadius: 25}}
              />
            </Neomorph>
          </View>

          <View
            style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Neomorph
              darkShadowColor="black"
              lightShadowColor="white"
              style={styles.dropdown}>
              <ModalSelector
                selectStyle={{borderWidth: 0}}
                // selectTextStyle={{color:"black"}}
                // sectionTextStyle={{color:"black"}}
                // accessible={true}
                value={placeName}
                data={data}
                initValue="Select State"
                onChange={option => {
                  // alert(`${option.label} (${option.key}) nom nom nom`);
                  setChooseStates(option.key);
                  selectedStates(option.key);
                }}
              />
              <Icon
                name="location-outline"
                size={18}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  color: 'black',
                }}></Icon>
            </Neomorph>
          </View>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#767676',
              fontSize: 18,
              fontWeight: '500',
            }}>
            {placeName}
          </Text>

          <Text style={{alignSelf: 'center', color: '#afb2b7'}}>
            Last Updated |
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {` ${lastUpdateTime}`}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View>
            <Neomorph swapShadows style={styles.confirmedCard}>
              <View style={{}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingTop: 20,
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#ff728f',
                    fontSize: 18,
                  }}>
                  Confirmed
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#faa7b8',
                    fontSize: 18,
                  }}>
                  {`+ ${deltaConfirmed}`}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',

                    fontWeight: '500',
                    color: '#f7395e',
                    fontSize: 18,
                  }}>
                  {confirmed}
                </Text>
              </View>
            </Neomorph>
          </View>
          <View>
            <Neomorph swapShadows style={styles.activeCard}>
              <View style={{}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingTop: 20,
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#4299f7',
                    fontSize: 18,
                  }}>
                  Active
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#80bcfc',
                    fontSize: 18,
                  }}>
                  {}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',

                    fontWeight: '500',
                    color: '#3395ff',
                    fontSize: 18,
                  }}>
                  {active}
                </Text>
              </View>
            </Neomorph>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            // backgroundColor:"red"
          }}>
          <View>
            <Neomorph swapShadows style={styles.recoveredCard}>
              <View style={{}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingTop: 20,
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#4bd56b',
                    fontSize: 18,
                  }}>
                  Recovered
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#7cfa99',
                    fontSize: 18,
                  }}>
                  {`+ ${deltaRecovered}`}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',

                    fontWeight: '500',
                    color: '#2ca949',
                    fontSize: 18,
                  }}>
                  {recovered}
                </Text>
              </View>
            </Neomorph>
          </View>
          <View>
            <Neomorph swapShadows style={styles.deceasedCard}>
              <View style={{}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingTop: 20,
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#bababb',
                    fontSize: 18,
                  }}>
                  Deceased
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingBottom: 10,
                    fontWeight: '500',
                    color: '#cccdcf',
                    fontSize: 18,
                  }}>
                  {`+ ${deltaDeaths}`}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',

                    fontWeight: '500',
                    color: '#767e86',
                    fontSize: 18,
                  }}>
                  {deceased}
                </Text>
              </View>
            </Neomorph>
          </View>
        </View>
        <View
          style={{
            marginVertical: 25,
            justifyContent: 'center',
            // backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Neomorph swapShadows style={styles.quoteCard}>
            <IconF
              name="quote-left"
              size={25}
              style={{
                color: 'white',
                position: 'absolute',
                top: 20,
                left: 20,
              }}></IconF>
            <Text
              style={{
                position: 'relative',
                top: 40,
                left: 10,
                fontSize: 18,
                fontWeight: 'bold',
                // backgroundColor: 'red',
                width: '100%',
                height: 120,

                padding: 15,
                color: '#ecf0f2',
              }}>
              {quotes}
            </Text>
            <IconF
              name="quote-right"
              size={25}
              style={{
                color: 'white',
                position: 'absolute',
                bottom: 20,
                right: 20,
              }}></IconF>
          </Neomorph>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    // backgroundColor: "red",
    alignSelf: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    backgroundColor: '#ecf0f2',
    shadowRadius: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 40,
    width: 250,
    backgroundColor: '#ecf0f2',
    shadowRadius: 10,
    borderRadius: 80,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    minHeight: 40,
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    // backgroundColor: "red"
  },

  confirmedCard: {
    height: hp('19%'),
    width: wp('40%'),
    shadowRadius: 10,
    borderRadius: 30,
    backgroundColor: '#fac6d0',
  },
  activeCard: {
    height: hp('19%'),
    width: wp('40%'),
    shadowRadius: 10,
    borderRadius: 30,
    backgroundColor: '#b1d4fc',
  },
  recoveredCard: {
    height: hp('19%'),
    width: wp('40%'),
    shadowRadius: 10,
    borderRadius: 30,
    backgroundColor: '#b1fbc2',
  },
  deceasedCard: {
    height: hp('19%'),
    width: wp('40%'),
    shadowRadius: 10,
    borderRadius: 30,
    backgroundColor: '#dfdfdf',
  },
  quoteCard: {
    height: hp('27%'),
    width: wp('85%'),
    backgroundColor: '#e7a8fe',
    shadowRadius: 10,
    borderRadius: 30,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default App;
