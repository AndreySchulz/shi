import type { ReactNode } from 'react'

type PageLayoutProps = {
  title: string
  caption?: string
  children?: ReactNode
}

const PageLayout = ({ title, caption, children }: PageLayoutProps) => (
  <section className="page">
    <h1 className="page__title">{title}</h1>
    {caption ? <p className="page__caption">{caption}</p> : null}
    {children}
  </section>
)

export default PageLayout
