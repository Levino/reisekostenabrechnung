import { scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { createTestComponent } from 'test/utils';
import { TripList } from './trip-list';
import { TripItem } from './trip-item';


describe('TripList', () => {
  let props;
  let trips;
  let tripList;


  beforeEach(() => {
    trips = [
      {completed: false, title: 'active trip'},
      {completed: true, title: 'completed trip'}
    ];

    props = {
      trips,
      deleteTrip: sinon.spy(),
      updateTrip: sinon.spy()
    };

    tripList = createTestComponent(TripList, props);
  });


  describe('Instantiation:', () => {
    it('should set #props.trips with an array', () => {
      expect(Array.isArray(tripList.props.trips)).toEqual(true);
    });
  });


  describe('DOM:', () => {
    it('should render all trips', () => {
      let tripItems = scryRenderedComponentsWithType(tripList, TripItem);
      expect(tripItems.length).toEqual(2);
    });

    it('should render active trips', () => {
      tripList = createTestComponent(TripList, {filter: 'active', ...props});
      let tripItems = scryRenderedComponentsWithType(tripList, TripItem);

      expect(tripItems.length).toEqual(1);
      expect(tripItems[0].props.trip.completed).toEqual(false);
    });

    it('should render completed trips', () => {
      tripList = createTestComponent(TripList, {filter: 'completed', ...props});
      let tripItems = scryRenderedComponentsWithType(tripList, TripItem);

      expect(tripItems.length).toEqual(1);
      expect(tripItems[0].props.trip.completed).toEqual(true);
    });
  });
});
