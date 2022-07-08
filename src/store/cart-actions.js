import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
       'url.json'
      )
      if (!response.ok) {
        throw new Error('Could not fetch cart data')
      }
      const data = await response.json()
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity
        })
      )
      return data
    }
    try {
      await fetchData()
    } catch (e) {
      console.log(e, 'error in fetching data')
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!...',
          message: 'Fetching  cart data failed'
        })
      )
    }
  }
}
export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'pending...',
        message: 'updating cart data'
      })
    )
    const sendRequest = async () => {
      const response = await fetch(
        'url.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          })
        }
      )
      if (!response.ok) {
        throw new Error('updating cart data failed')
      }
    }
    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!!...',
          message: 'updated cart data'
        })
      )
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!...',
          message: 'sending cart data failed'
        })
      )
      console.log(e)
    }
  }
}
