import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'

import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Counter from './components/Shop/Counter'
import { ErrorBoundary } from 'react-error-boundary'
import React from 'react'
import ErrorFallback from './components/Shop/ErrorFallback'

import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions'

let isInitial = true
function App () {
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const items = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  console.log(cart, 'checking')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])
  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
        {/* <Counter /> */}
      </Layout>
    </Fragment>
    // <ErrorBoundary
    //   fallbackRender={ErrorFallback}
    //   onError={errorHandler}
    //   onReset={errorset}
    // >
    //   <Counter  />
    // </ErrorBoundary>
  )
}

export default App
