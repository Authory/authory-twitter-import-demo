import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'


export default function ContentPage({ content }: { content: any }) {

  return (
    <div className={styles.container}>
    <Head>
      <title>Content</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <p className={styles.paragraph}>
        Create your own <a href="/">backup here.</a>
      </p>
      <h1 className={styles.title}>
        Your Content!
      </h1>
        { content.description }
      <p>
        { JSON.stringify(content.contentDetail, undefined, 2) }
      </p>
    </main>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {

  const { userId, contentId } = context.params!
 
  // Fetch data from external API
  const res = await fetch(`https://api-development.authory.com/article/${userId}/${contentId}`)
  const data = await res.json()

  console.log(res.status)
  console.log(data)
  
  // Pass data to the page via props
  return { props: { content: data.article } }
}