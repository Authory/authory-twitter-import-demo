import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

export default function Home() {

  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const submit = async () => {

    let url = ''

    if(handle.startsWith("@")) {
      url = `https://twitter.com/${handle.substring(1)}`
    } else if(!url.startsWith("https://") || !url.startsWith("http://")) {
      url = `https://twitter.com/${handle}`
    } else {
      url = handle
    }

    // TODO: Error handling & param validation
    const resp = await fetch("https://api-development.authory.com/gtwitter-import/signup", {
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        twitterUrl: url
        // TODO: Add recaptcha v3?
      })
    })

    if(resp.status === 200) {
      setIsSubmitted(true)
    } else {
      console.error(resp.status, resp.statusText, await resp.text())
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Back up your Twitter!
        </h1>

        <div style={{ marginTop: 30 }} className={styles.collumn}>
          <form className={styles.collumn}>
            <input type="email" className="form-control" id="email" placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)}></input>
            <br></br>
            <input type="text" className="form-control" id="twitter" placeholder='Your Twitter Handle' value={handle} onChange={e => setHandle(e.target.value)}></input>
            <br></br>
            <input type="button" className="form-control btn btn-primary" value="Submit" onClick={submit}></input>
          </form>
        </div>

        { isSubmitted && <p><b>Thank you, you will receive an email shortly.</b></p>}
        
        <p className={styles.description}>
          This will fully backup your twitter, 
          including media, into a searchable archive that <a href="#">looks like this</a>.
          <br />We will send you a link to your profile via email as soon as it's ready.
          <br /><br />
          This service is free for a year, you will be able to download all data.
          <br /><br />

          After a year, we will contact you and
          ask you to turn your backed up twitter feed into a full <a href="#">Authory</a> account.
          <br /><br />
          We built this for the same reason we built <a href="#">Authory</a> - we belive in free speach and fully owning your own data.
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
