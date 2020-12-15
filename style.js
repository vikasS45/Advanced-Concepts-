const CARD_HEIGHT = 240;
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const CARD_WIDTH = width;

export default {
  cardStyle: {
    elevation: 10,
  },
  cardItemBody: {
    borderRadius: 10,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  container: {
    marginHorizontal: 10,
  },
  imageStyle: {
    width: CARD_WIDTH / 3,
    borderRadius: 10,
    height: CARD_HEIGHT / 3.5,
    backgroundColor: '#202020',
    opacity: 0.8,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  textContainer: {
    marginHorizontal: 10,
    width: CARD_WIDTH / 2,
  },
  category: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
    color: 'white',
  },
  wrapper: {
    borderRadius: 10,
    flex: 1,
  },
  show_category: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  selected_category: {
    borderBottomWidth: 3,
    paddingBottom: 5,
    borderBottomColor: '#3E72FF',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#c4c4c4',
    borderRadius: 4,
    paddingHorizontal: 5,
    color: '#2E3978',
    marginBottom: 10, 

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3978'
  },
  by: {
    color: 'grey',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIcon: {
    flex: 1,
    opacity: 2,
  },
  scene: {
    flex: 1,
  },
  tabLabel: {
    color: 'black',
    margin: 8,
    fontWeight: 'bold',
  },
  tabbar: {
    backgroundColor: 'white',
    height: 30,
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  alignCenter: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
  },
  noVideos: {
    fontSize: 18,
  },
  tabbar: {
    backgroundColor: '#2E3978',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: '400',
  },
};
