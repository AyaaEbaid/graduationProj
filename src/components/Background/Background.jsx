import React from 'react'
import style from './Background.module.css'
import background from './../../assets/photo_2025-01-31_23-11-09\ 1.png'
import b from './../../assets/4.jpg'
export default function Background() {
  return (
    <>
    
      <div className={style.background} style={{backgroundImage:`url(${b})`}}>
      <div className={style.overlay}></div>
      <div className={style.content}>
      <h1 className={style.slogan}>We’ll finish it for you<br /> Making it easier for you...</h1>

     
      </div>
    </div>
    </>
  )
}
