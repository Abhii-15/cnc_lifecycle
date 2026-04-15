import { useState, useCallback } from 'react'

/**
 * Custom hook for managing form state
 * @param {object} initialState - Initial form state
 * @returns {object} Form state, handlers, and reset function
 */
export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFormData(initialState)
  }, [initialState])

  return { formData, setFormData, handleChange, handleReset }
}
