import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Overview from "./dashboard/overview";

const Home : NextPage = () =>{
    const router  = useRouter();
    return (

      <div style={{ height: "100vh"  }}>
        
     
        <title>BEB Admin Console</title>
        <meta name="description" content="Grow Business Digitally" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
     

      <main style={{ margin:0 }}>
        <Overview/>
      </main>

      {/* <footer className={styles.footer}>
    </footer> */}
    </div>
    );

}

export default Home;