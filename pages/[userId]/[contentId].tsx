import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function ContentPage({ content }: { content: any }) {

  return (
    <div className={styles.container}>
    <Head>
      <title>Content</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Your Content!
      </h1>
      { content.text }
    </main>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {

  const router = useRouter()

  const { userId, contentId } = router.query
 
  // Fetch data from external API
  const res = await fetch(`https://api-development.authory.com/article/${userId}/${contentId}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { content: data } }
}