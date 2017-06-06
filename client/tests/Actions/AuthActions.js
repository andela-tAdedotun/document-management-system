import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import SetCurrentUser from '../../actions/SetCurrentUser';
import { SET_CURRENT_USER } from '../../actions/Types';

const expect = chai.expect;
