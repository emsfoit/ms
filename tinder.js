import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, View, Text, Button } from 'react-native'

export default class Exemple extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [],
      words: [],
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
  }
  componentDidMount() {  
        this._mounted = true;
        var self = this;
        this.getItems().then((Jsonwords) => {
          this.convertToCards(Jsonwords);
        });
}
getItems(){
    return fetch('http://ec2-18-221-66-149.us-east-2.compute.amazonaws.com:8080/words?user_uuid=36ff545d-ca5a-4855-985b-eda712781efb&language=English&limit=10')
    .then(response => response.json())
    .then(responseJson => {
        //console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}
convertToCards(Jsonwords){
    var wordsarray=[];
    Object.keys(Jsonwords).forEach(function(key) {
       wordsarray.push(Jsonwords[key].word);
    })
    console.log(wordsarray)
    this.setState({cards:wordsarray});
    

}
  renderCard = card => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card}</Text>
      </View>
    )
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };

  jumpTo = () => {
    this.swiper.swipeLeft()
  };

  render () {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={this.onSwiped}
          onTapCard={this.jumpTo}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})