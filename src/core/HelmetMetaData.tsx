import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetMetaData(props) {
   let currentUrl = `${window.location.href}`;
   let quote = props.quote !== undefined ? props.quote : "Humano do Amanhã' é um jogo realizado pelo Museu do Amanhã, no qual você pode descobrir qual o seu perfil em um mundo conectado com as tendências do futuro";
   let title = props.title !== undefined ? props.title : "Humano do Amanhã | Museu do Amanhã";
   let image = props.image !== undefined ? props.image : "https://lh3.googleusercontent.com/proxy/cTwvOSYiwC0mIem5HFxs0xuOTPlfHHBIn_-uHfyr8Y1QgzDKfbvs3_SIsVmm7Oq8fkVHBM3_lT1TEM3d9mSuyKQJYaFPiz73vHq-PQY3spLuJFDS-ebzO2fJxZaMeZtjwx2TlpBHt1XTsb4";
   let description = props.description !== undefined ? props.description  : "Humano do Amanhã' é um jogo realizado pelo Museu do Amanhã, no qual você pode descobrir qual o seu perfil em um mundo conectado com as tendências do futuro"
   let hashtag = props.hashtag !== undefined ? props.hashtag : "#humanoDoAmanhã";

  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
