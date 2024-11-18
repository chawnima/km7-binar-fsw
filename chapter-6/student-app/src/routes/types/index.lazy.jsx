import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getTypes } from '../../services/type'
import Row from 'react-bootstrap/Row'
import TypeCard from '../../components/Type/TypeCard'

export const Route = createLazyFileRoute('/types/')({
  component: Index,
})

function Index() {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const getTypesData = async () => {
      const result = await getTypes()
      if (result.success) {
        setTypes(result.data)
        return
      }
      alert(result.message)
    }
    getTypesData()
  },[])

  return (
    <Row>
      <p>tes</p>
      {types.map((type) => (
        <TypeCard type={type} key={type.id}></TypeCard>
      ))}
    </Row>
  )
}
