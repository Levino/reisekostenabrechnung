import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import { TripForm } from './trip-form';


describe('TripForm', () => {
  let tripForm;


  beforeEach(() => {
    tripForm = createTestComponent(TripForm, {
      createTrip: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.title with an empty string', () => {
      expect(tripForm.state.title).toEqual('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.title with an empty string', () => {
        tripForm.state.title = 'foo';
        expect(tripForm.state.title).toEqual('foo');

        tripForm.clearInput();
        expect(tripForm.state.title).toEqual('');
      });
    });


    describe('#onChange', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        tripForm.onChange(event);
        expect(tripForm.state.title).toEqual(event.target.value);
      });
    });


    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          tripForm.state.title = 'foo';
          tripForm.onKeyUp({keyCode: 27});
          expect(tripForm.state.title).toEqual('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        tripForm.onSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call tripActions#createTrip with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        tripForm.state.title = 'foo';
        tripForm.onSubmit(event);

        expect(tripForm.props.createTrip.callCount).toEqual(1);
        expect(tripForm.props.createTrip.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        tripForm.state.title = 'foo';
        tripForm.onSubmit(event);

        expect(tripForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        tripForm.state.title = '';
        tripForm.onSubmit(event);

        expect(tripForm.props.createTrip.callCount).toBe(0);

        tripForm.state.title = '    ';
        tripForm.onSubmit(event);

        expect(tripForm.props.createTrip.callCount).toBe(0);
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        tripForm.setState({title: 'foo'});
        Simulate.keyUp(tripForm.titleInput, {keyCode: 27});
        expect(tripForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        tripForm.setState({title: 'foo'});
        Simulate.keyUp(tripForm.titleInput, {keyCode: 27});
        expect(tripForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        tripForm.titleInput.value = 'foo';
        expect(tripForm.state.title).toEqual('');
        Simulate.change(tripForm.titleInput);
        expect(tripForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(tripForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        tripForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(tripForm), event);
        expect(tripForm.titleInput.value).toEqual('');
      });
    });
  });
});
