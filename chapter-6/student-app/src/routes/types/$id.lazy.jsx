import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/types/$id')({
  component: TypeDetail,
})

function TypeDetail() {
  return <div>Hello /types/$id!</div>
}