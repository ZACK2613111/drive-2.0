import React from "react";
import styles from './Button.module.scss'

export default function Button({ btnClass, title, onClick }: Button) {
    return <button className={`btn ${btnClass} ${styles.commonBtn} `} onClick={onClick}>{title}</button>;
}
