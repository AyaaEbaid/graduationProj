import React from 'react'
import style from './Background.module.css'
import background from './../../assets/photo_2025-01-31_23-11-09\ 1.png'
export default function Background() {
  return (
    <>
      <div className={style.background} style={{backgroundImage:`url(${background})`}}>
      <div className={style.overlay}></div>
      <div className={style.content}>
      <h1 className={style.slogan}>هنشطبها لك<br /> سهلها عليك...</h1>
     
      </div>
    </div>
    </>
  )
}
