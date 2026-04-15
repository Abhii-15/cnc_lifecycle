import { useState, useEffect } from 'react'

/**
 * Custom hook for handling API calls with loading and error states
 * @param {function} apiCall - Async function to call API
 * @returns {object} Data, loading state, error, and refetch function
 */
export const useAsync = (apiCall) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  })

  const execute = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      const data = await apiCall()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ data: null, loading: false, error })
    }
  }

  useEffect(() => {
    execute()
  }, [])

  return { ...state, refetch: execute }
}
