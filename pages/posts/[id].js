import Layout from '../../components/layout'
import Head from 'next/head';

export const getStaticPaths = async () => {
  const res = await fetch('https://624b213544505084bc4cc23f.mockapi.io/blog/')
  const data = await res.json()

  const paths = data.map(post =>{
    return {
      params: {id: post.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) =>{
  const id = context.params.id;
  const res = await fetch(`https://624b213544505084bc4cc23f.mockapi.io/blog/${id}`)
  const data = await res.json();

  return {
    props: {
      post: data
    }
  }
}

export default function Post({ post }) {
  return (

    <Layout>

      <Head>
        <title>{ post.title }</title>
      </Head>
      
      <div>
        <h1>{ post.title }</h1>
        <span>Posted at: { post.createdAt.split('T', 1) }</span>
        <p>{ post.description }</p>
      </div>

    </Layout>

  ) 
}