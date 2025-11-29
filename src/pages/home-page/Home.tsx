import { useState } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import './Home.css'
import { Sidebar } from './components/sidebar';

const S = {
  PageWrapper: styled.main`
    display: flex;
    height: 100%;
    width: 100%;
  `,
};

function Home() {
  const [count, setCount] = useState(0)

  return (
    <S.PageWrapper>
      <Sidebar />
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Outlet />
    </S.PageWrapper>
  )
}

export default Home
