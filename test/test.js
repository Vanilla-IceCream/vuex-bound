import { mapModelsToState, updateModel } from '../src';

process.chdir(__dirname);

describe('vuex-bound', () => {
  it('should handle', async () => {
    expect(mapModelsToState).toBeDefined();
    expect(updateModel).toBeDefined();
  })
});
