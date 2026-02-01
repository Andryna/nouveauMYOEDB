import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalLayout from '../../layouts/ModalLayout';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/expressions';
import { getStats } from '../../utils/request';
// Si tu utilises JsonDisplay, BoxStats ou autre pour afficher MYstats
import JsonDisplay from '../list/JsonDisplay';
import BoxStats from '../buttons/BoxStats';

class StatsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MYstats: null,
    };
  }

  async fetchStats() {
    try {
      const { l, selectedText, selectedTrad } = this.props;

      if (l === 'fr' && selectedText && selectedTrad) {
        const rep = await getStats(selectedTrad);
        this.setState({ MYstats: rep });
      } else if (l === 'en' && selectedText && selectedTrad) {
        const rep = await getStats(selectedText);
        this.setState({ MYstats: rep });
      } else if (selectedText) {
        try {
          const translatedText = await this.handleTxtTranslate('en', selectedText);
          const rep = await getStats(translatedText);
          this.setState({ MYstats: rep });
        } catch (error) {
          this.setState({ MYstats: null });
        }
      }
    } catch (error) {
      console.error(error);
      this.setState({ MYstats: null });
    }
  }

  componentDidMount() {
    // tu peux déclencher fetchStats ici si nécessaire
    // this.fetchStats();
  }

  render() {
    const { contentStat } = this.props;
    const { MYstats } = this.state;

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
      >
        <ModalLayout navigation={this.props.navigation}>
          <View style={{ width: wp('100%'), backgroundColor: '#060a20', paddingBottom: hp('10%') }}>
            
            {/* HEADER */}
            <View style={{ justifyContent: 'center', height: hp('8.5%'), width: wp('100%')}}>
              <View style={{ height: hp('4%'), width: wp('100%'), flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <TouchableOpacity onPress={this.props.onClose}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="arrow-back-outline" size={25} color="white" style={{ alignSelf: 'center', marginLeft: 5 }} />
                    <Text style={{ color: 'white', marginLeft: wp('18%'), fontSize: hp('2.2%') }}>
                      Details
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* CONTENU PASSE EN PROP */}
            <View>
              {contentStat}
            </View>

            {/* AFFICHAGE DES STATS SI DISPONIBLES */}
            <View style={{ padding: 15 }}>
              {!MYstats ? (
                <Text style={{ color: 'white' }}>Aucune statistique disponible</Text>
              ) : (
                <>
                  {/* Tu choisis l'affichage selon ton besoin */}
                  <JsonDisplay data={MYstats} />
                  {/* ou bien */}
                  {/* <BoxStats data={MYstats} /> */}
                </>
              )}
            </View>

          </View>
        </ModalLayout>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchfetchData: id => dispatch(fetchData(id))
  };
};

export default connect(null, mapDispatchToProps)(StatsModal);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
