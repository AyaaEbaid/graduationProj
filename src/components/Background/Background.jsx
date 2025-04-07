import React from "react";
import { useTranslation } from "react-i18next";
import style from "./Background.module.css";
import b from "./../../assets/4.jpg";

export default function Background() {
  const { t } = useTranslation("background");

  return (
    <div className={style.background} style={{ backgroundImage: `url(${b})` }}>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1 className={style.slogan}>
          {t("background.slogan_line1")}
          <br />
          {t("background.slogan_line2")}
        </h1>
      </div>
    </div>
  );
}
