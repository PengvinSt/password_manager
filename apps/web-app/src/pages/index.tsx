import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { VaultItem } from "../types/vault";
import { Vault } from "../components/Vault";
import { RegisterForm, LoginForm } from "../components/Forms";

const Home: NextPage = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault) {
      setVault(JSON.parse(vault));
    }

    if (vaultKey) {
      setVaultKey(vaultKey);
      setStep("vault");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Password manager</title>
        <meta name="description" content="Your password manager!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {step === "register" && (
          <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "login" && (
          <LoginForm
            setVault={setVault}
            setStep={setStep}
            setVaultKey={setVaultKey}
          />
        )}
        {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
      </main>
    </div>
  );
};

export default Home;
