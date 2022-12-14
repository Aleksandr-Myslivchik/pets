import type { NextPage } from 'next'
import Head from 'next/head'
import styled, { css } from "styled-components";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { getUsers, getUserById } from '@/query/user'
import { createUser } from '@/mutation/createUser'
import { usePagination } from "@/pages/usePagination";

import styles from '../styles/Home.module.css'

const Test = styled.main`

`

const Home: NextPage = () => {
  const [ currentPage, setPage ] = useState(1)
  const { data, loading, error, refetch } = useQuery(getUsers, {})
  const {
    data: exactUser,
    loading: exactUserLoading,
    error: exactUserError,
    refetch: exactUserRefetch
  } = useQuery(getUserById, {
    variables: {
      id: 1
    }
  })

  console.log({
    data,
  })
  const [ newUser ] = useMutation(createUser)

  const [ users, setUsers ] = useState([ {
    id: 1,
    username: 'Test',
    age: 25
  } ])
  const [ name, setName ] = useState('')
  const [ age, setAge ] = useState(0)

  useEffect(() => {
    if (!loading)
      setUsers(data.getAllUsers)
  }, [ data, loading ])


  const addUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username: name,
          age
        }
      }
    }).then(({ data }) => {
      // refetch()
    }).finally(() => {
      setAge(0)
      setName('')
    })
  }

  const total = 100

  const pages = usePagination(total, 5, currentPage)

  console.log(pages)


  const goPage = (back: boolean) => () => {
    if (back) {
      setPage(currentPage - 1)
    } else {

      setPage(currentPage + 1)
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Test className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {
          loading ?
            <h1>Loading...</h1> :
            users.map((user) =>
              (
                <Fragment key={user.id}>
                  <div>username: {user.username}</div>
                  <div>id: {user.id}</div>
                  <div>age: {user.age}</div>
                </Fragment>
              )
            )
        }
        <div/>
        <form onSubmit={addUser}>
          <input value={name} onChange={(e => setName(e.target.value))} type="text"/>
          <input type="number" value={age} onChange={(e => setAge(Number(e.target.value)))}/>
          <button type="submit">Create</button>
        </form>
      </Test>

      <footer className={styles.footer}>
        <List>
          <Go disabled={currentPage === 1} onClick={goPage(true)}>{'<'}</Go>
          {
            pages?.map((item, index) =>
              <li key={index}>
                {typeof item === 'number' ? <PageItem onClick={() => {
                    if (currentPage === item) return
                    setPage(item)

                  }
                  } isCurrent={currentPage === item}>{item}</PageItem> :
                  <Dots>{item}</Dots>}
              </li>
            )
          }
          <Go disabled={currentPage === total / 5} onClick={goPage(false)}>{'>'}</Go>
        </List>
      </footer>
    </div>
  )
}

const PageItem = styled.span<{ isCurrent: boolean }>`
  cursor: pointer;
  list-style: none;
  width: 50px;
  height: 50px;
  color: black;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;


  ${({ isCurrent }) => isCurrent ? css`
    background: #42723f;

  ` : css``}
`


const Dots = styled.span`
  width: 50px;
  height: 50px;
  color: black;
  font-size: 16px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const Go = styled.button`
  font-size: 32px;
  color: black;

  &[disabled] {
    color: #989898;
    cursor: auto;
  }
`

export default Home


const List = styled.ul`
  display: flex;
  align-content: center;
  align-items: center;
`
