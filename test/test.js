import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

describe('vuex-bound', () => {
  it('should handle mapModelsToState for module name', () => {
    const STATE_NAME = 'foo';
    const computed = { ...mapModelsToState(STATE_NAME, ['modelName1', 'modelName2']) };

    expect(computed).toMatchSnapshot();
  });

  it('should handle mapModelsToState for sub-module name', () => {
    const STATE_NAME = 'foo.bar';
    const computed = { ...mapModelsToState(STATE_NAME, ['modelName1', 'modelName2']) };

    expect(computed).toMatchSnapshot();
  });

  it('should handle updateModel for module name', () => {
    const STATE_NAME = 'foo';
    const mutations = { ...updateModel(STATE_NAME) };

    expect(mutations).toMatchSnapshot();
  });

  it('should handle updateModel for sub-module name', () => {
    const STATE_NAME = 'foo.bar';
    const mutations = { ...updateModel(STATE_NAME) };

    expect(mutations).toMatchSnapshot();
  });
});
