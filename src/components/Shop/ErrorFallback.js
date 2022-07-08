

const ErrorFallBack = ({ error, resetErrorBoundary }) => {
    const handle = () => {
        console.log('handled')
      }
  return (
    <div>
      <h1>Error !!!</h1>
      <button onClick={handle}>try again</button>
    </div>
  )
}

export default ErrorFallBack
