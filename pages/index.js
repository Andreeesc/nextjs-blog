import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Styles from '../styles/Home.module.css'

export async function getStaticProps(){
  const res = await fetch('https://624b213544505084bc4cc23f.mockapi.io/blog/')
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {posts.map(({ id, createdAt, title }) => (
            <Link href={`/posts/${id}`} key={id}>
              <li className={`${utilStyles.listItem} ${Styles.listItem}`} key={id}>
                <h4 className={`${utilStyles.headingMd}`}>{title}</h4>
                <span className={Styles.metaText}>Posted at: {createdAt.split('T', 1)}</span>
              </li>
            </Link>
            
          ))}
        </ul>
      </section>
    </Layout>
  );
}

