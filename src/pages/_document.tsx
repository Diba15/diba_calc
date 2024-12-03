import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <title>Calc</title>
        <meta name="description" content="A simple calculator application built with Next.js and Tailwind CSS"/>
        <meta name="keywords" content="calculator, Next.js, Tailwind CSS, simple app" />
        <meta name="author" content="Dimas Bagas Saputro"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
