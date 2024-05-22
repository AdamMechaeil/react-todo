"use client"
import dynamic from "next/dynamic";
// import styles from "./page.module.css";
const NOSSR=dynamic(()=>import("./components/Home/Main"),{ssr:false});
export default function Home() {
  return (
  <div className="bg-secondary" style={{height:"42.1rem"}}>
    <NOSSR/>
  </div>
  );
}
