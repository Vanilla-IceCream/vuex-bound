import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

describe('vuex-bound', () => {
  it('should handle mapModelsToState', () => {
    const STATE_NAME = 'foo.bar';
    const computed = { ...mapModelsToState(STATE_NAME, ['vue', 'vuex']) };

    expect(computed).toMatchSnapshot();
  });

  it('should handle updateModel', () => {
    const STATE_NAME = 'foo.bar';
    const mutations = { ...updateModel(STATE_NAME) };

    expect(mutations).toMatchSnapshot();
  });
});
