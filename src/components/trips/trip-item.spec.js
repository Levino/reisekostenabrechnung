import { Simulate } from 'react-addons-test-utils';
import { createTestComponent } from 'test/utils';
import { TripItem } from './trip-item';


describe('TripItem', () => {
  let trip;
  let tripItem;


  beforeEach(() => {
    trip = {completed: true, title: 'test'};

    tripItem = createTestComponent(TripItem, {
      trip,
      deleteTrip: sinon.spy(),
      updateTrip: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should initialize #state.editing to be false', () => {
      expect(tripItem.state.editing).toEqual(false);
    });

    it('should initialize #props.trip with a trip object', () => {
      expect(typeof tripItem.props.trip).toBe('object');
    });
  });


  describe('Component methods:', () => {
    describe('#delete', () => {
      it('should call #tripActions.deleteTrip', () => {
        tripItem.delete();
        expect(tripItem.props.deleteTrip.callCount).toEqual(1);
        expect(tripItem.props.deleteTrip.calledWith(tripItem.props.trip)).toEqual(true);
      });
    });

    describe('#editTitle', () => {
      it('should set #state.editing to `true`', () => {
        tripItem.editTitle();
        expect(tripItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing', () => {
      it('should set #state.editing to `false`', () => {
        tripItem.state.editing = true;
        tripItem.stopEditing();
        expect(tripItem.state.editing).toEqual(false);
      });
    });

    describe('#saveTitle', () => {
      it('should do nothing if not editing', () => {
        tripItem.stopEditing = sinon.spy();
        tripItem.state.editing = false;
        tripItem.saveTitle();
        expect(tripItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        tripItem.state.editing = true;
        tripItem.saveTitle({
          target: {value: ''}
        });
        expect(tripItem.state.editing).toEqual(false);
      });

      it('should call #tripActions.updateTrip', () => {
        tripItem.state.editing = true;
        tripItem.saveTitle({
          target: {value: 'foo'}
        });
        expect(tripItem.props.updateTrip.callCount).toEqual(1);
        expect(tripItem.props.updateTrip.args[0][0]).toEqual(trip);
        expect(tripItem.props.updateTrip.args[0][1].title).toEqual('foo');
      });
    });

    describe('#toggleStatus', () => {
      it('should call #tripActions.updateTrip', () => {
        tripItem.toggleStatus({
          target: {checked: true}
        });

        expect(tripItem.props.updateTrip.callCount).toEqual(1);
      });

      it('should toggle trip.complete', () => {
        tripItem.toggleStatus();
        expect(tripItem.props.updateTrip.args[0][1].completed).toEqual(!trip.completed);
      });
    });

    describe('#onKeyUp', () => {
      describe('with enter key', () => {
        it('should call #saveTitle with event object', () => {
          tripItem.saveTitle = sinon.spy();
          tripItem.onKeyUp({keyCode: 13});
          expect(tripItem.saveTitle.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          tripItem.state.editing = true;
          tripItem.onKeyUp({keyCode: 27});
          expect(tripItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('`click` event triggered on toggle-status button', () => {
      it('should call #toggleStatus()', () => {
        tripItem.toggleStatus = sinon.spy();
        tripItem.setState({editing: true});
        Simulate.click(tripItem.toggleStatusButton);
        expect(tripItem.toggleStatus.callCount).toEqual(1);
      });
    });


    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        tripItem.setState({editing: true});
        let element = tripItem.titleInput;
        expect(element.tagName).toEqual('INPUT');
      });

      it('should be rendered as text when not editing', () => {
        tripItem.setState({editing: false});
        let element = tripItem.titleText;
        expect(element.innerText).toEqual(trip.title);
      });
    });


    describe('`blur` event triggered on text field', () => {
      it('should call #saveTitle()', () => {
        tripItem.saveTitle = sinon.spy();
        tripItem.setState({editing: true});
        Simulate.blur(tripItem.titleInput);
        expect(tripItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and trip title', () => {
        tripItem.setState({editing: true});
        Simulate.blur(tripItem.titleInput);
        expect(tripItem.titleInput).toBe(null);
        expect(tripItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with enter key on text field', () => {
      it('should call #saveTitle()', () => {
        tripItem.saveTitle = sinon.spy();
        tripItem.setState({editing: true});
        Simulate.keyUp(tripItem.titleInput, {keyCode: 13});
        expect(tripItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and trip title', () => {
        tripItem.setState({editing: true});
        Simulate.keyUp(tripItem.titleInput, {keyCode: 13});
        expect(tripItem.titleInput).toBe(null);
        expect(tripItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with escape key on text field', () => {
      it('should call #stopEditing()', () => {
        tripItem.stopEditing = sinon.spy();
        tripItem.setState({editing: true});
        Simulate.keyUp(tripItem.titleInput, {keyCode: 27});
        expect(tripItem.stopEditing.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and trip title', () => {
        tripItem.setState({editing: true});
        Simulate.keyUp(tripItem.titleInput, {keyCode: 27});
        expect(tripItem.titleInput).toBe(null);
        expect(tripItem.titleText).toBeDefined();
      });
    });


    describe('`click` event triggered on edit button', () => {
      it('should display text field', () => {
        Simulate.click(tripItem.editButton);
        expect(tripItem.titleInput).toBeDefined();
      });

      it('should hide trip title', () => {
        Simulate.click(tripItem.editButton);
        expect(tripItem.titleText).toBe(null);
      });
    });


    describe('`click` event triggered on delete button', () => {
      it('should call #delete()', () => {
        tripItem.delete = sinon.spy();
        tripItem.setState({editing: true});
        Simulate.click(tripItem.deleteButton);
        expect(tripItem.delete.callCount).toEqual(1);
      });
    });
  });
});
