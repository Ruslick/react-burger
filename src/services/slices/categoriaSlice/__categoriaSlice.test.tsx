import {setupStore} from '../..'
import { selectTab } from "."

describe('categoriaSlice', () => {
  test('select tab check', async () => {
    const store  = setupStore()
  
    expect(store.getState().categoriaSlice.activeCategoria).toBe('bun')
  
    store.dispatch(selectTab('sauce'))
  
    expect(store.getState().categoriaSlice.activeCategoria).toBe('sauce')


  })
  test('check action select tab', async () => {
    expect(selectTab('bun')).toEqual({ type: 'categoria/selectTab', payload: 'bun' })
  })

})

