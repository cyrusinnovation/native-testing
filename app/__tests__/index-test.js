import StoreFactory from '../storeFactory';

import {Provider} from 'react-redux';
import reducers from '../reducers/reducers.js';
import MainView from '../main'
import MockStore from '../../test/mocks/mockStore'
import Index from '../index'


describe('Index', ()=> {

  var mockStore;
  beforeEach(()=> {
    mockStore = new MockStore({text:'text'});
    sinon.stub(StoreFactory, 'create').returns(mockStore)
  });

  afterEach(()=> {
    StoreFactory.create.restore();
  });

  it('Wraps main in a provider', ()=> {
    var index = mount(<Index/>);
    var provider = index.find(Provider);
    expect(provider.find(MainView).length).to.equal(1);
  });

  it('Gives provider the correct store', ()=> {
    var index = mount(<Index/>);
    var provider = index.find(Provider);
    expect(provider.prop('store')).to.eql(mockStore);
  });
});