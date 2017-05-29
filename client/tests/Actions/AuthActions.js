import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import AuthActions from '../../actions/AuthActions';
import { SET_CURRENT_USER } from '../../actions/types';

const expect = chai.expect;
